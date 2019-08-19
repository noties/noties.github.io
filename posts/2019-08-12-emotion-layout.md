---
title: EmotionLayout
url: /blog/2019/08/12/emotion-layout/index.html
date: 2019-08-12
draft: false
---

I've stumbled upon an interesting UI effect by [Chris Banes](https://twitter.com/chrisbanes/status/1029619278863945728) implemented with `MotionLayout`.  Unfortunately... well. Unfortunately it's `MotionLayout`, so _motions_ are defined in XML scene files sprinkled with constrains and references to views. If you haven't seen one &mdash; go ahead and see [the one that defines UI effect in question](https://github.com/chrisbanes/tivi/blob/3c1ce720ed4bda2c2d3d28320ae0e66a6701e402/app/src/main/res/xml/scene_show_details.xml). Now, there must be a simpler way...

<p $excerpt></p>

First, let's define our layout structure:

```xml
<ru.noties.scrollable.ScrollableLayout>

  <HeaderView...>

  <FrameLayout...>
  
</ru.noties.scrollable.ScrollableLayout>
```

`ScrollableLayout` comes from the [library][scrollable] that I had created when I was dealing with _scrollable tabs_ (it was a UI hit some time ago). It gives a way to add a header to any scrolling content and receive scroll events which we will use here.

Our _poster view_ will go to the content view. We will give it negative top margin and remove _children clipping_ from both `ScrollableLayout` and content `FrameLayout`:

```xml{1-2,6-7,11-13}
<ru.noties.scrollable.ScrollableLayout
    android:clipChildren="false">

    <HeaderView.../>

    <FrameLayout
        android:clipChildren="false">

        <ScrollView...>

        <ImageView
            android:layout_height="96dip"
            android:layout_marginTop="-48dip" />

    </FrameLayout>

</ru.noties.scrollable.ScrollableLayout>
```

This should give us the result:

![result]({{ this.$withBase('/assets/images/emotion-layout-1.png') }})

Now, that XML part is done... 😄, let's add some code:

```kotlin{16-38}
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val scrollable = findViewById<ScrollableLayout>(R.id.scrollable_layout)
        val scrollView = findViewById<ScrollView>(R.id.scroll_view)
        val image = findViewById<View>(R.id.image)

        // _hook-up_ ScrollableLayout with our scrolling content
        scrollable.setCanScrollVerticallyDelegate {
            scrollView.canScrollVertically(it)
        }
        
        scrollable.addOnScrollChangedListener { y, _, maxY ->

            // when reached half of possible scroll we _flip_ view order and animate the other way
            val half = maxY / 2F

            // change drawing order of poster view
            image.translationZ = if (y <= half) {
                1F
            } else {
                -1F
            }

            val height = image.height

            image.translationY = if (y <= half) {
                // negative translationY (moving to the top of the screen) multiplied by distance ratio
                -(height / 2F) * (y / half)
            } else {
                // initial starting position is -(height / 2F) - which first half is finishing at
                // then we multiply by view height (not half of it for faster movement) by distance ratio
                -(height / 2F) + (height * ((y - half) / half))
            }
        }
    }
}
```

{{ this.$includeVideo('/assets/video/emotion-layout') }}

## Pre-Lollipop(21) era

You might've noticed we are using `translationZ` property to define drawing order of views which is not supported on devices lower than Lollipop (21). For such devices we can rely on _natural_ drawing order of views inside a `ViewGroup` &mdash; `getChildAt(0)` is drawn first, `getChildAt(count - 1)` is drawn last. Let's create a simple utility class:

<blockquote class="custom tip">

Please note that version based on `MotionLayout` has no such workaround. In fact &mdash; its minimum SDK is 23 (Marshmallow)

</blockquote>


```kotlin
interface DrawingOrder {

    fun init()

    fun bringToFront()

    fun sendToBack()

    companion object {
        fun create(view: View): DrawingOrder {
            return if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.LOLLIPOP) {
                DrawingOrderPre21(view)
            } else {
                DrawingOrder21(view)
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    private class DrawingOrder21(private val view: View) : DrawingOrder {/*...*/}

    private class DrawingOrderPre21(private val view: View) : DrawingOrder {

        private val parent = view.parent as ViewGroup

        override fun init() {
            if (!isAtFront()) {
                view.bringToFront()
            }
        }

        override fun bringToFront() {
            if (!isAtFront()) {
                view.bringToFront()
            }
        }

        override fun sendToBack() {
            if (!isAtBack()) {
                // small optimization if there are only 2 views in the parent
                if (parent.childCount == 2) {
                    parent.getChildAt(0).bringToFront()
                } else {
                    parent.removeView(view)
                    parent.addView(view, 0)
                }
            }
        }

        private fun isAtFront() = view == parent.getChildAt(parent.childCount - 1)

        private fun isAtBack() = view == parent.getChildAt(0)
    }
}
```

And update our scroll-changed listener:

```kotlin{6,12-16}
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        /*...*/

        val drawingOrder = DrawingOrder.create(image).also { it.init() }

        scrollable.addOnScrollChangedListener { y, _, maxY ->

            val half = maxY / 2F

            if (y <= half) {
                drawingOrder.bringToFront()
            } else {
                drawingOrder.sendToBack()
            }

            /*...*/
        }
    }
}
```

## Interpolation

We also can interpolate _poster view_ movement:

```kotlin{6,17-18,20-21}
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        /*...*/

        val interpolator = AccelerateDecelerateInterpolator()

        scrollable.addOnScrollChangedListener { y, _, maxY ->

            val half = maxY / 2F

            /*...*/

            val height = image.height

            image.translationY = if (y <= half) {
                val ratio = interpolator.getInterpolation(y / half)
                -(height / 2F) * ratio
            } else {
                val ratio = interpolator.getInterpolation((y - half) / half)
                -(height / 2F) + (height * ratio)
            }
        }
    }
}
```

---

`MotionLayout` is a good piece of software and it has its own usages. Unfortunately
it also has downsides:
* animations created with it are not _portable_ to/from other platforms
* _motion_ definition is filled with XML constraints and references ids that are not present
in definition itself thus creating confusing and error-prone environment
* understanding (reading) and updating (modifying) _motions_ can be a compelling task for a new-comer
* and it's certainly not fast in terms of development &mdash; having a visual result
can take a lot of time thus making `MotionLayout` a _not-so-perfect_ candidate for quick UI experiments

Source code can be found [here][source]

[source]: https://github.com/noties/BlogProjects/tree/master/EmotionLayout
[scrollable]: https://github.com/noties/Scrollable

