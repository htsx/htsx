import { html } from './html.js';

function handler(...props) {
  console.log(props);
}

const name = 'Andrzej';

const elem1 = html`
  <h1>test</h1>
  <button>Dwa</button>
`;

const elem = html`
  <div>
    ${name}
    ${elem1}
    <button onclick=${handler}>Siema</button>
    <input onkeypress=${handler}>
  </div>
`;

document.body.appendChild(elem);