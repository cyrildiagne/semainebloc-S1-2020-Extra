console.log('Hide Me Extension Running');

chrome.extension.sendMessage({}, (response) => {
  // arrow functions
  let readyStateCheckInterval = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      requestAnimationFrame(update);

      // // ----------------------------------------------------------
      // // This part of the script triggers when page is done loading
      // console.log("Hello. This message was sent from scripts/inject.js");
      // // ----------------------------------------------------------
    }
  }, 10);
});

function tryAddHideButton() {
  let videoCells = document.querySelectorAll('[class*="gridVideoCell"]');

  for (let videoCell of videoCells) {
    if (videoCell.querySelector('.hideme--hide-button')) continue;

    let hideButton = createHideButton(videoCell);

    hideButton.addEventListener('click', () => {
      videoCell.classList.toggle('hideme--hide-video-cell');

      // let webcam = videoCell.querySelector('video');

      // webcam.autoplay = false;
      // webcam.pause();

      console.log(webcam);
    });
  }
}

function createHideButton(container) {
  let button = document.createElement('div');
  button.classList.add('hideme--hide-button');

  container.appendChild(button);

  return button;
}

function update() {
  requestAnimationFrame(update);
  tryAddHideButton();
  updateCamButton();
  updateMuteButton();
  
  
}

function updateMuteButton() {
  let muteButton = document.querySelector('[class*="mute-button"]');
  let connectedRoom = document.querySelector('[class*="ConnectedRoom"]');

  if (!muteButton) return;

  if (muteButton.querySelector('[class*="isOff"]')) {
    // connectedRoom.style["background-color"] = "red";
    connectedRoom.dataset['msg1'] = 'YOUR MICROPHONE IS OFF';
    connectedRoom.classList.add('mute-background');
  } else {
    // connectedRoom.style["background-color"] = "rgb(0, 102, 84)";
    connectedRoom.classList.remove('mute-background');
  }
}

function updateCamButton() {
  let camButton = document.querySelector('[class*="toggle-video"]');
  let connectedRoom = document.querySelector('[class*="ConnectedRoom"]');

  if (!camButton) return;

  if (camButton.querySelector('[class*="isOff"]')) {
   
    connectedRoom.dataset['msg2'] = 'YOUR CAMERA IS OFF';
    connectedRoom.classList.add('cam-background');
  } else {
    
    connectedRoom.classList.remove('cam-background');
  }
}


function tryAddMenuButton() {

  console.log(menu, itemButton, contentWrapper, menuDivider);

  if (!menu) return;

}

function hideSelfView() {
  let video = document.querySelector('[class*="mediaWrapper"]');

  if (document.getElementById('SelfView').clicked == true) {
    video.classList.add('cam-hide');
  } else {
    video.classList.remove('cam-hide');
  }
}
