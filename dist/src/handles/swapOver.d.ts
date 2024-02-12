import { calc } from '../functions/calc.js';

const swapOver = (a, b) => (Aover, Bover) => [
  calc(
    `${Bover} * ${a} + ${Aover} * ${b});`
  ),
  calc(
    `${Aover} * ${a} + ${Bover} * ${b});`
  )
];

export { swapOver };
