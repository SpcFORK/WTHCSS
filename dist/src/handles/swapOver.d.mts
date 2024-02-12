import { calc } from '../functions/calc.mjs';

const swapOver = (a, b) => (Aover, Bover) => [
  calc(
    `${Bover} * ${a} + ${Aover} * ${b});`
  ),
  calc(
    `${Aover} * ${a} + ${Bover} * ${b});`
  )
];

export { swapOver };
