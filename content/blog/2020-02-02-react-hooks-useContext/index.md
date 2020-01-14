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

// TODO: Multiple Context example

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
        <Main />
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

function MainRender() {
  return (
    <MyContext.Consumer>
      {value => (
        <CartContext.Consumer>
          {cartValue => (
            <main className={value}>
              <h1>Current theme value: {value}</h1>
              <p>Cart is currently: {cartDetails.isCartOpen}</p>
            </main>
          )}
        </CartContext.Consumer>
      )}
    </MyContext.Consumer>
  )
}
```

This is where useContext shines:

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
        <Main />
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

function MainHooks() {
  const theme = React.useContext(ThemeContext)
  const cartDetails = React.useContext(CartContext)

  return (
    <main className={theme}>
      <h1>Current theme value: {theme}</h1>
      <p>Cart is currently: {cartDetails.isCartOpen}</p>
    </main>
  )
}
```

If you are looking for a more detailed example you can find one [here](https://reactjs.org/docs/hooks-reference.html#usecontext).