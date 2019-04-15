---
title: "Complex Android animations - Tutorial"
date: 2018-07-28
url: /blog/2018/07/28/complex-android-animations/index.html
---

Achieving complex animations on Android might be a daunting task. Especially when an arbitrary number of views are involved and/or they have specific ordering (one-after-another, grouping, delays, etc). Using built-in `ValueAnimator`, `ObjectAnimator`, `ViewPropertyAnimator` or `AnimatorSet` would result in untangled mess of callbacks and won't be extensible, easy to _tweak_ nor maintain. 

![gif]({{ this.$withBase('/assets/gif/tumbleweed/10-expand_sequential.gif') }})

This tutorial will show how to achieve complex animations in a clean and easy way in just few lines of code.

<p $excerpt></p>

This tutorial will be using [Tumbleweed](https://github.com/noties/Tumbleweed) library.

{{ this.$include(this, 'includes/tumbleweed_about.html') }}

All animations can be found in the [sample application](https://github.com/noties/Tumbleweed-Tutorial) (head to the [Releases tab](https://github.com/noties/Tumbleweed-Tutorial/releases) to download latest APK). It provides playback functionality and displays actual source code that was used to achieve animations

<img width="33%" src="{{ this.$withBase('/assets/images/tumbleweed-tutorial-sample-1.png') }}" /> <img width="33%" src="{{ this.$withBase('/assets/images/tumbleweed-tutorial-sample-2.png') }}" />

## Basic

![gif]({{ this.$withBase('/assets/gif/tumbleweed/01-basic.gif') }})

Simple sequential **fade in** of views.

```java
Timeline.createSequence()
        .push(Tween.to(view1, Alpha.VIEW, 1.F).target(1.F))
        .push(Tween.to(view2, Alpha.VIEW, 1.F).target(1.F))
        .push(Tween.to(view3, Alpha.VIEW, 1.F).target(1.F))
        .push(Tween.to(view4, Alpha.VIEW, 1.F).target(1.F))
        .start(ViewTweenManager.get(R.id.tween_manager, group));
```

First, we use one of the factory methods to start configuring _sequential_ `Timeline`: `Timeline.createSequence()`. Then we specify what kind of tweens to want to execute (_push, push, push, push!_). And finally triggering execution by calling `start` on supplied `TweenManager` instance.

> `Timeline` and `Tween` are 2 base types that are used to define interpolations.

`Tween.to(...)` method accepts: 
* a _target_ (in our case a view, but it can be _anything_)
* a _tween type_ for supplied _target_ (`TweenType<View>` here)
* a duration in seconds (`1.F` == 1 second)

Here we are using one of the predefined (bundled with library) tween types: `Alpha.VIEW`. There are quite a few of them. But what's good it's really easy to add own implementations. Generally tween types are stateless that's why library defines then as constants. The full list can be found [here](https://github.com/noties/Tumbleweed/tree/master/tumbleweed-android/src/main/java/ru/noties/tumbleweed/android/types).

Both `Tween` and `Timeline` require a `TweenManager` to operate on. Here we are using `ViewTweenManager` that attaches to a view's drawing cycle. Using `ViewTweenManager.get(@IdRes int, View)` will ensure that there is only one `ViewTweenManager` that is attached to the specified view.

> There are also `DrawableTweenManager` and `HandlerTweenManager` implementations

In order to reduce code size let's introduce some helper methods:

```java
@NonNull
public static TweenDef<View> fadeIn(@NonNull View view) {
    return Tween.to(view, Alpha.VIEW, 1.F).target(1.F);
}
```

> `TweenDef<>` is the type that is used to configure a `Tween`. Think of it as a _builder_ of a `Tween`. All factory methods in `Tween` class return `TweenDef<>`: `to`, `from`, `set`, `call`, `mark`.

```java
@NonNull
public static ViewTweenManager tweenManager(@NonNull View view) {
    return ViewTweenManager.get(R.id.tween_manager, view);
}
```

So, now, we can re-write our `Basic` code snippet like this:

```java
Timeline.createSequence()
        .push(fadeIn(view1))
        .push(fadeIn(view2))
        .push(fadeIn(view3))
        .push(fadeIn(view4))
        .start(tweenManager(group));
```

## Parallel

![gif]({{ this.$withBase('/assets/gif/tumbleweed/02-parallel.gif') }})

Okay, let's change our animation a bit and make all views **fade in** simultaneously:

```java
Timeline.createParallel()
        .push(fadeIn(view1))
        .push(fadeIn(view2))
        .push(fadeIn(view3))
        .push(fadeIn(view4))
        .start(tweenManager(group));
```

We did change only one line of code and instead of `Timeline.createSequence()` we are calling `Timeline.createParallel()`. That's it.

But let's change animation duration for some views:

![gif]({{ this.$withBase('/assets/gif/tumbleweed/03-parallel.gif') }})

```java
Timeline.createParallel()
        .push(fadeIn(view1))
        .push(fadeIn(view2, 2.F))
        .push(fadeIn(view3))
        .push(fadeIn(view4, 3.F))
        .start(tweenManager(group));
```

Previously our helper method `fadeIn` didn't have a duration arument, let's change that:

```java
@NonNull
public static TweenDef<View> fadeIn(@NonNull View view) {
    return fadeIn(view, 1.F);
}

@NonNull
public static TweenDef<View> fadeIn(@NonNull View view, float duration) {
    return Tween.to(view, Alpha.VIEW, duration).target(1.F);
}
```

## Grouped

![gif]({{ this.$withBase('/assets/gif/tumbleweed/04-grouped.gif') }})

We can use `Timeline` to include other `Timelines` so can achieve _grouping_ behaviour:

```java
Timeline.createSequence()
        .push(fadeIn(view1))
        .push(Timeline.createParallel()
                .push(fadeIn(view2))
                .push(fadeIn(view3)))
        .push(fadeIn(view4))
        .start(tweenManager(group));
```

## All delay

![gif]({{ this.$withBase('/assets/gif/tumbleweed/05-all_delay.gif') }})

If we want _postpone_(delay) an interpolation, we can use the `delay` option for a `Tween`:

```java
Timeline.createParallel()
        .push(fadeIn(view1))
        .push(fadeIn(view2).delay(.25F))
        .push(fadeIn(view3).delay(.5F))
        .push(fadeIn(view4).delay(.75F))
        .start(tweenManager(group));
```

<blockquote class="custom warning">
<h3>Warning</h3>

Please note that **all** time measurements in Tumbleweed library are using seconds, so to convert to a more common Android way (of using milliseconds) these would be:

* `0.25F` -> `250L`
* `0.5F` -> `500L`
* `0.75F` -> `750L`
</blockquote>


## All delay repeat

![gif]({{ this.$withBase('/assets/gif/tumbleweed/06-all_delay_repeat.gif') }})

If we want to reverse the animation after it is complete we can use `repeatYoyo` option:

```java
Timeline.createParallel()
        .push(fadeIn(view1))
        .push(fadeIn(view2).delay(.25F))
        .push(fadeIn(view3).delay(.5F))
        .push(fadeIn(view4).delay(.75F))
        .repeatYoyo(1, 1.F)
        .start(tweenManager(group));
```

`repeatYoyo` accepts 2 arguments: `number-of-repetitions` and `delay` between repetitions. If you want an interpolation to run _endlessly_ pass `-1` as the first argument (number).

<blockquote class="custom tip">
<h3>Tip</h3>

There is also the `repeat` option for a `Tween` and it just restarts an interpolation.
</blockquote>


## Repeat individual

![gif]({{ this.$withBase('/assets/gif/tumbleweed/07-repeat_individual.gif') }})

In previous sample we used `repeatYoyo` option for the whole `Timeline` but we can also specify _individual_ repetitions for each of the `Tweens`:

```java
Timeline.createParallel()
        .push(fadeIn(view1).repeatYoyo(2, .25F))
        .push(fadeIn(view2).repeatYoyo(2, .5F))
        .push(fadeIn(view3).repeatYoyo(2, .75F))
        .push(fadeIn(view4).repeatYoyo(2, 1.F))
        .start(tweenManager(group));
```

## Rotation

![gif]({{ this.$withBase('/assets/gif/tumbleweed/14-group_rotation.gif') }})

Let's create a _carousel_-like rotation animation. We will be rotating _group_ View by 360 degrees clockwise and all children by 360 degrees counter-clockwise.

```java
final float rotation = 360.F;

Timeline.createParallel()
        .push(rotate(group, rotation))
        .push(rotate(view1, -rotation))
        .push(rotate(view2, -rotation))
        .push(rotate(view3, -rotation))
        .push(rotate(view4, -rotation))
        .repeatYoyo(1, 1.F)
        .start(tweenManager(group));
```

Where `rotate` helper method:

```java
@NonNull
public static TweenDef<View> rotate(@NonNull View view, float rotation) {
    return Tween.to(view, Rotation.I, 2.F).target(rotation);
}
```

## Expand

![gif]({{ this.$withBase('/assets/gif/tumbleweed/08-expand.gif') }})

Let's make all views appear from the center of the parent:

```java
Timeline.createParallel()
        .push(translate(view1))
        .push(translate(view2))
        .push(translate(view3))
        .push(translate(view4))
        .repeatYoyo(1, 2.F)
        .start(tweenManager(group));
```

We have added another helper method `translate`:

```java
@NonNull
public static TweenDef<View> translate(@NonNull View view) {
    return Tween.to(view, Translation.XY, 1.F).target(.0F, .0F);
}
```

As you can see it's animating a view into it's _original_ position (0, 0). That's why before running this interpolation we must place a view in the center of the parent:

```java
public static void placeViewInCenterOf(@NonNull View parent, @NonNull View view) {

    final int centerX = (parent.getRight() + parent.getLeft()) / 2;
    final int centerY = (parent.getBottom() + parent.getTop()) / 2;

    final Point point = ViewUtils.relativeTo(parent, view);

    final int expectedX = centerX - (view.getWidth() / 2);
    final int expectedY = centerY - (view.getHeight() / 2);

    view.setTranslationX(expectedX - point.x);
    view.setTranslationY(expectedY - point.y);
}
```

And run it before starting interpolation:

```java
placeViewInCenterOf(group, view1);
placeViewInCenterOf(group, view2);
placeViewInCenterOf(group, view3);
placeViewInCenterOf(group, view4);
```

To make sure that all views are measured (have width and height attributes are calculated) we will use an utility method from `ru.noties.tumbleweed.android.utils.ViewUtils`: 

```java
ViewUtils.whenReady(group, view -> {
    
});
```

So, the full code snippet will be:

```java
ViewUtils.whenReady(group, view -> {

    placeViewInCenterOf(group, view1);
    placeViewInCenterOf(group, view2);
    placeViewInCenterOf(group, view3);
    placeViewInCenterOf(group, view4);

    Timeline.createParallel()
            .push(translate(view1))
            .push(translate(view2))
            .push(translate(view3))
            .push(translate(view4))
            .repeatYoyo(1, 2.F)
            .start(tweenManager(group));
});
```

## Expand with easing

![gif]({{ this.$withBase('/assets/gif/tumbleweed/09-expand_easing.gif') }})

Let's add some easing to our `Expand` animation:

```java
Timeline.createParallel()
        .push(translate(view1).ease(Bounce.OUT))
        .push(translate(view2).ease(Bounce.OUT))
        .push(translate(view3).ease(Bounce.OUT))
        .push(translate(view4).ease(Bounce.OUT))
        .repeatYoyo(1, 2.F)
        .start(tweenManager(group));
```

## Expand sequential

![gif]({{ this.$withBase('/assets/gif/tumbleweed/10-expand_sequential.gif') }})

Let's make this: one item is animating _return_ to original position whilst next one is being faded in:

```java
view1.setAlpha(.0F);
view2.setAlpha(.0F);
view3.setAlpha(.0F);

Timeline.createSequence()
        .push(Timeline.createParallel()
                .push(translate(view4))
                .push(fadeIn(view3)))
        .push(Timeline.createParallel()
                .push(translate(view3))
                .push(fadeIn(view2)))
        .push(Timeline.createParallel()
                .push(translate(view2))
                .push(fadeIn(view1)))
        .push(translate(view1))
        .repeatYoyo(2, 2.F)
        .start(tweenManager(group));
```

## Color

![gif]({{ this.$withBase('/assets/gif/tumbleweed/11-color.gif') }})

Let's interpolate **colors**. For simplicity we will _swap_ colors of views.

```java
Timeline.createSequence()
        .push(Timeline.createParallel()
                .push(color(view1, color2))
                .push(color(view2, color1)))
        .push(Timeline.createParallel()
                .push(color(view3, color4))
                .push(color(view4, color3)))
        .repeatYoyo(1, 1.F)
        .start(tweenManager(group));
```

Where `color` helper method:

```java
@NonNull
public static TweenDef<View> color(@NonNull View view, @ColorInt int color) {
    return Tween.to(view, Argb.BACKGROUND, 1.F).target(Argb.toArray(color));
}
```

<blockquote class="custom warning">
<h3>Warning</h3>

`Argb.BACKGROUND` has one limitation: `target` value must a float array representing a color in a specific way. Please use `Argb.toArray(color)` method to construct such an array.
</blockquote>

## Text

![gif]({{ this.$withBase('/assets/gif/tumbleweed/12-text.gif') }})

The great thing about Tumbleweed is the ability to interpolate anything, it is not tight to UI widgets. So let's interpolate some **text**:

```java
Timeline.createSequence()
        .push(text(text1, 10))
        .push(text(text2, 20))
        .push(text(text3, 30))
        .push(text(text4, 40))
        .repeatYoyo(1, 1.F)
        .start(tweenManager(group));
```

Where `text` helper method:

```java
@NonNull
public static TweenDef<TextView> text(@NonNull TextView textView, int value) {
    return Tween.to(textView, TextType.I, 1.F).target(value);
}
```

Note the `TextType.I` argument. It is not bundled with the library but defined in our code, it looks like this:

```java
public static class TextType implements TweenType<TextView> {

    // as this class is stateless we can reuse it's instance
    public static final TextType I = new TextType();

    @Override
    public int getValuesSize() {
        // number of properties we interpolate
        return 1;
    }

    @Override
    public void getValues(@NonNull TextView textView, @NonNull float[] values) {
        values[0] = Integer.parseInt(textView.getText().toString());
    }

    @Override
    public void setValues(@NonNull TextView textView, @NonNull float[] values) {
        final int value = (int) (values[0] + .5F);
        textView.setText(String.valueOf(value));
    }
}
```

## Conclusion

Of cause this is just scratching the surface of complex Android animations. And it's primary focus is _view_ animations. But [Tumbleweed](https://github.com/noties/Tumbleweed) can do much-much more. For example, interpolating some properties of a Drawable. There are a lot of samples in the main repository in the sample application. So if you feel interested you can check the source code out.

![drawables](https://raw.githubusercontent.com/noties/Tumbleweed/master/art/drawable.gif)
