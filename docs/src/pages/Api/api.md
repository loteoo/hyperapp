# API reference
### Quick overview of hyperapp's core APIs

Below is a consice recap of hyperapp's core APIs, jam-packed with information about the framework.

It's geared towards developers who already understand what hyperapp is and want to see documentation for it's concepts.

- [`h()`](#h)
  - [on<i>event</i>](#onevent-props)
  - [key](#key-prop)
  - [style](#style-prop)
  - [class](#class-prop)
- [`app()`](#app)
  - [Middlewares](#middlewares)
- [`Lazy()`](#lazy)
- [Actions](#actions)
  - [Simple](#simple-action-state--nextstate)
  - [Complex](#complex-action-state-params--nextstate)
  - [With side-effects](#action-with-side-effects-state--nextstate-effects)
- [Effects](#effects)
- [Subscriptions](#subscriptions)

## h()

```javascript
h(type, props, ...children)
```

Hyperscript function to create virtual DOM nodes (VNodes).  

- **type** - Name of the node, eg: div, h1, button, etc.   
- **props** - Object containing HTML or SVG attributes the DOM node will have and [special props](#special-props).  
- **children** - Array of child VNodes.  

```javascript
import { h } from "hyperapp";

const Box = ({ showGreeting = false }) =>
  h("div", { id: "box" }, [
    h("h1", {}, "Hello!"),
    showGreeting && h("p", {}, "Nice to see you."),
  ])
```


<details><summary>The function above returns the following virtual DOM (click to see)</summary>

```javascript
// A VNode is a simplified representation of a DOM element. A tree of VNodes is a virtual DOM.
// This is what the virtual DOM returned by the function above looks like, abridged for clarity.

// Box({ showGreeting: true }) or <Box showGreeting={true} />

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
      children: ["Nice to see you."]
    },
  ]
}
```
which hyperapp renders to:
```html
<div id="box">
  <h1>Hello!</h1>
  <p>Nice to see you.</p>
</div>
```
</details>

### Special props

#### On<i>event</i> props

<code><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers" target="_blank">on<i>event</i></a></code> props such as onclick, onsubmit, onblur, etc. dispatch [actions](#actions) directly to hyperapp. In the Action tuple, the second element can be a function that processes the events before passing the params to the action.


```javascript
<input name="amount" type="number" onchange={[SetAmount, ev => parseInt(ev.target.value)]} />
```

#### Key prop

The `key` is a unique string per VNode that help hyperapp track if VNodes are changed, added or removed in situations where it can't, such as in arrays.


```javascript
const Items = ({ items }) => (
  <ul>
    {items.map((item) =>
      <li key={item.id}>
        {item.text}
      </li>
    )}
  </ul>
)
```

#### Style prop

The `style` prop can be either a string of CSS or an object of styles

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

#### Class prop

The `class` prop can be either a string of classes or an object of classes. For the object, the keys are the names of the classes to add and the values are booleans for toggling the classes.


```javascript
const VariableProfileBox = ({ user, useBorders, variant }) => (
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





## app()

```javascript
app({ init, view, subscriptions, node, middleware })
```

Initialize an hyperapp app using the given options.

- **init** - [Action](#actions) to initialize the app's state. Can be the initial state itself or a function that returns it. Can also kick off [Effects.](#effects)   
- **view** - Function that returns a virtual DOM for a given state. It maps your state to a UI that hyperapp renders.   
- **subscriptions** - Array of [subscriptions](#subscriptions) to subscribe to.   
- **node** - DOM element to render the virtual DOM on. Also known as the application container or the mount node.   
- **middleware** - [Middeware](#middlewares) higher order function.

```javascript
import { app } from "hyperapp";
// ...
app({
  init: InitialAction,
  view: View,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    SomeSubscription
  ]
});
```

#### Middlewares
```javascript
dispatch => newDispatch
```

Middlewares are higher order functions that change the `dispatch` that hyperapp will use. They are used for wrapping all actions that the app will dispatch with extended behavior.

```javascript
const middleware = dispatch => /* newDispatch */

app(props, middleware)
```


## Lazy()

```javascript
Lazy({ render, ...props })
```

Higher order function to memoize view functions.

- **render** - Function that returns a virtual DOM. *Must be a named function.*   
- **...props** - Props to pass down to the view function. The underlying view is only re-computed when those change.   

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

```javascript
(state, params?) => nextState
```

Functions that describe the transitions between the states of your app.

They are pure, deterministic functions that produce no side-effects and return the next state. They are dispatched by either DOM events in your app, [effects](#effects) or by [subscriptions](#subscriptions). They come in many forms:   

#### Simple action: `state => nextState`
No parameters, next state is determined entirely on the previous state.

```javascript
// Simple action
const Increment = (state) => state + 1

// Usage in the view
<button onclick={Increment}>+</button>
```

#### Complex action: `(state, params) => nextState`
Action with parameters along with the previous state.
```javascript
// Complex action
const IncrementBy = (state, by) => state + by

// Usage in the view, using an "Action tuple"
<button onclick={[IncrementBy, 5]}>+5</button>
```

#### Action with side-effects: `(state) => [nextState, ...effects]`
Action that returns [effects](#effects) to run along with the next state.
```javascript
import { Http } from './fx'

// Action with HTTP side-effect
const GetPizzas = (state) => [
  state,
  Http({
    url: '/pizzas',
    action: SetPizzas
  })
]

// Usage in the view
<button onclick={GetPizzas}>Get pizzas</button>
```
Actions with side-effects can also take in params, just like a complex action. If so, it will be dispatched in the same way using an "Action tuple".


## Effects

```javascript
[fx, params]
```

Tuples that describe a side-effect that needs to run. Effects do not execute code, they represent code that needs to be executed.

- **fx** - Effect runner.   
- **params** Data to be passed to the effect runner.

#### Effect runner `(dispatch, params) => void`

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

// Usage of the effect in an action
const GetPizzas = (state) => [
  state,
  Http({
    url: '/pizzas',
    action: SetPizzas
  })
  // Could add more effects here...
]

// Usage of the "action with side-effect" in the view
<button onclick={GetPizzas}>Get pizzas</button>
```




## Subscriptions

```javascript
[sub, params]
```

Tuples that describe bindings to external events.

They allow you to dispatch [actions](#actions) based on external events, such as websockets, keystrokes or any other events outside hyperapp.

- **sub** - Subscription configurator.   
- **params** - Data to be passed to the configurator.

#### Subscription configurator `(dispatch, params) => cleanupFunction`

Binds **dispatch** to an external event. Returns a cleanup function that removes the binding.

```javascript
// Subscription configurator
const keySub = (dispatch, params) => {

  // Hook up dispatch to external events
  const handler = (ev) => {
    if (params.keys.includes(ev.key)) {
      dispatch([params.action, ev.key])
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
      keys: ['w', 'a', 's', 'd'],
      action: ChangeDirection
    })
  ]
})
```
