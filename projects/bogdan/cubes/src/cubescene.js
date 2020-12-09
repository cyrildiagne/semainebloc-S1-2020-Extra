class CubeScene {
  constructor(elem) {
    // this.renderer, this.camera, this.scene;

    this.elem = elem;

    this.init();
  }

  async init() {
    let r, c, s, container;
    let elem = this.elem;
    let { height, width } = elem; // destructuring

    // ADD INTERMEDIATE CONTAINER
    container = document.createElement("div");
    elem.parentElement.appendChild(container);
    container.appendChild(elem);

    // RENDERER

    r = new THREE.WebGLRenderer();

    r.setSize(width, height);
    r.setClearColor(0x50ff00, 1);

    let rDom = r.domElement;
    rDom.classList.add("cube-scene");

    container.appendChild(rDom);

    rDom.style.left = elem.offsetLeft + "px";
    rDom.style.top = elem.offsetTop + "px";
    rDom.style.width = elem.offsetWidth + "px";
    rDom.style.height = elem.offsetHeight + "px";

    // CAMERA

    c = new THREE.PerspectiveCamera(
      50,
      rDom.offsetWidth / rDom.offsetHeight,
      1,
      5000
    );
    c.position.set(0, 0, 2);

    // TEXTURE
    // const myUrl = this.elem.src;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "Anonymous";

    let croppedImg = await ImageCropper.makeSquare(this.elem, 64);

    const texture = textureLoader.load(croppedImg); //64x64

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);

    material.map = texture;

    // ADD LIGHT

    // ADD ELEMENTS

    s = new THREE.Scene();
    s.add(cube);

    this.renderer = r;
    this.camera = c;
    this.scene = s;
    this.cube = cube;

    this.update = this._update; // prevent async issues
  }

  update() {

  }

  _update() {
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
