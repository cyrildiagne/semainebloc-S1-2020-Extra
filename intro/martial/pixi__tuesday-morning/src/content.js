let x = 0;
let y = 0;

class Content {
  constructor() {
    this.setup();
  }

  setup() {
    this.startListeners();
    this.circle = new PIXI.Graphics()
      .beginFill(0xff00ff)
      .drawCircle(x, y, 30)
      .endFill();
    pixi.stage.addChild(this.circle);
    pixi.stage.interactive = true;
    this.draw();
  }

  startListeners() {
    // this.mouseDownHandler = this.onMouseDown.bind(this);
    // this.mouseUpHandler = this.onMouseUp.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);

    // document.addEventListener("mousedown", this.mouseDownHandler);
    // document.addEventListener("mouseup", this.mouseUpHandler);
    document.addEventListener("mousemove", this.mouseMoveHandler);
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
  }

  onMouseDown(e) {
    this.circle.beginFill();
  }
  onMouseMove(e) {
    this.circle.position.x = e.clientX;
    this.circle.position.y = e.clientY;
  }
}

window.onload = () => {
  new Content();
};

// this.keyDownHandler = this.onKeyDown.bind(this);
// this.keyUpHandler = this.onKeyUp.bind(this);
