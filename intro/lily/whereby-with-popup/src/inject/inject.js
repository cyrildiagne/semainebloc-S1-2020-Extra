console.log("Whereby Background Mute LOADED");

chrome.extension.sendMessage({}, (response) => {
  // arrow functions
  let readyStateCheckInterval = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // requestAnimationFrame(update);
      update()

      // // ----------------------------------------------------------
      // // This part of the script triggers when page is done loading
      // console.log("Hello. This message was sent from scripts/inject.js");
      // // ----------------------------------------------------------
    }
  }, 20);
});

function update() {
  updateMuteButton();
  updateCamButton();
}


function updateMuteButton() {
  // requestAnimationFrame(update);

  let muteButton = document.querySelector('[class*="mute-button"]');
  let connectedRoom = document.querySelector('[class*="ConnectedRoom"]');

  if (!muteButton) return;

  if (muteButton.querySelector('[class*="isOff"]')) {
	// connectedRoom.style["background-color"] = "red";
	connectedRoom.classList.add('mute-background');
  } else {
	// connectedRoom.style["background-color"] = "rgb(0, 102, 84)";
	connectedRoom.classList.remove('mute-background');
  }
}

function updateCamButton() {
  // requestAnimationFrame(update);

  let camButton = document.querySelector('[class*="toggle-video"]');
  let connectedRoom = document.querySelector('[class*="ConnectedRoom"]');

  if (!camButton) return;

  if (camButton.querySelector('[class*="isOff"]')) {
	// connectedRoom.style["background-color"] = "red";
	connectedRoom.classList.add('cam-background');
  } else {
	// connectedRoom.style["background-color"] = "rgb(0, 102, 84)";
	connectedRoom.classList.remove('cam-background');
  }
}