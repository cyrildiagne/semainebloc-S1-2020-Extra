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
  updateMuteButton();
  updateCamButton();
  // tryAddMenuButton();

  // if (
  //   document.querySelector('[class*="react-tiny-popover-container"]').hover ==
  //   true
  // )
  //   addMenuButton();
}

function updateMuteButton() {
  let muteButton = document.querySelector('[class*="mute-button"]');
  let connectedRoom = document.querySelector('[class*="ConnectedRoom"]');

  if (!muteButton) return;

  if (muteButton.querySelector('[class*="isOff"]')) {
    // connectedRoom.style["background-color"] = "red";
    connectedRoom.dataset['msg'] = 'YOUR MICROPHONE IS OFF';
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
    // connectedRoom.style["background-color"] = "red";
    connectedRoom.dataset['msg'] = 'YOUR CAMERA IS OFF';
    connectedRoom.classList.add('cam-background');
  } else {
    // connectedRoom.style["background-color"] = "rgb(0, 102, 84)";
    connectedRoom.classList.remove('cam-background');
  }
}

// function alertMic(){

// }

function tryAddMenuButton() {
  // let menu = document.querySelector('[class*="hoverMenuWrapper"]');
  // let itemButton = document.querySelector('[class*="itemButton-1l_5"]');
  // let contentWrapper = document.querySelector('[class*="contentWrapper"]');
  // let menuDivider = document.querySelector('[class*="MenuDivider"]');

  console.log(menu, itemButton, contentWrapper, menuDivider);

  if (!menu) return;

  // if (menu.querySelector('[class*="Menu"]')) {
  //   menu.appendChild(itemButton);
  //   itemButton.appendChild(contentWrapper);
  //   itemButton.appendChild(menuDivider);
  //   contentWrapper.append("<span>Hide Self View</span>");
  //   // connectedRoom.style["background-color"] = "red";
  //   // menu.classList.add(itemButton);
  //   // menu.classList.add(menuDivider);
  //   //     0: "itemButton-1l_5"
  //   // 1: "deviceMenuItem-TIQW"
  //   // 2: "undefined"
  //   // length: 3
  //   // value: "itemButton-1l_5 deviceMenuItem-TIQW undefined"
  //   console.log(menu.childElementCount);

  //   //connectedRoom.classList.add('cam-background');
  // }
}

function hideSelfView() {
  let video = document.querySelector('[class*="mediaWrapper"]');

  if (document.getElementById('SelfView').clicked == true) {
    video.classList.add('cam-hide');
  } else {
    video.classList.remove('cam-hide');
  }
}
