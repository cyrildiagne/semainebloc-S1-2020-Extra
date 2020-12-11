//@author Omar Shehata. 2015.
//We are loading the Three.js library from the cdn here: https://cdnjs.com/libraries/three.js/

var scene;
var camera;
var renderer;

function scene_setup() {
  //This is all code needed to set up a basic ThreeJS scene

  //First we initialize the scene and our camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //We create the WebGL renderer and add it to the document
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

scene_setup();

//Add your code here!
var geometry = new THREE.BoxGeometry(1, 1, 1);

const loader = new THREE.TextureLoader();
const texture = new THREE.TextureLoader().load( "../mip.png" );

const material = new THREE.MeshBasicMaterial({
  map: loader.load("../mip.png"),
});
var cube = new THREE.Mesh(geometry, material);
//Add it to the screen
scene.add(cube);
cube.position.z = -3; //Shift the cube back so we can see it

//Render everything!
function render() {
  cube.rotation.y += 0.01;

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
