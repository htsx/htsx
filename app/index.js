import { hts } from './html.js';

console.time("factorial test");
function handler(...props) {
  console.log(props);
}

const name = 'Andrzej';

const HomePage = hts`
  <h1>test</h1>
  <button onclick=${handler}>Dwa</button>
`;

const elem = hts`
  <div>
    ${name}
    ${HomePage}
    <button onclick=${handler}>${name}</button>
    <input onkeypress=${handler}>
  </div>
`;

document.body.appendChild(elem);
console.timeEnd("factorial test");