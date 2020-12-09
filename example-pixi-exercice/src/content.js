const circle = new PIXI.Graphics()
  .beginFill(0xff00ff)
  .drawCircle(0, 0, 30)
  .endFill();

pixi.stage.addChild(circle);

document.addEventListener('mousemove', (evt) => {
  circle.position.x = evt.clientX;
  circle.position.y = evt.clientY;
});

document.addEventListener('click', (evt) => {
  // const colors = [0xff0000, 0x00ff00, 0x0000ff]
  // const i = Math.floor(Math.random() * colors.length)
  // const randomColor = colors[i]

  // const r = Math.floor(Math.random() * 255)
  // const g = Math.floor(Math.random() * 255)
  // const b = Math.floor(Math.random() * 255)
  // const randomColor = PIXI.utils.rgb2hex([r, g, b])

  // const randomColor = Math.floor(Math.random() * 0xffffff);

  // const randomColor = Math.floor(Math.random() * Math.pow(2, 24));

  circle
    .clear()
    .beginFill(randomColor)
    .drawCircle(0, 0, Math.random() * 30 + 10)
    .endFill();
});
