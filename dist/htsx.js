(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.htsx=f());}(this,function(){'use strict';const events = {};
const toAppend = {};

HTMLElement.prototype.addEventListenerProxy = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.addEventListener = function listener(event, handler) {
  this.addEventListenerProxy(event, handler);
  if (!this.listeners) { this.listeners = []; }
  this.listeners.push({ event, handler });
};

const createListener = (element, attribute, action) => {
  const handler = element.getAttribute(attribute);
  if (handler) {
    element.removeAttribute(attribute);
    element.addEventListener(action, e => events[handler].call(e.target, e));
  }
};

const cloneNode = (node) => {
  const clone = node.cloneNode(false);
  if (node.listeners) {
    node.listeners.forEach((listener) => {
      clone.addEventListener(listener.event, e => listener.handler.call(e.target, e));
    });
  }

  if (node.childNodes.length) {
    Array.from(node.childNodes).forEach(elem => clone.appendChild(cloneNode(elem)));
  }
  return clone;
};

const appendNodes = (element) => {
  const id = element.getAttribute('data-append');

  if (id) {
    element.removeAttribute('data-append');
    if (Array.isArray(toAppend[id])) {
      toAppend[id].forEach((elem) => {
        if (typeof elem === 'string') {
          element.append(elem);
        } else {
          element.appendChild(cloneNode(elem));
        }
      });
    } else {
      element.appendChild(toAppend[id]);
    }
    delete toAppend[id];
  }
};

const attachEvents = (nodes) => {
  const wrapper = nodes[0].parentElement.tagName === 'BODY' ? document.createElement('div') : nodes[0].parentElement;

  Array.from(nodes).forEach((element) => {
    if (element.getAttribute) {
      createListener(element, 'onClick', 'click');
      createListener(element, 'onKeyPress', 'keypress');
      createListener(element, 'onKeyUp', 'keyup');
      createListener(element, 'onChange', 'onchange');
      createListener(element, 'onMouseOver', 'onmouseover');
      createListener(element, 'onMouseOut', 'onmouseout');
      appendNodes(element);
    }

    if (element.childNodes.length) {
      attachEvents(element.childNodes);
    }

    wrapper.appendChild(element);
  });

  return wrapper;
};

var index = (strings, ...props) => {
  const string = strings.map((partial, i) => {
    const id = Date.now() + i;
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
};return index;}));