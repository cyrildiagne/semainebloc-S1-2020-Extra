// Initialize the PIXI app.
let pixi = initPIXI();


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
  
}


