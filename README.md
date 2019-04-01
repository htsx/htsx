# **HTS**
##### Build UI's with native HTML in JS.
- The whole package is just `932 bytes`! minified, gzipped and has 0 dependencies
- Rendering 1000 test elements takes about `25ms` which is ***~21x faster than JSX*** (540ms) 🚀
- It's not wrapping or parsing anything, it's native *HTML* in your *JavaScript*.

# Example

Live demo: [Codepen.io demo](https://codepen.io/michaljach/project/editor/DYGzJV)

```
const info = 'This is awesome!';
const handler = () => {};

const elem = hts`
  <section>
    <h1>HTS</h1>
    <span>Next level UI builder</span>
    ${info}
    <button class="btn" onclick=${handler}>Download (1.5kb)</button>
  </section>
`;

document.body.appendChild(elem);
```

# Usage
You can use HTS everywhere you want.
- In node or browser:
    ```import { hts } from 'hts';```
- In modern browser (without any build tool):
    ```import { hts } from './hts.min.js';```

And start creating your UI with `hts` template literal.

# API
### Elements
`hts` is not *like* HTML, **it is HTML**. You can use any tag you want with all html properties.
```
const elem = hts`
    <h1>Hello!</h1>
    <div class="box">I'm a box</div>
`;
```

### Properties
You can simply render your properties just like this
```
const name = 'Mike';

const elem = hts`
    <span>${name}</span>
`;
```

### Events
You can attach events to elements in the simplest way.
```
const handler = (event) => {
    
};

const button = hts`
    <button onclick={handler}>Click me!</button>
`;
```
or with your parameters
```
const handler = (param, event) => {
    
};

const button = hts`
    <button onclick={handler.bind(this, 'foo')}>Click me!</button>
`;
```
All native event types are supported: `onclick`, `onchange`, `onkeyup`, `onkeypress`.

### Nested elements
With `hts` you can simply compose your elements:
```
const HelloElement = hts`
    <span>Hey!</span>
`;

const elem = hts`
    Hello!
    ${HelloElement}
`
```