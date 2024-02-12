import { calc, max } from '../functions/index.js';

// --ReLU: calc(max(0, var(--output)) + var(--outputBias));
const relu = (output, outputBias) => calc(`${max(0, output)} + ${outputBias}`);

// --output1c: max(
//   calc(1 - (
//     (--output1b - --maxOut) 
//     * (var(--output1b) 
//     - var(--maxOut)) 
//     * 1000000000)
//   ), 
// 0);
const clenseOutput = (output1b, maxOut) => max(
  calc(
    `1 - (` +
    `(${output1b} - maxOut)` +
    `* (${output1b}` +
    `- ${maxOut})` +
    `* 1000000000)` +
    `)`
  ), 0);