---
title: "Refactoring: Improving the Design of Existing Code"
date: "2020-XX-XX"
description: ""
---

As stated in my previous post, back on the trend of reading more Software related books this year. This post is about the book Refactoring: Improving the Design of Existing Code By Martin Fowler. This is the new 2018 edition which all the examples are Javascript which made me want to read it more. This post will be a summary of some of the points I highlighted during my course of reading the book.

When you have to add a feature to a program but the code is not structured in a convenient way, first refactor the program to make it easy to add the feature, then add the feature.

The Rule of Three

Here’s a guideline Don Roberts gave me: The first time you do something, you just do it. The second time you do something similar, you wince at the duplication, but you do the duplicate thing anyway. The third time you do something similar, you refactor.

Or for those who like baseball: Three strikes, then you refactor.

The whole purpose of refactoring is to make us program faster, producing more value with less effort.

A heuristic we follow is that whenever we feel the need to comment something, we write a function instead.




Global data illustrates Paracelsus’s maxim: The difference between a poison and something benign is the dose. You can get away with small doses of global data, but it gets exponentially harder to deal with the more you have

The fundamental rule of thumb is to put things together that change together

If you have to spend effort looking at a fragment of code and figuring outwhat it’s doing, then you should extract it into a function and name the function after the “what.