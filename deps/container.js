HTMLElement.prototype.props = {};

const Container = function(hooks) {
  hooks.init();
  const el = document.createElement('div');
  el.props = hooks.props;
  el.innerHTML = hooks.template.replace(/{test}/gi, el.props.test);
  return el;
};

export default Container;