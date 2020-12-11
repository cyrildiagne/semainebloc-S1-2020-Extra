// //https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty
// //https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty

// //https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp

// // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributes

class Content {
  constructor() {
    this.setup();
  }

  setup() {
    let inc = 0;

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
    // var declaration = document.styleSheets[0].cssRules[0].style;
    // var value = declaration.getPropertyValue("margin"); // "1px 2px"
    // console.log(value);
    // var this.elements = document.getElementsByTagName("*");

    // console.log(this.elements[185].tagName);
    this.elements = document.querySelectorAll("*");

    for (let i = 0; i < this.elements.length; i++) {
      // console.log(this.elements[i].style.transition);

      if (this.elements[i].style.transform != "") {
        console.log(this.elements[i].style.transform);
        inc++;
      }
      if (this.elements[i].style.transition != "") {
        console.log(this.elements[i].style.transition);
      }
      if (this.elements[i].style.transitionDelay != "") {
        console.log(this.elements[i].style.transitionDelay);
      }
      if (this.elements[i].style.transitionDuration != "") {
        console.log(this.elements[i].style.transitionDuration);
      }
      if (this.elements[i].style.transitionProperty != "") {
        console.log(this.elements[i].style.transitionProperty);
      }

      //       transition: ""
      // transitionDelay: ""
      // transitionDuration: ""
      // transitionProperty: ""
      // transitionTimingFunction: ""
      else {
        // console.log("noooooo");
      }
    }
    // let seeProperty = window.getComputedStyle(this.checkElement[0], null);
    // // seeProperty.removeProperty("transform");
    // console.log(seeProperty);
    console.log("You've blocked: " + inc);

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
    this.elements = document.querySelectorAll("*");

    const tagToBlock = ["BUTTON", "SPAN", "STRONG", "IMG"];
    const classToBlock = [
      "letter",
      "letters",
      "line",
      "award",
      "ng-isolate-scope",
      "animation-container",
    ];

    for (let i = 0; i < this.elements.length; i++) {
      if (typeof this.elements[i].tagName !== "undefined") {
        for (let tagN = 0; tagN < tagToBlock.length; i++) {
          if (this.elements[i].tagName == tagToBlock[tagN]) {
            this.blockAnimation(this.elements[i].style);
          }
        }
        for (let classN = 0; classN < classToBlock.length; i++) {
          if (this.elements[i].className == classToBlock[classN]) {
            this.blockAnimation(this.elements[i].style);
          }
        }

        if (this.elements[i].tagName == "CANVAS") {
          this.elements[i].style.display = "none";
        }
      }

      // if (this.elements[i].style.transform != "") {
      //   console.log(this.elements[i].style.transform);
      //   this.elements[i].style.transform = "translate(0px,0px) scale(1, 1)";
      // }
      // if (this.elements[i].style.transition != "") {
      //   console.log(this.elements[i].style.transition);
      // }
      // if (this.elements[i].style.transitionDelay != "") {
      //   console.log(this.elements[i].style.transitionDelay);
      // }
      // if (this.elements[i].style.transitionDuration != "") {
      //   console.log(this.elements[i].style.transitionDuration);
      // }
      // if (this.elements[i].style.transitionProperty != "") {
      //   console.log(this.elements[i].style.transitionProperty);
      // }
    }
    // var this.elements = document.getElementsByClassName("ClassName");
    // var this.elements = document.querySelectorAll("*");

    // console.log(this.elements);

    // for (let i = 0; i < this.elements.length; i++) {
    //   // console.log(this.elements[i].style.transition);

    //   if (this.elements[i].style.transform != "") {
    //     console.log(this.elements[i].style.transform);
    //     if (this.elements[i] == "button") {
    //       this.elements[i].style.transform = "translate(0px,0px) scale(1, 1)";
    //     }
    //     this.elements[i].style.transitionDuration = "0.01ms !important";
    //   }
    //   if (this.elements[i].style.transition != "") {
    //     console.log(this.elements[i].style.transition);
    //   }
    //   if (this.elements[i].style.transitionDelay != "") {
    //     console.log(this.elements[i].style.transitionDelay);
    //   }
    //   if (this.elements[i].style.transitionDuration != "") {
    //     console.log(this.elements[i].style.transitionDuration);
    //   }
    //   if (this.elements[i].style.transitionProperty != "") {
    //     console.log(this.elements[i].style.transitionProperty);
    //   }
    // }
    requestAnimationFrame(this.draw.bind(this));
  }

  blockAnimation(elem) {
    elem.transform = "translate(0px,0px) scale(1, 1)";
    elem.transitionDuration = "0.01ms !important";
  }

  onMouseDown(e) {}
}

window.onload = () => {
  new Content();
};
