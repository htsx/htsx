let events = {};
let toAppend = {};

const createListener = (element, attribute, action) => {
  const handler = element.getAttribute(attribute);
  if (handler) {
    element.removeAttribute(attribute);
    element.addEventListener(action, (e) => events[handler].bind(element)(e, element));
  }
}

const appendNodes = (element) => {
  const id = element.getAttribute('data-append');

  if (id) {
    element.removeAttribute('data-append');
    element.appendChild(toAppend[id]);
    delete toAppend[id];
  }
}

const attachEvents = (nodes) => {
  const wrapper = nodes[0].parentElement.tagName === 'BODY' ? document.createElement('div') : nodes[0].parentElement;

  Array.from(nodes).forEach((element) => {
    if (element.getAttribute) {
      createListener(element, 'onClick', 'click');
      createListener(element, 'onKeyPress', 'keypress');
      appendNodes(element);
    }

    if (element.childNodes.length) {
      attachEvents(element.childNodes);
    }

    wrapper.appendChild(element);
  });

  return wrapper;
}

export const hts = (strings, ...props) => {
  const string = strings.map((partial, i) => {
    const id = Date.now();
    switch (typeof props[i]) {
      case 'function':
        events[id] = props[i];
        return `${partial}${id}`;
      case 'object':
        toAppend[id] = props[i];
        return `${partial}<div data-append="${id}"></div>`;
      default:
        return `${partial}${props[i] || ''}`;
    }
  }).join('');
  
  const nodes = new DOMParser().parseFromString(string, 'text/html').body.childNodes;
  return attachEvents(nodes);
}