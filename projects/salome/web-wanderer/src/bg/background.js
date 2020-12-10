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
