console.log('Whereby Background Mute LOADED');

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

function update() {
  requestAnimationFrame(update);
  updateMuteButton();
  updateCamButton();

  if (document.querySelector('[class*="react-tiny-popover-container"]').hover == true)
  addMenuButton()
}

function updateMuteButton() {
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



function addMenuButton(){
  let menu =  document.querySelector('[class*="hoverMenuWrapper"]');
  let itemButton = document.querySelector('[class*="itemButton-1l_5"]');
  let contentWrapper = document.querySelector('[class*="contentWrapper"]');
  let menuDivider = document.querySelector('[class*="MenuDivider"]');

  
  if (!menu) return;  

  if (menu.querySelector('[class*="Menu"]')) {
    menu.appendChild(itemButton);
    itemButton.appendChild(contentWrapper);
    itemButton.appendChild(menuDivider);
    contentWrapper.append("<span>Hide Self View</span>");
    // connectedRoom.style["background-color"] = "red";
    // menu.classList.add(itemButton);
    // menu.classList.add(menuDivider);
//     0: "itemButton-1l_5"
// 1: "deviceMenuItem-TIQW"
// 2: "undefined"
// length: 3
// value: "itemButton-1l_5 deviceMenuItem-TIQW undefined"
    console.log(menu.childElementCount);

    //connectedRoom.classList.add('cam-background');
  } else {
    // connectedRoom.style["background-color"] = "rgb(0, 102, 84)";
    connectedRoom.classList.remove('cam-background');
  }
}

function hideSelfView() {
  let video = document.querySelector('[class*="mediaWrapper"]');

  if (document.getElementById('SelfView').clicked == true) {
    video.classList.add('cam-hide');
  } else {
    video.classList.remove('cam-hide');
  }

}
