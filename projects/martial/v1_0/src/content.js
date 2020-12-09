//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty
//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty

//https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributes

class Content {
  constructor() {
    this.setup();
  }

  setup() {
    // let element = document.styleSheets[0].cssRules[0].style;
    // console.log(document.styleSheets[0].cssRules[0].style[10]);
    // console.log(this.checkElement.length);
    // for (let i = 0; i < this.checkElement.length; i++) {
    //   this.checkElement[i].removeProperty("transform");

    //   // let seeProperty = window.getComputedStyle(this.checkElement[i], null);
    //   // console.log(seeProperty);
    //   console.log("passé dans la boucle");
    // }
    // this.startListeners();
    var declaration = document.styleSheets[0].cssRules[0].style;
    var value = declaration.getPropertyValue("margin"); // "1px 2px"
    console.log(value);

    this.checkElement = document.querySelectorAll("div");
    console.log(this.checkElement.length);
    let seeProperty = window.getComputedStyle(this.checkElement[0], null);
    seeProperty.removeProperty("transform");
    console.log(seeProperty);
    this.draw();
  }

  // startListeners() {
  //   // this.mouseDownHandler = this.onMouseDown.bind(this);
  //   // this.mouseUpHandler = this.onMouseUp.bind(this);
  //   // this.mouseMoveHandler = this.onMouseMove.bind(this);
  //   // // document.addEventListener("mousedown", this.mouseDownHandler);
  //   // // document.addEventListener("mouseup", this.mouseUpHandler);
  //   // document.addEventListener("mousemove", this.mouseMoveHandler);
  // }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
  }

  onMouseDown(e) {}
}

window.onload = () => {
  new Content();
};

// this.keyDownHandler = this.onKeyDown.bind(this);
// this.keyUpHandler = this.onKeyUp.bind(this);
