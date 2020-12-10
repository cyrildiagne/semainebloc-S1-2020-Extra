let ACTIVATED = false;

chrome.browserAction.onClicked.addListener((evt) => {
  ACTIVATED = !ACTIVATED;
  console.log('ACTIVED is ', ACTIVATED);
  //changer l'icone

  

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendAction(tabs[0].id, "clickButtons");
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "requestNextAction") {
    sendAction(sender.tab.id, "clickButtons");
  }
});

function sendAction(tab, actionType) {

  if (!ACTIVATED)
    return;

  let message = { action: actionType };
  chrome.tabs.sendMessage(tab, message);
}

function draw (){
  
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(250, 250, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  
  }
}
