---
title: Android Enum vs. Int
url: /blog/2019/08/14/enum-vs-int/index.html
date: 2019-08-14
draft: true
---

After famous <del>advice</del> `strictly avoid using enums` instead of integers<sup>*</sup> (less memory! save [1K of RAM NOW!](https://speakerdeck.com/romainguy/android-memories?slide=67)) it's really surprising that Google adopted Kotlin. But honestly I hadn't followed the advice strictly and always preferred functionality over premature optimization.

<sup>* &mdash; Current [documentation](http://developer.android.com/training/articles/memory.html#Overhead) version is different, but there is a [SO thread answer](https://stackoverflow.com/a/25003455/6745174) that contains the quote.