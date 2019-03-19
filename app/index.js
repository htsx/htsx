const attachEvents = (elements) => {
  const wrapper = elements[0].parentElement.tagName === 'BODY' ? document.createElement('div') : elements[0].parentElement;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[0];

    if (element.getAttribute) {
      const __onClickHandler__ = element.getAttribute('onClick');
      const __onChangeHandler__ = element.getAttribute('onChange');
      const __onKeyUpHandler__ = element.getAttribute('onKeyUp');
      const __onKeyPressHandler__ = element.getAttribute('onKeyPress');

      if (__onClickHandler__) {
        element.removeAttribute('onClick');
        element.addEventListener('click', () => eval(__onClickHandler__));
      }
      if (__onChangeHandler__) {
        element.removeAttribute('onChange');
        element.addEventListener('click', () => eval(__onChangeHandler__));
      }
      if (__onKeyUpHandler__) {
        element.removeAttribute('onKeyUp');
        element.addEventListener('keyup', () => eval(__onKeyUpHandler__));
      }
      if (__onKeyPressHandler__) {
        element.removeAttribute('onKeyPress');
        element.addEventListener('keypress', () => eval(__onKeyPressHandler__));
      }
    }

    if (element.childNodes.length) {
      attachEvents(element.childNodes);
    }

    wrapper.appendChild(element);
  }

  return wrapper;
}

const html = (strings, ...props) => {
  const built = strings.map((partial, i) => {
    return `${partial}${props[i] ? props[i] : ''}`;
  }).join('');
  const elements = new DOMParser().parseFromString(built, 'text/html').body.childNodes;

  return attachEvents(elements);
}

const handler = (msg) => {
  debugger;
}

const onChange = (event) => {
  document.getElementById('test').innerHTML = event.target.value;
}

const name = 'Andrzej';

const elem = html`
  <div>
    <h1 class="test">Morda ?</h1>
    siema
    <h1>${name}</h1>
    <button onclick="handler('${name}')">${name}</button>
    <input onKeyPress="onChange(event)">
    <div id="test"></div>
  </div>
`;

document.body.appendChild(elem);