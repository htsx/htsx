# **HTSX** [![Actions Status](https://github.com/michaljach/htsx/workflows/Build/badge.svg)](https://github.com/michaljach/htsx/actions)

##### Build UIs with native HTML in JS.

- The whole package is just `838 bytes`! minified, gzipped and has 0 dependencies
- Rendering 1000 test elements takes about `25ms` which is **_~21x faster than JSX_** (540ms) 🚀
- It's not wrapping or parsing anything, it's native _HTML_ in your _JavaScript_.
- Full Typescript support

# Example

Live demo: [Codepen.io demo](https://codepen.io/michaljach/project/editor/DYGzJV)

```
const info = 'This is awesome!';
const handler = () => {};

const Component = htsx`
  <section>
    <h1>HTS</h1>
    <span>Next level UI builder</span>
    ${info}
    <button class="btn" onclick=${handler}>Download (1.5kb)</button>
  </section>
`;

document.body.appendChild(Component);
```

# Usage

You can use HTSX everywhere you want.

- In node or browser:
  `import htsx from 'htsx';`
- In modern browser (without any build tool):
  `import htsx from './htsx.min.js';`
- Or via script tag:
  `<script src="htsx.min.js"></script>`

And start creating your UI with `htsx` template literal.

# API

### Elements

`htsx` is not _like_ HTML, **it is HTML**. You can use any tag you want with all html attributes.

```
const Component = htsx`
    <h1>Hello!</h1>
    <div class="box">I'm a box</div>
`;

document.body.appendChild(Component);
```

### Properties

You can simply render your properties just like this

```
const name = 'Mike';

const Component = htsx`
    <span>${name}</span>
`;

document.body.appendChild(Component);
```

Or pass props down:

```
const Component = (props) => htsx`
    <span>${props.name}</span>
`;

document.body.appendChild(Component({ name: 'Mike' }));
```

### Events

You can attach events to elements in the simplest way.

```
const handler = (event) => {

};

const Button = htsx`
    <button onclick=${handler}>Click me!</button>
`;
```

or with your parameters

```
const handler = (param, event) => {

};

const Button = htsx`
    <button onclick=${handler.bind(this, 'foo')}>Click me!</button>
`;
```

All native event types are supported: `onclick`, `onchange`, `onkeyup`, `onkeypress`.

### Nested elements

With `htsx` you can simply compose your elements:

```
const HelloElement = htsx`
    <span>Hey!</span>
`;

const Container = htsx`
    Hello!
    ${HelloElement}
`
```
