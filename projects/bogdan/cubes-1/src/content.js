let camera, scene, renderer;
const color5 = new THREE.Color("skyblue");

function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(500, 350, 750);

  var containerPlaces = document.querySelectorAll("img");
  let numberOfImages = 0;
  let imagesInPage = [];
  containerPlaces.forEach(function (item, index) {
    numberOfImages++;
    imagesInPage.push(item);
  });

  for (let i = 0; i < 10; i++) {
    // console.log(imagesInPage[i]);
    // if (imagesInPage[i].id != null) console.log(imagesInPage[i].id);
    // console.log(imagesInPage[i].width);

    try {
      var container = document.getElementById(imagesInPage[i].id);

      // console.log(imagesInPage[i]);
      // renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(imagesInPage[i].width, imagesInPage[i].height);
      renderer.setClearColor(0x50ff00, 1);

      // console.log(renderer);
      // renderer.domElement.style.position = "absolute";
      // renderer.domElement.style.top = 0;

      // containerPlace.appendChild(renderer.domElement)

      // console.log(imagesInPage[i].img);
      // .appendChild(renderer.domElement);

      // document.imagesInPage[i].appendChild(renderer.domElement);
      //   container.appendChild(renderer.domElement);

      //   console.log("this is the container", "\n", container);
      //   console.log("this is the renderer", "\n", renderer);

      if (container) container.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    } catch (e) {
      console.log("there is an error:", "\n", e);
    }
  }
}

init();
animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
