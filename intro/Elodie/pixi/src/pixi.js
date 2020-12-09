let pixi = initPIXI();

function initPIXI() {
  const pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true
  });

  pixi.view.classList.add('pixi');
  document.body.appendChild(pixi.view);

  return pixi;
}
