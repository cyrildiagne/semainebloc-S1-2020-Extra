// // Inner radius of the circle
// const radius = 100;

// // The blur amount
// const blurSize = 32;

// // Add blurred circle
// const circle = new PIXI.Graphics()
//   .beginFill(0xff0000)
//   .drawCircle(radius + blurSize, radius + blurSize, radius)
//   .endFill();
// circle.filters = [new PIXI.filters.BlurFilter(blurSize)];
// pixi.stage.addChild(circle);

// // Listen mouse move events.
// function onMouseMove(evt) {
//   circle.position.x = evt.clientX - (radius + blurSize);
//   circle.position.y = evt.clientY - (radius + blurSize);
// }
// document.addEventListener("mousemove", onMouseMove);