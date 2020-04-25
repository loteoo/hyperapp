# API reference
#### Quick overview of hyperapp's core API

- [`h()`](#h)
- [`app()`](#app)
  - [init](#init)
  - [view](#view)
  - [subscriptions](#subscriptions)
  - [node](#node)
- [`Lazy()`](#lazy)
- [actions](#actions)
- [effects](#effects)


## h()
`h(type, props, ...children)`

Hyperscript function to create virtual DOM nodes (VNodes).  

`type` is the name of the node, eg: `div`, `h1`, `button`, etc.

`props` is an object containing HTML or SVG attributes you want your node to have.

`children` is an array of child VNodes.

A VNode is a simplified representation of a DOM element to be created.

A tree of VNodes is a virtual DOM.

```javascript
import { h } from 'hyperapp';

h('div', { id: 'box' }, [
  h('h1', {}, 'Hello!'),
  h('p', {}, `Current year is ${new Date().getFullYear()}.`),
])
```
The code above returns the following tree
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
Which hyperapp will render to
```html
<div id="box">
  <h1>Hello!</h1>
  <p>Current year is 2020.</p>
</div>
```


## app()

`app({ init, view, subscriptions, node })`

Initialize an hyperapp app using the given options.

`init` is an [Action](#actions) to initialize the app's state. It can be the initial state itself or an action that returns it.

`view` is a function that return the virtual DOM for a given state. It maps your state to a UI you want hyperapp to render.

`subscriptions` is an array of [subscriptions](#subscriptions) to subscribe to.

`node` DOM element to render the virtual DOM on. Also known as the application container.




## Lazy()





## actions

Actions describe the transitions between the states of your app.

You write them as pure, deterministic functions that produce no side-effects.

They are dispatched in response to DOM events in your app, or by an effect.

They come in two forms:

#### Simple action: `state => nextState`
No parameters, next state is determined just based on the previous state.

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



## effects
`[fx, params]`
Tuples that represent a side-effect that needs to run. Effects do not execute code, they represent code that needs to be executed.
The first value `fx` is an effect runner. 
The second value `params` is data passed to the effect runner.

#### Effect runner
Function with the signature `(dispatch, params) => void`.
Can dispatch an Action when complete.
It executes your side effect outside of hyperapp and 
```javascript
const fx = (dispatch, params) => {

  // Do side effects
}

// Usage in the view, using an "Action tuple"
<button onclick={[fx, 5]}>+5</button>
```


## subscriptions

```javascript
const fx = (a) => (b) => [a, b]

export const Sub = fx((dispatch, props) => {
  // Subscribe
  return () => {
    // Unsubscribe
  }
})
```




#### TODO
- Talk about the class attribute when used as an object
- Talk about the style attribute when used as an object
