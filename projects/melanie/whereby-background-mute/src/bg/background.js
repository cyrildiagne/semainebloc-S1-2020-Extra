// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

let currentURL;
let currentTab;

const urls = [
  'https://wikipedia.org',
  'https://google.com',
  'https://ecal.ch',
  'https://letemps.ch',
  'https://www.facebook.com',
  'https://www.amazon.fr/',
  'https://www.reddit.com/',
  'https://www.ebay.fr/',
  'https://fr.linkedin.com/',
  'https://www.twitch.tv/',
  'https://www.easyjet.com/ch-fr',
  'https://www.lemonde.fr/',
  'https://whereby.com',
  'https://www.pinterest.fr',
  'https://time.com/',
  'https://www.spotify.com/fr/'
  
];

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('received message', request);
  // chrome.pageAction.show(sender.tab.id);
  if (request == 'getURL') {
    sendResponse(currentTab.url);
  } else if (request == 'win') {
    let url = urls[Math.floor(Math.random()*urls.length)]
    
    // COMMENT JE CONNECTE AVEC LE TAB
    setTimeout(() => {
      sendResponse(url);
    }, 2000);
  } else {
    sendResponse();
  }
  return true;
});

// console.log(chrome.browserAction);

chrome.browserAction.onClicked.addListener((tab) => {
  currentTab = tab;
  chrome.windows.create({
    url: chrome.runtime.getURL('src/popup/popup.html'),
    type: 'popup',
    width: 500,
    height: 200,
    focused: true,
  });
});

// chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
//   chrome.windows.update(tabs[0].windowId, { state: "fullscreen" });
// });

// 1. elements sont cachés mais avec une bordure/outline (hitbox) apparente.
// 2. bouton play
// 3. Vies
// 4. Win detection -> trouver sur quel site on est
//  -> inject.js, insérer un input text pour comparer avec l'url du site web
