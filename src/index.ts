export type Prop = string | number | EventListenerOrEventListenerObject | HTMLElement;

interface Events {
  [key: string]: EventListener;
}

interface Components {
  [key: string]: HTMLElement;
}

function attachEvents(nodes: NodeList, events: Events, components: Components): void {
  const eventTypes = ['click', 'keypress', 'keyup', 'change', 'mouseover', 'mouseout'];
  nodes.forEach(node => {
    if (node instanceof HTMLElement) {
      eventTypes.forEach(eventName => {
        const eventId = node.getAttribute(`on${eventName}`);
        node.removeAttribute(`on${eventName}`);
        node.addEventListener(eventName, events[eventId]);
      });

      const placeholderId = node.getAttribute('data-placeholder');
      if (placeholderId) {
        const component = components[placeholderId];
        node.parentElement.replaceChild(component, node);
      }
    }

    if (node.childNodes) {
      attachEvents(node.childNodes, events, components);
    }
  });
}

function parseTemplate(template: TemplateStringsArray, props: Prop[]): NodeList {
  const events: Events = {};
  const components: Components = {};
  const string = template
    .map((partial, i) => {
      const id = Date.now() + i;
      const prop = props[i];

      if (prop instanceof Function) {
        events[id] = prop;
        return `${partial}${id}`;
      }

      if (prop instanceof HTMLElement) {
        components[id] = prop;
        return `${partial}<div data-placeholder="${id}"></div>`;
      }

      return `${partial}${prop || ''}`;
    })
    .join('');

  const nodes = new DOMParser().parseFromString(string, 'text/html').body.childNodes;
  attachEvents(nodes, events, components);

  return nodes;
}

function render(template: TemplateStringsArray, ...props: Prop[]): HTMLElement {
  const nodes = parseTemplate(template, props);
  const wrapper = document.createElement('div');

  nodes.forEach(node => wrapper.appendChild(node));

  return wrapper;
}

export default render;
