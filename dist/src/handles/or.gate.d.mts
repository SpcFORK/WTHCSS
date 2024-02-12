import { calc } from '../functions/calc.mjs';

const orGate = (a, b) => {
  const AoverB = (a, b) => calc(`min(1, max(${a} - ${b}, 0))`);
  const BoverA = (a, b) => calc(`(1 - ${AoverB(a, b)})`);

  return [
    `${BoverA(b, a)} * ${a} + ${AoverB(a, b)} * ${b}`, // True if either a or b is true
    `${AoverB(a, b)} * ${a} + ${BoverA(b, a)} * ${b}`  // True if both a and b are true
  ];
};

export { orGate as default };
