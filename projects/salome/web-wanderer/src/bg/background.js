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

function draw (){
  
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(250, 250, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  
  }
}

