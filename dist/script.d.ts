function wtfTest(e) {
  console.log(WTFCSS.stylesheet.handles);
  let { orGate } = WTFCSS.stylesheet.handles;
  console.log(orGate(1, 0));
}

window.addEventListener(
  'wtfcss:loaded', 
  wtfTest
);
