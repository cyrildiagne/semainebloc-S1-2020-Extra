let ACTIVATED = false;

let links;

chrome.browserAction.onClicked.addListener((evt) => {
  ACTIVATED = !ACTIVATED;
  console.log('ACTIVATED is ', ACTIVATED);
  //changer l'icone

  if (!ACTIVATED) {
    return;
  }

  links = [];

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const itvl = setInterval(() => {
      if (!ACTIVATED) {
        clearInterval(itvl);
      }
      sendAction(tabs[0].id, 'clickButtons');
    }, 3000);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'newPage') {
    links.push(request.link);
  } else if (request.action == 'getHistory') {
    sendResponse({ links: links });
  }
  // if (request.action == 'requestNextAction') {
  //   sendAction(sender.tab.id, 'clickButtons');
  // }
});

async function sendAction(tab, actionType) {
  let message = { action: actionType };
  chrome.tabs.sendMessage(tab, message);
}



