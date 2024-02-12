import { calc } from '../functions/index.js';

export const swapOver = (a, b) => (Aover, Bover) => [
  calc(
    `${Bover} * ${a} + ${Aover} * ${b});`
  ),
  calc(
    `${Aover} * ${a} + ${Bover} * ${b});`
  )
]