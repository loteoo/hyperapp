# API reference
Quick overview of hyperapp's core concepts.

- [h()](#h)
- [app()](#app)
- [actions](#actions)
- [effects](#effects)
- [streams](#streams)

## h()
`h(type, props, ...children)`

Hyperscript function to create virtual DOM nodes (VNodes).  

`type` is the name of the node, eg: `div`, `h1`, `button`, etc.

`props` is an object containing HTML or SVG attributes you want your node to have.

`children` is an array of child nodes.

A virtual DOM node is a simplified representation of a DOM element to be created.

```javascript
import { h } from 'hyperapp';

h('div', { id: 'box' }, [
  h('h1', {}, 'Hello!'),
  h('p', {}, `Current year is ${new Date().getFullYear()}.`),
])
```
The code above returns the following VNode tree (a virtual DOM)
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

## actions

## effects

## streams
