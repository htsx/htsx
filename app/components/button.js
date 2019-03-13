const fn = (title, handler) => {
  const element = document.createElement('button');
  element.innerHTML = title;
  element.addEventListener('click', handler);

  return {
    type: 'button',
    handler,
    element,
  };
}

export const Button = fn;