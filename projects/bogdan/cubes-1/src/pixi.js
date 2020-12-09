let pixi = initPIXI();

function initPIXI() {
  const pixi = new PIXI.Application({
    resizeTo: window,
    // antialias: true,
    resolution: 2,
    transparent: true
  });

  pixi.view.classList.add('pixi');
  document.body.appendChild(pixi.view);

  return pixi;
}
