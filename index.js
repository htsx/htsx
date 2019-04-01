let events = {};
let toAppend = {};

HTMLElement.prototype._addEventListener = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.addEventListener = function(event, handler){
  this._addEventListener(event, handler); 
  if(!this.listeners) { this.listeners = [] }
  this.listeners.push({ event, handler });
};

const createListener = (element, attribute, action) => {
  const handler = element.getAttribute(attribute);
  if (handler) {
    element.removeAttribute(attribute);
    element.addEventListener(action, (e) => events[handler].call(e.target, e));
  }
}

const appendNodes = (element) => {
  const id = element.getAttribute('data-append');

  if (id) {
    element.removeAttribute('data-append');
    if (Array.isArray(toAppend[id])) {
      toAppend[id].forEach(elem => {
        if (typeof elem === 'string') {
          element.append(elem);
        } else {
          element.appendChild(cloneNode(elem));
        }
      })
    } else {
      element.appendChild(toAppend[id]);
    }
    delete toAppend[id];
  }
}

const cloneNode = (node) => {
  const clone = node.cloneNode(false);
  if (node.listeners) {
    node.listeners.forEach(listener => {
      clone.addEventListener(listener.event, (e) => listener.handler.call(e.target, e));
    })
  }

  if (node.childNodes.length) {
    Array.from(node.childNodes).forEach(elem => {
      clone.appendChild(cloneNode(elem));
    })
  }
  return clone;
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
    let id = Date.now() + i;
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