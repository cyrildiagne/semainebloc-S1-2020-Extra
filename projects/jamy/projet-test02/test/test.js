// Create a new texture
const texture = PIXI.Texture.from("test.jpg");
const sprite = new PIXI.Sprite(texture);
pixi.stage.addChild(sprite);

document.addEventListener("click", onClick);

function onClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  addRipple(x, y);
}


// ------ CIRCLE ------

const radius = 100;
const blurSize = 32;
const circle = new PIXI.Graphics()
  .beginFill(0xff0000)
  .drawCircle(radius + blurSize, radius + blurSize, radius)
  .endFill();

  circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

pixi.stage.addChild(circle);

document.addEventListener("mousemove", onMouseMove);

function onMouseMove(evt) {
  circle.position.x = evt.clientX - (radius + blurSize);
  circle.position.y = evt.clientY - (radius + blurSize);
}

// ----- COLOR FILTER -----

const colorFilter = new PIXI.filters.ColorMatrixFilter();
pixi.stage.filters = [colorFilter];

let count = 0;

pixi.ticker.add((delta) => {
    count += 0.1;

    const { matrix } = colorFilter;
    matrix[1] = Math.sin(count) * 3;
    matrix[2] = Math.cos(count);
    matrix[3] = Math.cos(count) * 1.5;
    matrix[4] = Math.sin(count / 3) * 2;
    matrix[5] = Math.sin(count / 2);
    matrix[6] = Math.sin(count / 4);
});