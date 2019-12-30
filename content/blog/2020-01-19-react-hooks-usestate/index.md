---
title: "React Hooks: useState"
date: "2020-01-19"
---

![Cover Image](./images/Dark-LinkedIn-Post-Header.png)

Welcome to the first post in a series on React Hooks, I know react hooks have been around a while and there are loads of post about them but I wanted to create a post series, I am going to try make the posts as short as possible(although this post will be a bit longer).

## What are "hooks"?

Hooks are functions that let you "Hook into" React state and lifecycle features from function components. React will preserve the value of useState during re-renders.

### Rules for using Hooks

Hooks are JavaScript functions, but they impose two additional rules:

- Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions.

Directly from [React Dev Blog](https://reactjs.org/docs/hooks-overview.html#rules-of-hooks)

A more detailed comparison between the class way of using state e.g _this.setState_ and hooks can be found [here](https://reactjs.org/docs/hooks-state.html). The first hook we are going to discuss is _useState_.

## What is the useState Hook?

Let me start off with a simple counter example: (I have commented the code to give a better overview)

![hooks_counter.gif](./images/hooks_counter.gif)

```jsx
function CounterApp() {
  // useState returns [value, dispatch/updater function] which you can use array destructing to get each of the pair.
  const [count, setCount] = useState(0)
  // You can have more than one useState in a Component, e.g using a boolean here
  const [isCounterControlsShowing, toggleCounterControls] = useState(true)
  return (
    <div className="App">
      <h1>React Hooks Playground</h1>
      <h2>useState: Simple Counter</h2>
      {/* Value be read / rendered like any other value in react */}
      <p>{count}</p>
      {/* If you need to update the value at any time you can via the updater function */}
      {isCounterControlsShowing && (
        <div className="counter-controls">
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
        </div>
      )}

      <button onClick={() => toggleCounterControls(!isCounterControlsShowing)}>
        Toggle Counter controls
      </button>
    </div>
  )
}
```

_useState_ allows you to add local state to a functional component. The only argument _useState_ takes is the initial state. In the example above, it is `0` because our counter starts from zero. useState can take most JS primitive types, number, strings, objects, arrays etc. You can use _useState as many times as you want._

First time looking at the above may look weird and you might ask wouldn't it be better to do something like this:

```jsx
function CounterAppObject() {
  // Closer to class version of this.setState
  const [state, setState] = useState({
    count: 0,
    isCounterControlsShowing: true,
  })

  return (
    <div className="App">
      <h1>React Hooks Playground</h1>
      <h2>useState Object: Simple Counter</h2>
      <p>{state.count}</p>
      {state.isCounterControlsShowing && (
        <div className="counter-controls">
          {/* We merge the state using spread operator so it keeps all the old state */}
          <button onClick={() => setState({ count: state.count + 1 })}>
            +
          </button>
          <button onClick={() => setState({ count: state.count - 1 })}>
            -
          </button>
        </div>
      )}
      {/* We merge the state using spread operator so it keeps all the old state */}
      <button
        onClick={() =>
          setState({
            isCounterControlsShowing: !state.isCounterControlsShowing,
          })
        }
      >
        Toggle Counter controls
      </button>
    </div>
  )
}
```

I wouldn't blame you for thinking this because it would translate back to classes like this:

```jsx
class CounterClassVersion extends React.Component {
  state = {
    count: 0,
    isCounterControlsShowing: false,
  }
  render() {
    return (
      <div className="App">
        <h1>React Hooks Playground</h1>
        <h2>Class Example: Simple Counter</h2>
        <p>{this.state.count}</p>
        {this.state.isCounterControlsShowing && (
          <div className="counter-controls">
            {/* Doing this ends up removing the isCounterControlsShowing Property */}
            <button
              onClick={() => this.setState({ count: this.state.count + 1 })}
            >
              +
            </button>
            <button
              onClick={() => this.setState({ count: this.state.count - 1 })}
            >
              -
            </button>
          </div>
        )}
        {/* Doing this ends up removing the count Property */}
        <button
          onClick={() =>
            this.setState({
              isCounterControlsShowing: !this.state.isCounterControlsShowing,
            })
          }
        >
          Toggle Counter controls
        </button>
      </div>
    )
  }
}
```

However, they are not the same, when we use _this.setState_ in the class version e.g _this.setState({count: this.state.count + 1})_ react would 'merge' state updates (all merging means is it keeps all the old state and only updates what you told it to). However, _useState_ doesn't merge updates, if you run the same code via an updater function e.g _setState({count: count + 1})_ you would actually end up delete the _isCounterControlsShowing_ property because the updater function sets the value to whatever you passed in, i.e it doesn't care about old values.

### Merging State

You can use objects with *useState* but you remember you must merge the state yourself, how do you do that? Well, it can be done via the spread operator like:

```jsx
function CounterAppObject() {
  // Closer to class version of this.setState
  const [state, setState] = useState({
    count: 0,
    isCounterControlsShowing: true,
  })

  return (
    <div className="App">
      <h1>React Hooks Playground</h1>
      <h2>useState Object: Simple Counter</h2>
      <p>{state.count}</p>
      {state.isCounterControlsShowing && (
        <div className="counter-controls">
          {/* We merge the state using spread operator so it keeps all the old state */}
          <button
            onClick={() => setState({ ...state, count: state.count + 1 })}
          >
            +
          </button>
          <button
            onClick={() => setState({ ...state, count: state.count - 1 })}
          >
            -
          </button>
        </div>
      )}
      {/* We merge the state using spread operator so it keeps all the old state */}
      <button
        onClick={() =>
          setState({
            ...state,
            isCounterControlsShowing: !state.isCounterControlsShowing,
          })
        }
      >
        Toggle Counter controls
      </button>
    </div>
  )
}
```

## Conclusion

I hope you enjoyed the first post on the _useState_ hook, as stated this is the first post in the react hooks series. Next, I will be discussing _useEffect,_ so join me next time.

Jason
