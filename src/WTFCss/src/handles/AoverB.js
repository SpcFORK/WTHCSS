import { min, max } from '../functions/index.js';
// import helpers from '../helpers/index.js';

const AoverB = (a, b) => min(1, max(`a - b`, 0))
const BoverA = (a, b) => `(1 - ${AoverB(a, b)})`

export {
  AoverB,
  BoverA,
}