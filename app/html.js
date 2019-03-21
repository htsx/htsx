const events = [];

const attachEvents = (elements) => {
  const wrapper = elements[0].parentElement.tagName === 'BODY' ? document.createElement('div') : elements[0].parentElement;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[0];

    if (element.getAttribute) {
      const __onClickHandler__ = element.getAttribute('onClick');
      const __onKeyPressHandler__ = element.getAttribute('onKeyPress');

      if (__onClickHandler__) {
        element.removeAttribute('onClick');
        element.addEventListener('click', (e) => events[__onClickHandler__].bind(element)(e, element));
      }

      if (__onKeyPressHandler__) {
        element.removeAttribute('onKeyPress');
        element.addEventListener('keypress', (e) => events[__onKeyPressHandler__].bind(element)(e, element));
      }
    }

    if (element.childNodes.length) {
      attachEvents(element.childNodes);
    }

    wrapper.appendChild(element);
  }

  return wrapper;
}

export const html = (strings, ...props) => {
  const built = strings.map((partial, i) => {
    if (typeof props[i] === 'function') {
      events[i] = props[i];
      return `${partial}${i}`;
    }
    return `${partial}${props[i] || ''}`;
  }).join('');
  const elements = new DOMParser().parseFromString(built, 'text/html').body.childNodes;
  return attachEvents(elements);
}