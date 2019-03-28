import { hts } from './html.js';

const handler = (...props) => {
  console.log(props)
}

const code = hts`
  <blockquote>
    This is awesome!
  </blockquote>
`;

const elem = hts`
  <section>
    <h1>HTML in JS</h1>
    <span>Next level UI builder</span>
    ${code}
    <button class="btn" onClick=${handler}>Download (1.5kb)</button>
  </section>
`;

document.body.appendChild(elem);