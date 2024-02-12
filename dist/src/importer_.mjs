// src/WTFCss/src/importer_.js
var importFunctions = (functionNames2) => {
  return functionNames2.map((name) => `import ${name} from './${name.toLowerCase()}';`).join("\n");
};
var functionNames = [
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
var imports = importFunctions(functionNames);
console.log(imports);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL1dURkNzcy9zcmMvaW1wb3J0ZXJfLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBpbXBvcnRGdW5jdGlvbnMgPSAoZnVuY3Rpb25OYW1lcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb25OYW1lcy5tYXAobmFtZSA9PiBgaW1wb3J0ICR7bmFtZX0gZnJvbSAnLi8ke25hbWUudG9Mb3dlckNhc2UoKX0nO2ApLmpvaW4oJ1xcbicpO1xufTtcblxuY29uc3QgZnVuY3Rpb25OYW1lcyA9IFtcbiAgXCJhYnNcIixcbiAgXCJhY29zXCIsXG4gIFwiYXNpblwiLFxuICBcImF0YW5cIixcbiAgXCJhdGFuMlwiLFxuICBcImF0dHJcIixcbiAgXCJjYWxjXCIsXG4gIFwiY2xhbXBcIixcbiAgXCJjb3NcIixcbiAgXCJjb3VudGVyXCIsXG4gIFwiY291bnRlcnNcIixcbiAgXCJjcm9zc2ZhZGVcIixcbiAgXCJlbGVtZW50XCIsXG4gIFwiZW52XCIsXG4gIFwiZXhwXCIsXG4gIFwiZml0Y29udGVudFwiLFxuICBcImh5cG90XCIsXG4gIFwibG9nXCIsXG4gIFwibWF4XCIsXG4gIFwibWluXCIsXG4gIFwibWlubWF4XCIsXG4gIFwibW9kXCIsXG4gIFwicGF0aFwiLFxuICBcInBvd1wiLFxuICBcInJheVwiLFxuICBcInJlbVwiLFxuICBcInJlcGVhdFwiLFxuICBcInJvdW5kXCIsXG4gIFwic2lnblwiLFxuICBcInNpblwiLFxuICBcInNxcnRcIixcbiAgXCJzeW1ib2xzXCIsXG4gIFwidGFuXCIsXG4gIFwidXJsXCIsXG4gIFwidmFyXCJcbl07XG5jb25zdCBpbXBvcnRzID0gaW1wb3J0RnVuY3Rpb25zKGZ1bmN0aW9uTmFtZXMpO1xuY29uc29sZS5sb2coaW1wb3J0cyk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLElBQU0sa0JBQWtCLENBQUNBLG1CQUFrQjtBQUN6QyxTQUFPQSxlQUFjLElBQUksVUFBUSxVQUFVLElBQUksWUFBWSxLQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJO0FBQzlGO0FBRUEsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU0sVUFBVSxnQkFBZ0IsYUFBYTtBQUM3QyxRQUFRLElBQUksT0FBTzsiLAogICJuYW1lcyI6IFsiZnVuY3Rpb25OYW1lcyJdCn0K