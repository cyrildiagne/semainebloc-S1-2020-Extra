// A mouse object to store the click coordinates.
const mouse = { x: 0, y: 0 };

// Image that will store the screenshot data.
const img = document.createElement("img");
img.addEventListener("load", onImageLoaded);

// The PIXI Texture that will show the screenshot as background.
let bgTexture;

// Hide the canvas by default and when interacting with the page.
hide();
document.body.onscroll = function() {
  hide();
};
document.body.addEventListener("keydown", hide);

// Listen for click events on the body.
document.body.addEventListener("click", onDocumentClick);
function onDocumentClick(evt) {
  // Save mouse coordinates.
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
  // Hide pixi.
  hide();
  // Send message to background to take screenshot.
  const message = { action: "screenshot" };
  chrome.runtime.sendMessage(message, onScreenShotResponse);
}

// Handler called when a new screenshot has been grabed
function onScreenShotResponse(response) {
  // Load the screenshot data in our img.
  // When complete (in an undefined amount of time) it will trigger
  // an image "load" event and the onImageLoaded function will be called.
  img.src = response.src;
}

// Handler called automatically when a new screenshot has been loaded
// inside the img.
function onImageLoaded(evt) {
  // 1) Update the background texture.
  updateBgTexture();
  // 2) Show.
  show();
  // 3) Add Ripple in PIXI.
  addRipple(mouse.x, mouse.y);
}

// Shows the PIXI canvas.
function show() {
  pixi.view.style.display = "block";
  pixi.view.classList.add("screenshot");
  pixi.view.id = "wave-screenshot";
}

// Hides the PIXI canvas.
function hide() {
  pixi.view.style.display = "none";
}

// Sends the img to PIXI as background sprite.
function updateBgTexture() {
  if (!bgTexture) {
    bgTexture = PIXI.Texture.from(img);
    var bg = new PIXI.Sprite(bgTexture);
    bg.scale.set(pixi.view.width / img.width, pixi.view.height / img.height);
    pixi.stage.addChildAt(bg, 0);
  } else {
    bgTexture.update();
  }
}
