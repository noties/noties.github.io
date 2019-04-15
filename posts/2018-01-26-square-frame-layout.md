---
title:  "Square Frame Layout"
date:   2018-01-26
url: /blog/2018/01/26/square-frame-layout/index.html
---

A simple implementation of `FrameLayout` to be used in a `RecyclerView` with a `GridLayoutManager` in order to achieve square shaped layout. Does not depend on external dimensions. Will always be square even if you change `spanCount` at runtime.

```java
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
// to be continued...
```

<p $excerpt></p>

The actual trick is to use `widthMeasureSpec` as a spec for both `width` and `height`:

```java
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    //noinspection SuspiciousNameCombination
    super.onMeasure(widthMeasureSpec, widthMeasureSpec);
}
```

We suppress lint check as there is nothing suspicious here, everything is intended. So, the whole `SquareFrameLayout` implementation would look like this:

```java
public class SquareFrameLayout extends FrameLayout {

    public SquareFrameLayout(Context context) {
        super(context);
    }

    public SquareFrameLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        //noinspection SuspiciousNameCombination
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}
```

<sup>*</sup> <em>Please note that these 2 constructors that were overriden are sufficient for most of the custom views.</em>

This is how adapter view can look like:

```xml
<?xml version="1.0" encoding="utf-8"?>
<my.company.SquareFrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center" />

</my.company.SquareFrameLayout>
```

The **important** thing here is to use `match_parent` as the `layout_width` attribute for the `SquareFrameLayout`. `layout_height` can actually be any value (even `0px`). The rest will be taken care of by the `GridLayoutManager` and its `spanCount` setting.

This layout can be used when implementing custom gallery viewer. And works great with the [Grid Items Equal Spacing]({% post_url 2018-01-23-grid-items-equal-spacing-recyclerview %}).

<img src="{{ this.$withBase('/assets/images/recycler_grid_3.png') }}" alt="3 columns" width="45%" />
