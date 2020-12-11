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
    r = new THREE.WebGLRenderer({ antialias: true });

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
    /*
    let material;
    const loader = new THREE.TextureLoader();
    loader.load(
      // resource URL
      "textures/gridtexture.png",

      // onLoad callback
      function (texture) {
        // in this example we create the material when the texture is loaded
        material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      },

    );
    */

    //TEXTURE TRY 2
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: loader.load("textures/mip.png"),
    });

    const geometry = new THREE.BoxGeometry(0.1, 1, 0.6);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    const cube = new THREE.Mesh(geometry, material);

    // material.map = texture;

    // ADD LIGHT & ELEMENTS
    const light = new THREE.AmbientLight(0x404040);
    s = new THREE.Scene();
    s.add(cube);
    s.add(light);

    this.renderer = r;
    this.camera = c;
    this.scene = s;
    this.cube = cube;

    this.update = this._update; // prevent async issues
  }

  update() {}

  _update() {
    this.cube.rotation.y += 0.01;
    this.cube.rotation.z += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
