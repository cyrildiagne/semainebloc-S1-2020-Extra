let CUBE_SCENES = [];


function init() {
  let elems = document.body.querySelectorAll('img');

  for (let i = 0; i < 10; i++) {
    let elem = elems[i];
    let cubeScene = new CubeScene(elem);
    CUBE_SCENES.push(cubeScene);
  }

  // document.body.querySelectorAll('img').forEach(img => {
  //   let cubeScene = new CubeScene(img, img.parentElement);
  //   CUBE_SCENES.push(cubeScene);
  // });

  animate();
}

init();

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

function animate() {

  for (let cubeScene of CUBE_SCENES) {
    cubeScene.update();
  }

  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
}
