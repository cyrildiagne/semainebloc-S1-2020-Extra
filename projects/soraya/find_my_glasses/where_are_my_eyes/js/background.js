let blurs = [0, 1,2,3];
let blurLevel = 0;

// chrome.browserAction.onClicked.addListener(buttonClicked);

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



function onClicked(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup/popup.html"),
    type: "popup",
    focused: true,
  });
}

chrome.extension.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  if (message.txt === 'hello') {
    doBlur();
    console.log('game over');
  } 
}

chrome.browserAction.onClicked.addListener(onClicked);
