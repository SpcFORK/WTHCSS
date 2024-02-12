const importFunctions = (functionNames) => {
  return functionNames.map(name => `import ${name} from './${name.toLowerCase()}';`).join('\n');
};

const functionNames = [
  "abs",
  "acos",
  "asin",
  "atan",
  "atan2",
  "attr",
  "calc",
  "clamp",
  "cos",
  "counter",
  "counters",
  "crossfade",
  "element",
  "env",
  "exp",
  "fitcontent",
  "hypot",
  "log",
  "max",
  "min",
  "minmax",
  "mod",
  "path",
  "pow",
  "ray",
  "rem",
  "repeat",
  "round",
  "sign",
  "sin",
  "sqrt",
  "symbols",
  "tan",
  "url",
  "var"
];
const imports = importFunctions(functionNames);
console.log(imports);