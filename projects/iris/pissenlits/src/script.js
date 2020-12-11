//ajout array avec toutes mes urls
const PLAYERS = [];
const ANIMATION_PATHS = [
  "res/pissenlits.json",
  "res/pissenlits-blue.json",
  "res/little-fish.json",
  "res/cloud-2.json",
  "res/plante-flaque.json",
  //"res/algaes.json",
];
//
const width = 500;
const height = 500;

const MAX_N_PLAYERS = 5;
let P = new p5();

// console.log();

function addVisual(x, y) {

  if(MAX_N_PLAYERS <= PLAYERS.length)
    return;

  let animationPath = P.random(ANIMATION_PATHS);
  let player = new Visual(animationPath, x, y);

  PLAYERS.push(player);
}

function moveVisual(x, y) {
  let v = createVector(x - mouseX, y - mouseY);
  let speed = map(v.mag(), 0, 200, 5, 0);
  v.setMag(speed);
}
setInterval(() => {
  addVisual(P.random(window.innerWidth), P.random(window.innerHeight));
}, 1000);

update();

function update() {
  for (let player of PLAYERS) {
    player.avoid(P.winMouseX, P.winMouseY);
  }

  requestAnimationFrame(update);
}
