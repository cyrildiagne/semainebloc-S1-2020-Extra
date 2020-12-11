console.log("hello, tout fonctionne");

let nbRows = 1;
let nbCols = 1;
let radius = 3;
let playerRadius = 30;
let checkState = true;
let switchState = false;
let scale;
let timeSwitch = 30; //In frames
let incSwitch = 0;
let color, background;
let color1N = 11;
let color2N = 250;
let black = "rgb(" + color1N + ", " + color1N + ", " + color1N + ")";
let white = "rgb(" + color2N + ", " + color2N + ", " + color2N + ")";
let colorState = "white";
const parentCanvas = document.getElementById("canvas-container");

class Popup {
  constructor() {
    this.state = false;
    this.canvas = document.createElement("canvas");
    console.log(this.canvas);
    scale = window.devicePixelRatio || 1; // Change to 1 on retina screens to see blurry canvas.
    // var rect = canvas.getBoundingClientRect();
    parentCanvas.appendChild(this.canvas);
    const widthCanvas = 100;
    const heightCanvas = 50;
    //ctxx
    this.canvas.width = this.w = widthCanvas * scale;
    this.canvas.height = this.h = heightCanvas * scale;
    this.canvas.style.width = widthCanvas + "px";
    this.canvas.style.height = heightCanvas + "px";
    this.ctx = this.canvas.getContext("2d");
    // this.ctx.scale(0.5, 0.5);
    this.setup();
  }

  startListeners() {
    this.mouseUpHandler = this.onMouseUp.bind(this);
    // this.keyDownHandler = this.onKeyDown.bind(this);
    // this.keyUpHandler = this.onKeyUp.bind(this);

    document.addEventListener("mouseup", this.mouseUpHandler);
    // pour exporter les points de toutes les courbes
    // document.addEventListener("keydown", this.keyDownHandler);
    // document.addEventListener("keyup", this.keyUpHandler);
  }

  onMouseUp(e) {
    console.log(e);
    if (this.button.changeState(e)) {
      chrome.runtime.sendMessage(this.state, function (response) {
        this.state = response;
      });
      this.state = !this.state;
      switchState = true;
    }
    // this.state.change(e.x, e.y);
  }

  setup() {
    document.getElementById("refresh").onclick = function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
      });
    };
    this.button = new Button(
      nbCols,
      nbRows,
      playerRadius,
      this.ctx,
      this.w,
      this.h,
      this.state
    );
    this.startListeners();
    this.draw();
  }

  draw() {
    this.button.draw();
    if (switchState && incSwitch < timeSwitch) {
      if (incSwitch == 1) {
      }
      incSwitch++;
      this.button.move(incSwitch, timeSwitch, "white");
    }
    if (incSwitch == timeSwitch) {
      switchState = false;
      incSwitch = 0;
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  new Popup();
};
