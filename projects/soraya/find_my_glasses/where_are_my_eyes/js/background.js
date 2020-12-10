let blurs = [0, 1,2,3,4,5,6,7,8,9, 10, 15, 20,25,30,35,40,45,50];
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
