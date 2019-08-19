---
title: How to toggle boolean in SQLite
---

Okay, [SQLite doesn't have a separate Boolean datatype](https://www.sqlite.org/datatype3.html),
but it's not uncommon to use an `INTEGER` to store one. How can we _toggle_ this value in a
single SQL statement without retrieving stored value first?

<p $excerpt></p>

For example, we have a table `people` with contents:

<table>
<thead>
    <tr><th>id</th><th>name</th><th>is_friend</th></tr>
</thead>
<tbody>
    <tr><td>1</td><td>Peter</td><td>0</td></tr>
    <tr><td>2</td><td>Mary</td><td>1</td></tr>
    <tr><td>3</td><td>John</td><td>0</td></tr>
</tbody>
</table>

To _toggle_ Mary's `is_friend` property we can execute this SQL statement:

```sql
UPDATE `people` SET is_friend = ((is_friend | 1) - (is_friend & 1)) WHERE id = 2
```

Of cause in order for this to work `is_friend` column must be _limited_ to store
either `0` or `1`. Make sure that you properly initialize you _boolean_ column whilst creating a table
by introducing a `DEFAULT` value (0) and validating `CHECK` expression:

```sql
CREATE TABLE `people` (
	`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name` TEXT NOT NULL,
	`is_friend` INTEGER NOT NULL DEFAULT 0 CHECK(is_friend IN (0,1))
);
```

Unfortunately SQLite does not allow adding `DEFAULT` nor `CHECK` attributes to existing tables.
This is why we have to create a temporary table, copy contents into it, drop existing table and then
rename newly created one:

```sql
-- begin transaction
BEGIN;

-- create a new table with proper structure
CREATE TABLE `people_proper` (
	`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name` TEXT NOT NULL,
	`is_friend` INTEGER NOT NULL DEFAULT 0 CHECK(is_friend IN (0,1))
);

-- copy data from old table
INSERT INTO `people_proper`
    SELECT  
        `id`, 
        `name`, 
        -- make all invalid data to default to 0 (false)
        (CASE WHEN is_friend NOT IN(0,1) THEN 0 ELSE is_friend END) AS `is_friend`
    FROM `people`;

-- drop old table
DROP TABLE `people`;

-- rename new table
ALTER TABLE `people_proper` RENAME TO `people`;

-- commit transaction
COMMIT;
```