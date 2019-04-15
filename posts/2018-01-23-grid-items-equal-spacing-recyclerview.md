---
title: "Grid items equal spacing (RecyclerView)"
date: 2018-01-23
url: /blog/2018/01/23/grid-items-equal-spacing-recyclerview/index.html
---

This is how to achieve equal spacing between grid elements and `RecyclerView` borders. Applicable for both `GridLayoutManager` and `StaggeredGridLayoutManager`. No modification of existing `Adapter` is required.

<img src="{{ this.$withBase('/assets/images/recycler_grid_2.png') }}" alt="2 columns" width="30%" />
<img src="{{ this.$withBase('/assets/images/recycler_grid_3.png') }}" alt="3 columns" width="30%" />
<img src="{{ this.$withBase('/assets/images/recycler_grid_4.png') }}" alt="4 columns" width="30%" />

<p $excerpt></p>

The simple trick is to combine `RecyclerView.ItemDecoration` and `RecyclerView` paddings:

```java

// initialise RecyclerView 
final RecyclerView recyclerView = findViewById(R.id.recycler_view);
final GridLayoutManager layoutManager = new GridLayoutManager(this, spanCount);
recyclerView.setLayoutManager(layoutManager);
recyclerView.setAdapter(new Adapter(this));

final int spacing = getResources().getDimensionPixelSize(R.dimen.recycler_spacing) / 2;

// apply spacing
recyclerView.setPadding(spacing, spacing, spacing, spacing);
recyclerView.setClipToPadding(false);
recyclerView.setClipChildren(false);
recyclerView.addItemDecoration(new RecyclerView.ItemDecoration() {
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        outRect.set(spacing, spacing, spacing, spacing);
    }
});
```

In the snippet above we are dividing desired spacing by two. We need this because we are applying half of the spacing to _each_ element **and** `RecyclerView` borders. This way all items will be _surrounded_ by equal spacing.
