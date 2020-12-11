let camera, scene, raycaster, renderer;

let w = window.innerWidth;
let h = window.innerHeight;
//SCREEN_HEIGHT
var s_h = document.documentElement.scrollHeight;

let INTERSECTED;

const spheres = [];

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const mouse = new THREE.Vector2();
const radius = 100;

const API = "https://pixabay.com/api/";
const API_KEY = "8609708-a661654ee4e5cad9c12571d32";

let textureTransferLink;
let searchWord = "bread";

const numberOfSpheres = 10;
const sphereSize = 0.5;

document.addEventListener("mousemove", onDocumentMouseMove, false);

init();
animate();

async function getImages(searchWord) {
  const url = API + "?key=" + API_KEY + "&q=" + searchWord;
  const resp = await fetch(url).then((r) => r.json());
  urls = resp.hits.map((x) => x.webformatURL);
  return urls;
}

async function init() {
  //SCENE
  scene = new THREE.Scene();

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  //RENDERER
  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, s_h);

  let container = document.createElement("div");
  container.style.position = "absolute";
  container.style.height = "100%";
  container.style.width = "100%";
  container.style.zIndex = "10000";
  container.style.pointerEvents = "none";

  container.appendChild(renderer.domElement);
  document.body.insertBefore(container, document.body.firstChild);

  //MATERIAL / TEXTURE
  const images = await getImages(searchWord);
  const materials = images.map((imageURL) => {
    const texture = new THREE.TextureLoader().load(imageURL);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    return material;
  });

  //LIGHTS
  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  //GENERATE SPHERES
  for (let i = 0; i < numberOfSpheres; i++) {
    const geometry = new THREE.SphereBufferGeometry(sphereSize, 32, 16);

    const randomMaterial =
      materials[Math.floor(Math.random() * materials.length)];

    const sphere = new THREE.Mesh(geometry, randomMaterial);
    sphere.position.x = Math.random() * 10 - 5;
    sphere.position.y = Math.random() * 10 - 5;
    sphere.position.z = Math.random() * 10 - 5;
    sphere.scale.x = sphere.scale.y = sphere.scale.z = Math.random() * 3 + 1;

    scene.add(sphere);
    spheres.push(sphere);
  }
  camera.position.z = 10;

  window.addEventListener("resize", onWindowResize, false);
}

//ANIMATE
function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  const timer = 0.0001 * Date.now();

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (let i = 0, il = spheres.length; i < il; i++) {
    const sphere = spheres[i];

    sphere.position.x = 5 * Math.cos(timer + i);
    sphere.position.y = 5 * Math.sin(timer + i * 1.1);
    sphere.rotation.y += 0.01;

    //RAYCASTER
    /*raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);

    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].sphere) {
        if (INTERSECTED) console.log("it intersects!");
        // INTERSECTED.materials.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = intersects[0].sphere;
        // INTERSECTED.currentHex = INTERSECTED.materials.emissive.getHex();
        // INTERSECTED.materials.emissive.setHex(0xff0000);
        console.log("it intersects!");
      }
    } else {
      if (INTERSECTED)
        // INTERSECTED.materials.emissive.setHex(INTERSECTED.currentHex);
        console.log("stopped intersect");

      INTERSECTED = null;
    }
    */
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  // Camera frustum aspect ratio
  camera.aspect = w / h;
  // After making changes to aspect
  camera.updateProjectionMatrix();
  // Reset size
  renderer.setSize(
    document.documentElement.scrollHeight,
    document.body.offsetWidth
  );
  renderer.setSize(w, s_h);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
}
