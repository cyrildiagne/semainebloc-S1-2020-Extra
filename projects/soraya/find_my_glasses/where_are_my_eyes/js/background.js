let blurs = [ 0,1, 2, 3, 4, 5, 7, 9, 11,13,15,18,20,25,27,30];
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
    
    blurLevel = 0;

    chrome.tabs.query({ active: true, windowType: "normal" }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'gameover' });
    });
  }
});
