# API reference
#### Quick overview of hyperapp's core APIs

- [`h()`](#h)
- [`app()`](#app)
- [`Lazy()`](#lazy)
- [Actions](#actions)
- [Effects](#effects)
- [Subscriptions](#subscriptions)

## h()

`h(type, props, ...children)`

Hyperscript function to create virtual DOM nodes (VNodes).  

**`type`** - Name of the node, eg: `div`, `h1`, `button`, etc.   
**`props`** - Object containing HTML or SVG attributes you want your node to have.  
**`children`** - Array of child VNodes.  

A VNode is a simplified representation of a DOM element to be created. A tree of VNodes is a virtual DOM.

```javascript
import { h } from "hyperapp";

h("div", { id: "box" }, [
  h("h1", {}, "Hello!"),
  h("p", {}, `Current year is ${new Date().getFullYear()}.`),
])
```
The code above returns the following virtual DOM (abridged for clarity)
```javascript
{
  name: "div",
  props: {
    id: "box"
  },
  children: [
    {
      name: "h1",
      props: {},
      children: ["Hello!"]
    },
    {
      name: "p",
      props: {},
      children: ["Current year is 2020."]
    },
  ]
}
```
Which hyperapp renders to
```html
<div id="box">
  <h1>Hello!</h1>
  <p>Current year is 2020.</p>
</div>
```


## app()

`app({ init, view, subscriptions, node })`

Initialize an hyperapp app using the given options.

**`init`** - [Action](#actions) to initialize the app's state. Can be the initial state itself or a function that returns it. Can also kick off [Effects](#effects).   
**`view`** - Function that returns a virtual DOM for a given state. It maps your state to a UI that hyperapp renders.   
**`subscriptions`** - Array of [subscriptions](#subscriptions) to subscribe to.   
**`node`** - DOM element to render the virtual DOM on. Also known as the application container or the mount node.   

```javascript
import { app } from "hyperapp";
// ...
app({
  
  // Possible usages for init:
  init: state,
  init: Action,
  init: [state, Effect],
  init: [Action, Effect],

  view: View,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    SomeSubscription
  ]
});
```



## Lazy()

`Lazy({ render, ...props })`

Higher order function to memoize view functions.

**`render`** - Function that returns a virtual DOM. *Must be a named function.*   
**`...props`** - Props to pass down to the view function. The underlying view is only re-computed when those change.   

```javascript
import { Lazy } from "hyperapp"
import { Foo } from "./components/foo"

const LazyFoo = props =>
  Lazy({
    render: Foo,
    key: "unique-key",
    foo: props.foo,
    bar: props.bar
  })
```


## Actions

Actions describe the transitions between the states of your app.

You write them as pure, deterministic functions that produce no side-effects. They are dispatched in response to DOM events in your app, by an effect or by a subscription. They come in two forms:   

**Simple action: `state => nextState`**   
No parameters, next state is determined entirely on the previous state.

```javascript
// Simple action
const Increment = (state) => state + 1

// Usage in the view
<button onclick={Increment}>+</button>
```

**Complex action: `(state, params) => nextState`**   
Action with parameters along with the previous state.
```javascript
// Complex action
const IncrementBy = (state, by) => state + by

// Usage in the view, using an "Action tuple"
<button onclick={[IncrementBy, 5]}>+5</button>
```



## Effects

`[fx, params]`

Tuples that represent a side-effect that needs to run. Effects do not execute code, they represent code that needs to be executed.

**`fx`** - Effect runner.   
**`params`** is data passed to the effect runner.

**Effect runner `(dispatch, params) => void`**

Executes your side effect outside of hyperapp and can dispatch an Action when complete.

```javascript
// Effect runner
const fooFx = (dispatch, params) => {
  console.log(params) // Do side effects
  dispatch(SomeAction) // Optionnally dispatch an action
}

// Helper to easily create the effect tuple for the foo effect
const foo = params => [fooFx, params]

// Usage in the view
<button onclick={[state, foo('bar')]}>do foo</button>
```




## Subscriptions



```javascript
const fx = (a) => (b) => [a, b]

const Sub = fx((dispatch, props) => {
  // Subscribe
  return () => {
    // Unsubscribe
  }
})
```




#### TODO
- Talk about the class attribute when used as an object
- Talk about the style attribute when used as an object
