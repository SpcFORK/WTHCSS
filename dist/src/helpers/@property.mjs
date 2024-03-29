// src/WTFCss/src/helpers/@property.js
var registerProperty = (name, syntax, inherits, initialValue) => {
  return {
    [`@property ${name}`]: "{ " + !syntax + !inherits + !initialValue + " }"
  };
};
var property_default = registerProperty;
export {
  property_default as default,
  registerProperty
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AcHJvcGVydHkuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogUmVnaXN0ZXJzIGEgY3VzdG9tIENTUyBwcm9wZXJ0eSB1c2luZyB0aGUgQHByb3BlcnR5IHJ1bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjdXN0b20gcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ludGF4IC0gRGVzY3JpYmVzIHRoZSBhbGxvd2FibGUgc3ludGF4IGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRzIC0gQ29udHJvbHMgd2hldGhlciB0aGUgY3VzdG9tIHByb3BlcnR5IGluaGVyaXRzIGJ5IGRlZmF1bHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5pdGlhbFZhbHVlIC0gU2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIGZvcm1hdHRlZCBAcHJvcGVydHkgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUHJvcGVydHkgPSAobmFtZSwgc3ludGF4LCBpbmhlcml0cywgaW5pdGlhbFZhbHVlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgW2BAcHJvcGVydHkgJHtuYW1lfWBdOiAoXG4gICAgICBcInsgXCIgK1xuICAgICAgKCFzeW50YXggPz8gYHN5bnRheDogXCIke3N5bnRheH1cIjsgYCkgK1xuICAgICAgKCFpbmhlcml0cyA/PyBgaW5oZXJpdHM6ICR7aW5oZXJpdHN9OyBgKSArXG4gICAgICAoIWluaXRpYWxWYWx1ZSA/PyBgaW5pdGlhbC12YWx1ZTogJHtpbml0aWFsVmFsdWV9O2ApICtcbiAgICAgIFwiIH1cIlxuICAgIClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJQcm9wZXJ0eSJdLAogICJtYXBwaW5ncyI6ICI7QUFRTyxJQUFNLG1CQUFtQixDQUFDLE1BQU0sUUFBUSxVQUFVLGlCQUFpQjtBQUN4RSxTQUFPO0FBQUEsSUFDTCxDQUFDLGFBQWEsSUFBSSxFQUFFLEdBQ2xCLE9BQ0MsQ0FBQyxTQUNELENBQUMsV0FDRCxDQUFDLGVBQ0Y7QUFBQSxFQUVKO0FBQ0Y7QUFDQSxJQUFPLG1CQUFROyIsCiAgIm5hbWVzIjogW10KfQo=