# API reference
### Quick overview of hyperapp's core APIs

- [`h()`](#h)
- [`app()`](#app)
- [`Lazy()`](#lazy)
- [Actions](#actions)
- [Effects](#effects)
- [Subscriptions](#subscriptions)

## h()

`h(type, props, ...children)`

Hyperscript function to create virtual DOM nodes (VNodes).  

**type** - Name of the node, eg: div, h1, button, etc.   
**props** - Object containing HTML or SVG attributes the DOM node will have.  
**children** - Array of child VNodes.  

```javascript
import { h } from "hyperapp";

h("div", { id: "box" }, [
  h("h1", {}, "Hello!"),
  h("p", {}, `Current year is ${new Date().getFullYear()}.`),
])
```


<details><summary>The code above returns the following virtual DOM (click to see)</summary>

```javascript
// A VNode is a simplified representation of a DOM element. A tree of VNodes is a virtual DOM.
// This is what the virtual DOM for the code above looks like, abridged for clarity.
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
which hyperapp renders to:
```html
<div id="box">
  <h1>Hello!</h1>
  <p>Current year is 2020.</p>
</div>
```
</details>

### Special attributes

#### on<i>event</i> attributes

**<a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers" target="_blank">on<i>event</i></a>** attributes such as onclick, onsubmit, onblur, etc. dispatch [actions](#actions) directly to hyperapp.

<details><summary>See sample <strong>on<i>event</i></strong> usage</summary>

```javascript
<button onclick={Action}>
  Click me to dispatch an action!
</button>
```
</details>

#### style attribute

**style** attribute can be either a string of CSS or an object of styles

<details><summary>See sample <strong>style</strong> attribute usage</summary>

```javascript
<div
  style={{
    padding: "1rem",
    border: "1px solid currentColor",
    borderRadius: "0.5rem",
    color: "#333"
  }}
>
  Hello!
</div>
```
</details>

#### class attribute

The **class** attribute can be either a string of classes or an object of classes. For the object, the keys are the names of the classes to add and the values are booleans for toggling the classes.

<details><summary>See sample <strong>class</strong> attribute usage</summary>

```javascript
const VariableUserBox = ({ user, useBorders, variant }) => (
  <div
    class={{
      box: true,
      disabled: user.role !== 'admin',
      ["has-borders"]: useBorders,
      [variant]: !!variant
    }}
  >
    {user.name}
  </div>
)
```
</details>





## app()

`app({ init, view, subscriptions, node })`

Initialize an hyperapp app using the given options.

**init** - [Action](#actions) to initialize the app's state. Can be the initial state itself or a function that returns it. Can also kick off [Effects.](#effects)   
**view** - Function that returns a virtual DOM for a given state. It maps your state to a UI that hyperapp renders.   
**subscriptions** - Array of [subscriptions](#subscriptions) to subscribe to.   
**node** - DOM element to render the virtual DOM on. Also known as the application container or the mount node.   

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

**render** - Function that returns a virtual DOM. *Must be a named function.*   
**...props** - Props to pass down to the view function. The underlying view is only re-computed when those change.   

```javascript
import { Lazy } from "hyperapp"
import { Pizzas } from "./components/Pizzas"

const LazyFoo = props =>
  Lazy({
    render: Pizzas,
    key: "unique-key", // Make sure the lazy component itself doesn't re-render
    pizzas: props.pizzas,
    expanded: true
  })
```


## Actions

`(state, params?) => nextState`

Functions that describe the transitions between the states of your app.

They are pure, deterministic functions that produce no side-effects and return the next state. They are dispatched by either DOM events in your app, [effects](#effects) or by [subscriptions](#subscriptions). They come in two forms:   

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

Tuples that describe a side-effect that needs to run. Effects do not execute code, they represent code that needs to be executed.

**fx** - Effect runner.   
**params** Data to be passed to the effect runner.

**Effect runner `(dispatch, params) => void`**

Executes your side effect outside of hyperapp and can dispatch an [action](#actions) when it completes.

```javascript
// Effect runner
const httpFx = (dispatch, params) => {
  // Do side effects
  fetch(params.url, params.options)
    .then(res => res.json())
    .then(data => dispatch(data)) // Optionnally dispatch an action
}

// Helper to easily create the effect tuple for the Http effect
const Http = params => [httpFx, params]

// Usage in the view
<button
  onclick={[
    state,
    Http({
      url: '/pizzas',
      action: SetPizzas
    })
  ]}
>
  get pizzas
</button>
```




## Subscriptions

`[sub, params]`

Tuples that describe bindings to external events.

They allow you to dispatch [actions](#actions) based on external events, such as websockets, keystrokes or any other events outside hyperapp.

**sub** - Subscription configurator.   
**params** - Data to be passed to the configurator.

**Subscription configurator `(dispatch, params) => cleanupFunction`**

Binds **dispatch** to an external event. Returns a cleanup function that removes the binding.

```javascript
// Subscription configurator
const keySub = (dispatch, params) => {

  // Hook up dispatch to external events
  const handler = (ev) => {
    if (params.codes.includes(ev.code)) {
      dispatch([params.action, ev.code])
    }
  }
  window.addEventListener('keydown', handler)
  
  // Cleanup function
  return () => window.removeEventListener('keydown', handler)
}

// Helper to easily create the subscription tuple
const Key = params => [keySub, params]

// Usage in app
app({
  // ...
  subscriptions: state => [
    Key({
      codes: ['w', 'a', 's', 'd'],
      action: ChangeDirection
    })
  ]
})
```
