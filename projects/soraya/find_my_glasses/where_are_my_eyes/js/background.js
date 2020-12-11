let blurs = [0, 1, 5,10,15,18,20,35,50,80];
let blurLevel = 0;

// chrome.browserAction.onClicked.addListener(buttonClicked);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('Got message', msg);

  if (msg.action == 'getBlur') {
    sendResponse(blurs[blurLevel]);
  } else if (msg.action == 'onWin') {
    blurLevel++;
    if (blurLevel >= blurs.length) {
      console.log('RESET');
      blurLevel = 0;
      alert(
        'Congrats ! You successfully passed the blind test. You really have an eye for spotting the intruder!'
      );
    }
  } else if (msg.action == 'gameover') {
    chrome.tabs.query({ active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'gameover' });
    });
  }
});
