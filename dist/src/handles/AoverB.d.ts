import { max } from '../functions/max.js';
import { min } from '../functions/min.js';

// import helpers from '../helpers/index.js';

const AoverB = (a, b) => min(1, max(`a - b`, 0));
const BoverA = (a, b) => `(1 - ${AoverB()})`;

export { AoverB, BoverA };
