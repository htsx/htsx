import hts from '../src/index.esm';

test('renders text correctly', () => {
  expect(hts`test`.innerHTML).toEqual('test');
});

test('renders property correctly', () => {
  const name = 'Me';
  expect(hts`${name}`.innerHTML).toEqual('Me');
});

test('fires button event correctly', () => {
  const handler = jest.fn();
  const elem = hts`<button onclick=${handler}>Button</button>`;
  elem.firstElementChild.click();
  expect(elem.firstElementChild.listeners.length).toEqual(1);
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(new MouseEvent({}));
});

test('fires button event correctly with params', () => {
  const handler = jest.fn();
  const elem = hts`<button onclick=${handler.bind(this, 'foo')}>Button</button>`;
  elem.firstElementChild.click();
  expect(elem.firstElementChild.listeners.length).toEqual(1);
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith('foo', new MouseEvent({}));
});

test('fires input multiple event correctly with params', () => {
  const handler = jest.fn();
  const elem = hts`<input onkeypress=${handler.bind(this, 'press')} onkeyup=${handler.bind(this, 'up')}>`;
  const keyboardEvent = document.createEvent('KeyboardEvent');
  const keyboardEvent2 = document.createEvent('KeyboardEvent');
  const initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

  keyboardEvent[initMethod](
    'keypress',
    true,
    true,
    window,
    false,
    false,
    false,
    false,
    40,
    0,
  );
  elem.firstElementChild.dispatchEvent(keyboardEvent);

  keyboardEvent2[initMethod](
    'keyup',
    true,
    true,
    window,
    false,
    false,
    false,
    false,
    40,
    0,
  );
  elem.firstElementChild.dispatchEvent(keyboardEvent2);

  expect(elem.firstElementChild.listeners.length).toEqual(2);
  expect(handler).toHaveBeenCalledTimes(2);
  expect(handler).toHaveBeenCalledWith('press', new KeyboardEvent({}));
  expect(handler).toHaveBeenCalledWith('up', new KeyboardEvent({}));
});

test('renders nested element correctly', () => {
  const elem = hts`elem`;
  expect(hts`${elem}`.innerHTML).toEqual('<div><div>elem</div></div>');
});

test('renders array correctly', () => {
  const data = ['foo', 'bar'];
  expect(hts`${data}`.innerHTML).toEqual('<div>foobar</div>');
});

test('renders loop of elements correctly', () => {
  const elem = hts`elem`;
  expect(hts`${[1, 2].map(() => elem)}`.innerHTML).toEqual('<div><div>elem</div><div>elem</div></div>');
});

test('renders loop of elements with events correctly', () => {
  const handler = jest.fn();
  const elem = hts`<button onclick=${handler}>Button</button>`;
  elem.firstElementChild.click();
  expect(hts`${[1, 2].map(() => elem)}`.innerHTML).toEqual('<div><div><button>Button</button></div><div><button>Button</button></div></div>');
  expect(handler).toHaveBeenCalledTimes(1);
});
