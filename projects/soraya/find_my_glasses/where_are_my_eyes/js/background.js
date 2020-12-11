let blurs = [0, 1,2,3];
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
      alert("Congrats ! You successfully passed the blind test. You really have an eye for spotting the intruder!")
    }
  }
});

function buttonClicked(tab) {
  let msg = {
    txt: 'hello',
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
