let blurs = [0, 5, 10, 20, 50, 100];
let blurLevel = 0;

chrome.browserAction.onClicked.addListener(buttonClicked);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action == 'getBlur') {
    sendResponse(blurs[blurLevel]);
  } else if (msg.action == 'onWin') {
    blurLevel++;
    if (blurLevel >= blurs.length) {
      console.log('RESET');
      blurLevel = 0;
    }
  }
});

function buttonClicked(tab) {
  let msg = {
    txt: 'hello',
  };
  chrome.tabs.sendMessage(tab.id, msg);
}

//doit get message contenant les valeurs de la fonction doBlur(); afin de les rééinjecter et les incréementer
