import './style.css';
import Grid from './components/Grid';
import Cell from './components/Cell';

customElements.define('grid-component', Grid);
customElements.define('cell-component', Cell);

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const rows = 100;
const cols = 100;
const interval = 1000;

const cellList = Array.from(
  { length: rows * cols },
  (_, i) => getRandomInt(10) % 8 === 0,
);

async function init() {
  if (!navigator.gpu) {
    throw Error('WebGPU not supported.');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  console.log(device);
}

init();

/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <grid-component iterval="${interval}" rows="${rows}" cols="${cols}" cells="${cellList}"></grid-component>
  </div>
`;
*/
