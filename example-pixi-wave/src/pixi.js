// Initialize the PIXI app.
let pixi = initPIXI();

// An array that will contain our ripples.
const ripples = [];

// --- PIXI App

function initPIXI() {
  const pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  pixi.ticker.add(updatePIXI);

  document.body.appendChild(pixi.view);

  return pixi;
}

function updatePIXI() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    ripple.update();
    // Remove ripple if it's too big.
    if (ripple.sprite.scale.x > 4) {
      ripples.splice(i, 1);
      pixi.stage.removeChild(ripple.sprite);
      pixi.stage.filters.splice(pixi.stage.filters.indexOf(ripple.filter), 1);
    }
  }
}

// --- Ripples

function addRipple(x, y) {
  const ripple = new Ripple(x, y);
  ripples.push(ripple);
  pixi.stage.addChild(ripple.sprite);
  if (!pixi.stage.filters) {
    pixi.stage.filters = [ripple.filter];
  } else {
    pixi.stage.filters.push(ripple.filter);
  }
}
