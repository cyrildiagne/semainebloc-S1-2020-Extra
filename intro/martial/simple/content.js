let deg = 1;
let velocity = 3;
let x = document.querySelectorAll("img");
let mediaText = document.querySelectorAll(".mediatexts");

class Content {
  constructor() {
    this.init();
  }

  init() {
    console.log(Math.random());

    // Set the background color of the first <p> element
    for (let i = 0; i < x.length; i++) {}
    this.draw();
  }

  draw() {
    deg += Math.abs(Math.sin(velocity * 5));
    for (let i = 0; i < mediaText.length; i++) {
      mediaText[i].style.zIndex = "1001";
    }
    for (let i = 0; i < x.length; i++) {
      x[i].style.transform = "rotate(" + deg + "deg)";
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  new Content();
};
