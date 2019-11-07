# Common Widgets

## viewPager

viewPager is like carousel

## menu

nothing special

## RecycleView

1. RecycleView is like infinite list
2. viewHolder is just a wrapper for view:

    new a viewHolder, just give viewHolder the reference of view

    ```java
    new viewHolder(View itemView)
    ```

    and recycleView doesn't touch viewHolder directly, it'll invoke methods of `adapter`
3. methods in adapter
    1. `onCreateViewHolder` create **one** viewHolder a time, so it'll invoke many time until recycleView has enough views to display,
        then it can reuse the views created, like a pool
    2. `onBindViewHolder(viewHolder, int postion)` when position of recycleView changes, the content of viewHolder will change, invoke this method to update view

        position is adapter postion from `viewholder.getAdapterPosition()`
4. click event
    1. let viewHolder implement onClickListener
    2. then let put the holder to its **itemView**, cause itemView itself is the target the user clicks

## SearchView

useful widget for search feature. it supports:

1. listeners
    1. get text when search text changes
    2. get text when user submits
    3. set history in a list view by seting query

## CardView

like recycleview, auto shadow style, etc.

## Snackbar

stay in the bottom of screen, like a notification, auto hide

## floating action button

floating button