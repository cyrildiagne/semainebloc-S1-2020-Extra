let camera, scene, renderer;

let w = window.innerWidth;
let h = window.innerHeight;
//SCREEN_HEIGHT
var s_h = document.documentElement.scrollHeight;

const spheres = [];

let mouseX = 0;
let mouseY = 0;

let testTexture =
  "data:image/png;base64,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";
let result;

const API = "https://pixabay.com/api/";
const API_KEY = "8609708-a661654ee4e5cad9c12571d32";

let texture1;
let textureTransferLink;
let searchWord;

async function texturer() {
  searchWord = "cake";
  try {
    const url = API + "?key=" + API_KEY + "&q=" + searchWord;
    const resp = await fetch(url).then((r) => r.json());
    textureTransferLink = resp.hits[0].webformatURL;

    function toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    }

    toDataURL(textureTransferLink, function (dataUrl) {
      // console.log("RESULT:", dataUrl);
    });
  } catch (e) {
    console.log(e);
  }
}

function init() {
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
  let image = new Image();
  image.src = testTexture;

  let texture = new THREE.Texture();
  texture.image = image;
  image.onload = function () {
    texture.needsUpdate = true;
  };
  const material = new THREE.MeshLambertMaterial({ map: texture });

  //LIGHTS
  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.SphereBufferGeometry(
      .1,
      32,
      16
    );

    const sphere = new THREE.Mesh(geometry, material); // Add to scene
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
  renderer.render(scene, camera);
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
  }
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
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
texturer();
