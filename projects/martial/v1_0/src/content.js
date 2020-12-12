//https://www.openinteractive.ch/partner
// https://brunoarizio.com/
// http://wolfdog-raven.nl/

//  ALT + S pour activer l'extension

let keyUp = false;
let alreadySend = 0;
class Content {
  constructor() {
    this.closeAnimations = false;
    this.blocked = 0;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request != this.closeAnimations) {
        console.log("listenenr context");
        this.closeAnimations = !this.closeAnimations;
        return this.closeAnimations;
      }
    });

    this.setup();
  }

  setup() {
    var elements = document.getElementsByClassName("ClassName");
    var elements = document.querySelectorAll("*");

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].style.transform != "") {
        console.log(elements[i].style.transform);
        if (this.closeAnimations == true) {
          elements[i].style.transform = "translate(0px,0px) scale(1, 1)";
        }
        this.blocked++;
      }
    }
    console.log(this.blocked);
    this.startListeners();
    this.draw();
  }

  startListeners() {
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  }

  draw() {
    var elements = document.querySelectorAll("*");
    const tagToBlock = ["BUTTON", "SPAN", "STRONG", "IMG"];
    const classToBlock = [
      "letter",
      "letters",
      "line",
      "award",
      "ng-isolate-scope",
    ];
    // console.log(this.closeAnimations);
    console.log(this.closeAnimations);
    if (this.closeAnimations == true) {
      console.log("Extension activated");
      if (this.createdBanner != true) {
        this.banner();
        setTimeout(function () {
          console.log(document.getElementById("banner-xksiadwekod").remove());
        }, 3000);
      }

      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transition = "none !important";
        if (elements[i].tagName == "CANVAS") {
          elements[i].style.display = "none !important";
        }
        if (
          elements[i].tagName == "BUTTON" ||
          elements[i].tagName == "H2" ||
          elements[i].tagName == "SPAN" ||
          elements[i].tagName == "SVG" ||
          elements[i].tagName == "STRONG" ||
          elements[i].className == "letter" ||
          elements[i].className == "letters" ||
          elements[i].className == "line" ||
          elements[i].className == "award" ||
          elements[i].className == "item" ||
          elements[i].className == "award-bg" ||
          elements[i].className == "ng-isolate-scope" ||
          elements[i].className == "c-section" ||
          elements[i].tagName == "IMG" ||
          elements[i].className == "hero-inner"
        ) {
          elements[i].style.transform = "translate(0px,0px) scale(1, 1)";
          elements[i].style.transition = "none !important";
          elements[i].style.transitionDuration = "0.01ms !important";
        }
        if (
          elements[i].className == "item" ||
          elements[i].className == "award-bg" ||
          elements[i].className == "headline__inner" ||
          elements[i].className == "headline--1"
        ) {
          elements[i].style.transform =
            "translate3d(0px,0px,0px) scale(1,1) !important";
          elements[i].style.transition = "none !important";
          elements[i].style.transitionDuration = "0.01ms !important";
        }

        if (elements[i].id == "scratch") {
          elements[i].style.display = "none";
        }
      }
    } else {
      this.createdBanner = false;
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  onKeyUp(e) {
    console.log(e);

    if (e.which == 83) {
      this.closeAnimations = !this.closeAnimations;
      // chrome.runtime.sendMessage(this.closeAnimations, function (response) {
      //   console.log(`message from background: ${JSON.stringify(response)}`);
      // });
    }
  }

  banner() {
    console.log("banner created");
    this.createdBanner = true;
    let banner = document.createElement("p");
    banner.id = "banner-xksiadwekod";
    let node = document.createTextNode(
      "You've blocked " + this.blocked + " animations"
    );
    banner.appendChild(node);
    console.log(this.canvas);
    // scale = window.devicePixelRatio || 1; // Change to 1 on retina screens to see blurry canvas.
    // var rect = canvas.getBoundingClientRect();
    document.body.prepend(banner);
  }
}

window.onload = () => {
  new Content();
};

// // this.keyDownHandler = this.onKeyDown.bind(this);
// // this.keyUpHandler = this.onKeyUp.bind(this);
