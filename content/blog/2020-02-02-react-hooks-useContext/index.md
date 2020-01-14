---
title: "React Hooks: useContext"
date: "2020-02-02"
description: "The third post in a new series on React Hooks, this post discusses the useContext hook."
---

This is the third post in the series on React Hooks, previously we discussed useContext. I am going to try to keep this as short as possible so here we go:

useContext Summary

- Context is used to avoid prop-drilling
- Should only store actual global state like website theme, if the cart is open on an e-commence site.
- Accept a context object and returns context value for that context.
- A component calling useContext will always re-render when the context value changes.
- Context can be optimized using memoization
- useContext only lets you read the context and subscribe to its change

// TODO: Insert Hooks example

While this doesn't seem to bad it starts getting crazy when you have to consume multiple contexts. Each context means wrapping in another context consumer that will expose the values with a render prop as you have more and more of this things start to snowball:

// TODO: Multiple Context example

This is where useContext shines:

// TODO: Multiple Context with useContext example.

If you are looking for a more detailed example you can find one [here](https://reactjs.org/docs/hooks-reference.html#usecontext).
