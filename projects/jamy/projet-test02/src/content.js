let body = document.getElementsByTagName("body")[0];

//CANVAS
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let windowX = window.innerWidth * window.devicePixelRatio;
let windowY = window.innerHeight * window.devicePixelRatio;
canvas.width = windowX;
canvas.height = windowY;
canvas.id = "myCanvasTrail";
body.appendChild(canvas);
let canvasURL;

//BUTTON
let button = document.createElement("input");
button.id = "myScreenshotButton";
button.type = "button";
canvas.appendChild(button);

//CURSOR
const imgURL = chrome.runtime.getURL("../res/cursor02.png");
const img = new Image();
let imgIsLoaded = false;
img.onload = onImageLoad();
img.src = imgURL;
let cursor;
function onImageLoad() {
  imgIsLoaded = true;
}

//TIME
let maxTime = 10000;
let imgTimer = [];

//GRID
let gridX = 40;
let gridY = 40;

//randomPos
let randomPosX = [];
let randomPosY = [];

let imgs = [];

//MousePos
let mousePosXcenter = 0;
let mousePosYcenter = 0;

//IMG
let widthImgs = 0;
let heigthImgs = 0;
let imgHasBeenDrown = [];

function onResizeWindow() {
  windowX = window.innerWidth * window.devicePixelRatio;
  windowY = window.innerHeight * window.devicePixelRatio;
  ctx.width = windowX;
  ctx.height = windowY;
}

//----------------------------------------------------------------------------
class Content {
  constructor() {
    this.init();
    console.log("Toutes les ressources sont chargées !");
    //ctx.globalAlpha = 1;
    imgs = document.querySelectorAll("img");

    canvasURL = canvas.toDataURL();

    for (let i = 0; i < 1000; i++) {
      randomPosX[i] = Math.random() * windowX;
      randomPosY[i] = Math.random() * windowY;
    }
  }

  init() {
    this.draw();
  }

  draw() {
    for (let i = 0; i < imgs.length; i++) {
      imgTimer.push(0);

      imgHasBeenDrown.push(0);

      //TIMER
      if (imgTimer[i] != maxTime) {
        imgTimer[i]++;
      }

      let imgInfos = imgs[i].getBoundingClientRect();

      /*// -------------- POS GRID
      for (let y = 0; y < Math.round(Math.sqrt(imgs.length)); y++) {
        for (let x = 0; x < Math.round(Math.sqrt(imgs.length)); x++) {
          ctx.drawImage( 
            imgs[x*y],   
            x*windowX/Math.round(Math.sqrt(imgs.length)), 
            y*windowY/Math.round(Math.sqrt(imgs.length)), 
            windowX/Math.round(Math.sqrt(imgs.length)), 
            windowY/Math.round(Math.sqrt(imgs.length)));
        }
      }
      */

      /*  // -------------- NORMAL POS
      ctx.drawImage(
        imgs[i],                                          //imgNumber
        imgInfos.left,                                    //posX
        imgInfos.top,                                     //posY
        imgInfos.width * (imgTimer[i] / maxTime),         //sizeX
        imgInfos.height * (imgTimer[i] / maxTime)         //sizeY
      );
*/

      /* // -------------- NORMAL POS + FOLLOW MOUSE
      ctx.drawImage(
        imgs[i],                                          //imgNumber
        imgInfos.left + mousePosXcenter,                  //posX
        imgInfos.top + mousePosYcenter,                   //posY
        imgInfos.width * (imgTimer[i] / maxTime),         //sizeX
        imgInfos.height * (imgTimer[i] / maxTime)         //sizeY
      );
*/

      // -------------- NORMAL POS ONLY DRAW ONCE

      if (imgHasBeenDrown[i] < 1) {
        ctx.drawImage(
          imgs[i], //imgNumber
          randomPosX[i] -
            ((imgInfos.width / Math.floor(Math.sqrt(imgs.length))) * 5) / 2, //posX
          randomPosY[i] -
            ((imgInfos.height / Math.floor(Math.sqrt(imgs.length))) * 5) / 2, //posY
          (imgInfos.width / Math.floor(Math.sqrt(imgs.length))) * 5, //sizeX
          (imgInfos.height / Math.floor(Math.sqrt(imgs.length))) * 5 //sizeY
        );
        //imgHasBeenDrown[i]++;
        //alert(i);
      }

      ctx.font = "50px Arial";
      ctx.fillText("nb Image : " + imgs.length, 50, 50);
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}

function onScroll() {
  loadImages();
}

function loadImages() {
  // imgs.length = 0;
  let newImgs = document.querySelectorAll("img");

  for(let newImg of newImgs) {
    let img = new Image();
    let src = newImg.src;
    let proxySrc = `${"https://proxy.ecal-mid.ch/"}${src.replace('https://', '').replace('http://', '')}`;

    img.onload = e => {
      imgs.push(img);
    };

    img.crossOrigin = 'Anonymous';
    img.src = proxySrc;
  }

}

function onMouseMouve(e) {
  e = event || window.event;
  mousePosXcenter = e.clientX - innerWidth / 2;
  mousePosYcenter = e.clientY - innerHeight / 2;

  if (imgIsLoaded == true) {
    ctx.drawImage(img, e.clientX, e.clientY, img.width / 5, img.height / 5);
  }
}

document.onmousemove = onMouseMouve;

body.onscroll = onScroll;

window.onclick = function () {

  let canvasURL = canvas.toDataURL();
  canvasURL.crossOrigin = "Anonymous";

  chrome.runtime.sendMessage(
    { type: "sendScreenCanvas", value: canvasURL },
    function (response) {
      //alert(response.result);
    }
  );

  //alert(canvasURL);
  //ça fonctionne ici avant

};

window.onresize = onResizeWindow;

window.onload = () => {
  new Content();

  chrome.runtime.sendMessage(
    { type: "whatIsTheCanvasLike", value: canvasURL },
    function (response) {
      var oldCanvas = new Image();
      oldCanvas.onload = function () {
        ctx.drawImage(oldCanvas, 0, 0);
      };
      oldCanvas.crossOrigin = "Anonymous";
      oldCanvas.src = response.result;
      //alert(oldCanvas)
      alert(response.result);
    }
  );
};
