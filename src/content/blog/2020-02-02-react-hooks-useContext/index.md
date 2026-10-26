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

Before we had useContext we used render props to access the context values, the useContext hook allows use to use a context value without using render props. See example below:

```jsx

const themeDetails = 'light';
const ThemeContext = React.createContext(themeDetails);

function App() {
  return (
    <ThemeContext.Provider value={themeDetails}>
      <Main />
    </ThemeContext.Provider>
  );
}

function MainRender() {
    return (
        <MyContext.Consumer>
            {value => (
                <main className={value}>
                   <h1>Current theme value: {value}</h1>
                </main>
            )}
        </MyContext.Consumer>
    )
}
// useContext
function Main() {
  const theme = useContext(ThemeContext);

  return (
    <main className={theme}>
        <h1>Current theme value: {theme}</h1>
    </main>
  );

```

While this doesn't seem to bad it starts getting crazy when you have to consume multiple contexts. Each context means wrapping in another context consumer that will expose the values with a render prop as you have more and more of this things start to snowball:

```jsx
const themeDetails = "light"
const cartDetails = {
  isCartOpen: false,
  cartTotal: 0,
}
const ThemeContext = React.createContext(themeDetails)
const CartContext = React.createContext(cartDetails)

function App() {
  return (
    <ThemeContext.Provider value={themeDetails}>
      <CartContext.Provider value={cartDetails}>
        <MainRender />
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

function MainRender() {
  return (
    <ThemeContext.Consumer>
      {(themeValue) => (
        <CartContext.Consumer>
          {(cartValue) => (
            <main className={themeValue}>
              <h1>Consuming Context: No Hooks</h1>
              <h2>Current theme value: {themeValue}</h2>
              <p>
                Cart is currently: {cartValue.isCartOpen ? "Open" : "Closed"}
              </p>
            </main>
          )}
        </CartContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}
```

This is where useContext shines:

```jsx
// The same code is needed for the provider but now when consuming contexts

function MainHooks() {
  const theme = React.useContext(ThemeContext)
  const cartValue = React.useContext(CartContext)

  return (
    <main className={theme}>
      <h1>Consuming Context: Hooks Version</h1>
      <h2>Current theme value: {theme}</h2>
      <p>Cart is currently: {cartValue.isCartOpen ? "Open" : "Closed"}</p>
    </main>
  )
}
```

If you are looking for a more detailed example you can find one [here](https://reactjs.org/docs/hooks-reference.html#usecontext).

## Conclusion

I hope you enjoyed this third post in the react hooks series, this week we discussed useContext. We have now covered the basic hooks, useState, useEffect and useContext. Join me next week when I will be discussing [tba]
