import { Button } from '../components/button.js';

const html = (strings, ...props) => {
  const element = document.createElement('div');
  strings.map((string, i) => {
    element.appendChild(document.createRange().createContextualFragment(string));
    if (props[i] && props[i].element) {
      element.appendChild(props[i].element);
    } else if (typeof props[i] === 'function') {
      const instance = new props[i]();
      element.appendChild(instance.render());
    } else if (props[i]) {
      element.appendChild(document.createRange().createContextualFragment(props[i]));
    }
  });

  return element;
}

class Siema {
  constructor() {
    this.dupa = 'dupa';
  }

  handler = () => {
    console.log(this);
  }

  render() {
    return html`lolada ${Button('Click 2!', this.handler)}`;
  }
}

export default class Index {
  constructor() {
    this.name = 'yaszko';
  }

  handler = () => {
    console.log(this);
  }

  render() {
    return html`
      <h1 class="test">Morda ?</h1>
      ${Button('Click!', this.handler)} 
      ${this.name}
      ${this.name}
      ${Siema}
      siema
      <h1>2</h1>
    `;
  }
};
