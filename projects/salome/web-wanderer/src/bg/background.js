let ACTIVATED = false;

const links = [];

chrome.browserAction.onClicked.addListener((evt) => {
  ACTIVATED = !ACTIVATED;
  console.log('ACTIVATED is ', ACTIVATED);
  //changer l'icone

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
  console.log(request);
  if (request.action == 'newPage') {
    links.push(request.link);
  } else if (request.action == 'getHistory') {
    console(links)
    sendResponse({ links: links });
  }
  // if (request.action == 'requestNextAction') {
  //   sendAction(sender.tab.id, 'clickButtons');
  // }
});

async function sendAction(tab, actionType) {
  if (!ACTIVATED) return;

  // console.log('action');

  let message = { action: actionType };
  chrome.tabs.sendMessage(tab, message);
}

// function draw() {
//   beginPath();
//   ellipse(100, 100, 50, 75, (45 * Math.PI) / 180, 0, 2 * Math.PI);
//   stroke();
// }
