---
title: Gradient Messenger
url: /blog/2019/04/23/gradient-messenger/index.html
date: 2019-04-23
description: How to create a gradient for chat items like Fa¢ebook Messenger does. For Android. Natively.
---

In this article we will reproduce fixed gradient background for chat messages. Similar effect can be seen in the Fa¢ebook Messenger application. We will use custom `Drawable`, `RecyclerView` and `RecyclerView.ItemDecoration`.

{{ this.$includeVideo('/assets/video/gradient-messenger') }}

TL;DR: [browse the source code](https://github.com/noties/BlogProjects/tree/master/01-GradientMessenger)

<p $excerpt></p>

The inspiration for this article is taken from the [css-tricks](https://css-tricks.com/recreating-the-facebook-messenger-gradient-effect-with-css/) post. 

## Before we begin

There are few possible solutions to this problem. First, we could've used a gradient background for our layout. Then we would add non-transparent backgrounds to all the views except our target ones. This way our target views would be the only ones without background. Thus showing underlying parent. Unfortunately this would result in:

* massive  GPU overdraw (thus not optimal performance, which can be crucial for large lists)
* tight coupling (_every_ view must have a background set, some of them multiple backgrounds)
* even our _target_ view would have to have background for padding

Instead, let's use `RecyclerView.ItemDecoration` to solve this problem. This will give us simplicity, extensibility and performance.

## Drawable

Let's start with our gradient drawable. It will be short and simple. But will give us flexibility in future by encapsulating drawing logic.

```kotlin
class GradientDrawable(private val colors: IntArray) : Drawable() {

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)

    override fun onBoundsChange(bounds: Rect) {
        super.onBoundsChange(bounds)

        paint.shader = LinearGradient(
                0.0F, 0.0F,
                0.0F, bounds.bottom.toFloat(),
                colors,
                null,
                Shader.TileMode.CLAMP
        )
    }

    override fun draw(canvas: Canvas) {
        canvas.drawRect(bounds, paint)
    }
}
```

Let's apply it to our layout to validate that it's working

![gradient drawable]({{ this.$withBase('/assets/images/gradient-messenger-1.png') }})

## RecyclerView

Let's initialize out list widget - `RecyclerView`. I'm going to use [Adapt](https://github.com/noties/Adapt) library that simplifies working with lists. But note that its usage is completely optional and not required for the functionality that we are targeting. 

```kotlin
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // create adapt instance
        val adapt = Adapt.create()

        // initialize RecyclerView
        findViewById<RecyclerView>(R.id.recycler_view).apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            setHasFixedSize(true)
            adapter = adapt
        }

        // set items
        adapt.setItems(items())
    }

    private fun items(): List<Item<*>> {
        val fakeMessage = FakeMessage(Random(43L))
        return 0.until(100)
                .map { fakeMessage.create() }
    }
}
```

I'm not going into detail about `FakeMessage` class, you can inspect it's code [here](https://github.com/noties/BlogProjects/blob/master/01-GradientMessenger/app/src/main/java/io/noties/blog/gradientmessenger/FakeMessage.kt). In short &mdash; it generates a [random](https://xkcd.com/221/) chat messages.

`Item` is a class from the `Adapt` library. It represents a single component that can be displayed in a list. Let's create 2 items for our chat, one for each message type:

```kotlin
class Me(private val message: CharSequence) : Item<Me.Holder>(message.hashCode().toLong()) {

    override fun createHolder(inflater: LayoutInflater, parent: ViewGroup): Holder {
        return Holder(inflater.inflate(R.layout.item_me, parent, false))
    }

    override fun render(holder: Holder) {
        holder.textView.text = message
    }

    class Holder(view: View) : Item.Holder(view) {
        val textView = requireView<TextView>(R.id.text)
    }
}
```

```kotlin
class You(private val message: CharSequence) : Item<You.Holder>(message.hashCode().toLong()) {

    override fun createHolder(inflater: LayoutInflater, parent: ViewGroup): Holder {
        return Holder(inflater.inflate(R.layout.item_you, parent, false))
    }

    override fun render(holder: Holder) {
        holder.textView.text = message
    }

    class Holder(view: View) : Item.Holder(view) {
        val textView = requireView<TextView>(R.id.text)
    }
}
```

`FakeMessage` generates one of these items in its `create` method. We construct a list of these items and send them to an `Adapt` instance. Now if we apply `GradientDrawable` to the `RecyclerView` we will see this:

![gradient drawable]({{ this.$withBase('/assets/images/gradient-messenger-2.png') }})

## RecyclerView.ItemDecoration

Let's create `YouMessageDecoration` which will draw the gradient background:

```kotlin
class YouMessageDecoration(
        recyclerView: RecyclerView,
        private val itemViewType: Int
) : RecyclerView.ItemDecoration() {

    override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {
    }
}
```

We will initialize `GradientDrawable` in `YouMessageDecoration` for the sake of brevity, but generally you would want to accept in via constructor or via Dependency Injection.

```kotlin{6-11,16-26}
class YouMessageDecoration(
        recyclerView: RecyclerView,
        private val itemViewType: Int
) : RecyclerView.ItemDecoration() {

    private val drawable: Drawable

    init {
        drawable = GradientDrawable(recyclerView.resources.getIntArray(R.array.list_gradient_color))
                .also { initDrawableBounds(recyclerView, it) }
    }

    override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {
    }

    private companion object {

        // we must listen for supplied view layout events to change gradient bounds
        // as gradient drawable won't be actually added to any view, but will be
        // used directly by this item decoration
        private fun initDrawableBounds(view: View, drawable: Drawable) {
            view.viewTreeObserver.addOnGlobalLayoutListener {
                drawable.setBounds(0, 0, view.width, view.height)
            }
        }
    }
}
```

Now, let's implement the `onDraw` method. First, we will need to find all _currently visible_ items of `You` type. Please note that a `RecyclerView.ItemDecoration` must manually find the views to _decorate_. We will iterate over `RecyclerView`'s children and match the views of `You` item `itemViewType`:

```kotlin
override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {
    // a range of integers representing view indexes
    0.until(parent.childCount)
            // convert index to view
            .map { parent.getChildAt(it) }
            // convert to Holder (if found)
            .mapNotNull { parent.findContainingViewHolder(it) }
            // keep only holders of `You` type
            .filter { it.itemViewType == itemViewType }
            // cast holders (at this point they must be of `You` type)
            .map { it as You.Holder }
            .forEach {
                // we have them here
            }
}
```

As we want to apply gradient background to a chat message, we will need a reference to a `TextView` that holds it. Next we will need an _absolute_ position of the `TextView` on the canvas. We will obtain it by calculating _relative_ position of the `TextView` to a parent `RecyclerView`. I have added a small extension function for this calculation:

```kotlin{3-5,9-35}
private companion object {

    // we are dealing with View layer, which is exclusively single-threaded, 
    // so we can reuse this value for all calculations
    private val _POINT = Point()

    private fun initDrawableBounds(view: View, drawable: Drawable) {...}

    // define a private extension function (can be promoted to some utility class
    // if will be used in future)
    private fun View.relativeTo(group: ViewGroup): Point {

        val point = _POINT

        // as we are reusing point instance between multiple calls, 
        // it's important to clear previous values with new ones on each access
        point.set(this.left, this.top)

        var parent = this.parent
        var view: View?

        while (parent != null && parent != group) {
            view = parent as View
            point.x += view.left
            point.y += view.top
            parent = view.parent
        }

        return point
    }

    // additionally, let's define _destruction_ operators for Point,
    // so we can do `val (x, y) = point`
    private operator fun Point.component1() = this.x
    private operator fun Point.component2() = this.y
}
```

After we have obtained `TextView` and its _absolute_ position we will _clip_ the canvas. Clipping means that only _clipped_ areas will be drawn. So we will _clip_ everything on canvas _except_ our `TextView`. As this operation affects how _everything_ is drawn on canvas, we will wrap this operation in `save/restore` block. This will allow us to save canvas state, execute our draw operation and revert back to initial state without modifying any other canvas drawing logic. The only thing that is left is to call `draw` on our gradient drawable. Drawable is initialized with `RecyclerView` bounds. And it will draw itself for the full width and height of `RecyclerView`. But because we have clipped everything except `TextView` the only thing that will be drawn is the gradient in `TextView` bounds:

```kotlin{9-26}
override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {
    0.until(parent.childCount)
            .map { parent.getChildAt(it) }
            .mapNotNull { parent.findContainingViewHolder(it) }
            .filter { it.itemViewType == itemViewType }
            .map { it as You.Holder }
            .forEach {

                // obtain TextView. We cannot use the whole itemView as it fills the parent
                val textView = it.textView

                // it's required for us to have x,y coordinates _relative_ to RecyclerView
                val (x, y) = textView.relativeTo(parent)

                // save current canvas state
                with(c.save()) {
                    
                    // clip our TextView, everything else except clipped area will be ignored
                    c.clipRect(x, y, x + textView.width, y + textView.height)
                    
                    // draw our drawable
                    drawable.draw(c)
                    
                    // restore canvas state
                    c.restoreToCount(this)
                }
            }
}
```

Finally, let's register our `YouMessageDecoration` with `RecyclerView`. `Adapt` allows us to do it in an Item directly:

```kotlin{11-13}
class You(private val message: CharSequence) : Item<You.Holder>(message.hashCode().toLong()) {  
  
    override fun createHolder(inflater: LayoutInflater, parent: ViewGroup): Holder {  
        return Holder(inflater.inflate(R.layout.item_you, parent, false))  
    }  
  
    override fun render(holder: Holder) {  
        holder.textView.text = message  
  }  
  
    override fun recyclerDecoration(recyclerView: RecyclerView): RecyclerView.ItemDecoration? {  
        return YouMessageDecoration(recyclerView, viewType())  
    }  
  
    class Holder(view: View) : Item.Holder(view) {  
        val textView = requireView<TextView>(R.id.text)  
    }  
}
```

Or we can do it in a _regular_ way:

```kotlin{15-19}
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // create adapt instance
        val adapt = Adapt.create()

        // initialize RecyclerView
        findViewById<RecyclerView>(R.id.recycler_view).apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            setHasFixedSize(true)
            adapter = adapt
            addItemDecoration(YouMessageDecoration(
                    this,
                    // we can use _default_ generated itemViewType 
                    // as long as we do not specify in explicitly
                    Item.generatedViewType(You::class.java)))
        }

        // set items
        adapt.setItems(items())
    }

    private fun items(): List<Item<*>> {...}
}
```

If we launch the sample application now we will see the result that we were targeting.

{{ this.$includeVideo('/assets/video/gradient-messenger') }}

Although we already have working _copy_ of desired functionality let's try to optimize it. We have a lot of `cave/clip/draw/restore` operations. Maybe if we could reduce them, we would get better results. For example, we could use `Canvas#clipRect(Rect, Region.Op)` method with `Region.Op.UNION`, which would allow us to clip all visible items first and then execute single draw operation. Unfortunately this method is deprecated:

```java
/**
 * Modify the current clip with the specified rectangle, which is
 * expressed in local coordinates.
 *
 * @param rect The rectangle to intersect with the current clip.
 * @param op How the clip is modified
 * @return true if the resulting clip is non-empty
 * @deprecated Region.Op values other than {@link Region.Op#INTERSECT} and {@link Region.Op#DIFFERENCE} have the ability to expand the clip. The canvas clipping APIs are intended to only expand the clip as a result of a restore operation. This enables a view parent to clip a canvas to clearly define the maximal drawing area of its children. The recommended alternative calls are {@link #clipRect(Rect)} and {@link #clipOutRect(Rect)};  As of API Level API level {@value Build.VERSION_CODES#P} only {@link Region.Op#INTERSECT} and {@link Region.Op#DIFFERENCE} are valid Region.Op parameters.
 * @deprecated 8.0 Oreo (26)
 */
@Deprecated
public boolean clipRect(@NonNull Rect rect, @NonNull Region.Op op) {
    checkValidClipOp(op);
    return nClipRect(mNativeCanvasWrapper, rect.left, rect.top, rect.right, rect.bottom, op.nativeInt);
}
```

> `@deprecated 8.0 Oreo (26)` javadoc entry is added by [Enhance](https://github.com/noties/Enhance) utility. It processes Android sources and adds `@deprecated` and `@since` tags with appropriate Android version information

There is another method that can be suitable for us: `Canvas#clipPath(Path)`. It allows us to prepare all the clipping and execute single draw operation. Let's try to use it:

```kotlin
private val path = Path()

override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {

    // reset/rewind before (can still hold values from previous iteration)
    path.rewind()

    0.until(parent.childCount)
            .map { parent.getChildAt(it) }
            .mapNotNull { parent.findContainingViewHolder(it) }
            .filter { it.itemViewType == itemViewType }
            .map { it as You.Holder }
            .forEach {

                val textView = it.textView

                val (x, y) = textView.relativeTo(parent)

                path.addRect(
                        x.toFloat(),
                        y.toFloat(),
                        x + textView.width.toFloat(),
                        y + textView.height.toFloat(),
                        Path.Direction.CCW)
            }

    // let's check if our path is not empty
    if (!path.isEmpty) {
        with(c.save()) {
            c.clipPath(path)
            drawable.draw(c)
            c.restoreToCount(this)
        }
    }
}
```

Unfortunately quick measurement of the performance shows that `clipPath` solution takes longer time to execute. Here are the _approximate_ measurements of each `onDraw` call as recorded on a Pixel XL (256 steps measured):

<table>
<thead>
<tr><th>&nbsp;</th><th>min (ns)</th><th>max (ns)</th><th>avg (ns)</th></tr>
</thead>
<tbody>
<tr>
<td><code>clipRect</code></td>
<td>94062</td><td>1612239</td><td>305215.92</td>
</tr>
<tr>
<td><code>clipPath</code>
<td>225208</td><td>1902917</td><td>509384.98</td>
</tr>
</tbody>
</table>

As you can see both variants have acceptable performance of under 1 millisecond for each `onDraw` method call on average. But `clipRect` is still a bit faster.

Okay, let's return to our initial version and try optimize it by writing less _ideamatic_ Kotlin. We are using list operations heavily which are translated into multiple iterations in the bytecode. Let's change that:

```kotlin
override fun onDraw(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {

    var view: View
    var holder: RecyclerView.ViewHolder

    // wait, a for-loop?
    for (i in 0 until parent.childCount) {

        view = parent.getChildAt(i)
        holder = parent.findContainingViewHolder(view) ?: continue

        if (itemViewType == holder.itemViewType) {

            val textView = (holder as You.Holder).textView

            val (x, y) = textView.relativeTo(parent)

            c.withSave {
                clipRect(x, y, x + textView.width, y + textView.height)
                drawable.draw(this)
            }
        }
    }
}
```

I had also added a small extension function for `Canvas` to make `save/restore` operations less error-prone:

```kotlin{12-19}
private companion object {

    private val _POINT = Point()

    private fun initDrawableBounds(view: View, drawable: Drawable) {...}

    private fun View.relativeTo(group: ViewGroup): Point {...}

    private operator fun Point.component1() = this.x
    private operator fun Point.component2() = this.y

    private inline fun Canvas.withSave(action: Canvas.() -> Unit) {
        val save = this.save()
        try {
            action()
        } finally {
            this.restoreToCount(save)
        }
    }
}
```

Here are the updated measurement results:

<table>
<thead>
<tr><th>&nbsp;</th><th>min (ns)</th><th>max (ns)</th><th>avg (ns)</th></tr>
</thead>
<tbody>
<tr>
<td><code>clipRect</code></td>
<td>94062</td><td>1612239</td><td>305215.92</td>
</tr>
<tr>
<td><code>clipPath</code>
<td>225208</td><td>1902917</td><td>509384.98</td>
</tr>
<tr>
<td><code>clipRect</code> (loop)</td>
<td>47604</td><td>864532</td><td>209149.99</td>
</tr>
</tbody>
</table>

The same _optimization_ can be also applied to the `clipPath` method which will make it perform better. Another few nanoseconds can be shed-off by rewriting `YouMessageDecoration` in even less _ideamatic_ Kotlin &mdash; <del>in CSS</del> in Java. But the performance gains will be minimal, so consider this a joke :)


## What's next
We have covered single use-case when all chat messages have rectangular background. And it shows basic principles of fixed scrolling gradient background for Android. But it's missing one _minor_ detail &mdash; rounded corners&hellip; We will deal with them in the next article. [Stay tuned (part 2)]({{ this.$withBase(this.$findPage('2019-05-18-messenger-gradient-2.md').url) }}).

[source code](https://github.com/noties/BlogProjects/tree/master/01-GradientMessenger)
