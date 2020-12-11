let urlIndex = 0;
let currentTab;

let globalScore;

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log("received message", request);
  // chrome.pageAction.show(sender.tab.id);

  if (request.event == "get_url") {
    console.log(getCurrentWebsite())
    sendResponse(getCurrentWebsite());
  } else if (request.event == "get_current_url") {
    currentTab = sender.tab.id;
    sendResponse(getCurrentWebsite());
  } else if (request.event == "click_score") {

    globalScore -= 10;
    chrome.extension.sendMessage({ score: globalScore });

  } else if (request.event == "win") {
    // Get new URL
    
    let url = getNextWebsite();
    // updateTab(url);
    chrome.tabs.update(currentTab.id, { url: url });
    // Increment score
    globalScore += 100;

    // Send new url & score
    setTimeout(() => {

      sendResponse({ url: url, score: globalScore });

    }, 2000);
  } else {

    sendResponse();

  }
  return true;
});

function getNextWebsite() {
  let url = urls[urlIndex].url;
  urlIndex = (urlIndex + 1) % urls.length;

  return url;
}

function updateTab() {
  let url = getCurrentWebsite();
  chrome.tabs.get(currentTab, function (tabs) {
    // chrome.tabs.update(tabs[0].id, { url });
    console.log(tabs);
  });
}

function getCurrentWebsite() {
  console.log(urls[urlIndex].url);
  return urls[urlIndex].url;
}
// console.log(chrome.browserAction);

chrome.browserAction.onClicked.addListener((tab) => {
  globalScore = 0;
  urlIndex = 0;

  let url = getCurrentWebsite();

  // currentTab = tab;
  let popupTab = chrome.windows.create({
    url: chrome.runtime.getURL("src/popup/popup.html"),
    type: "popup",
    width: 500,
    height: 1920,
    focused: false,
  });

  updateTab(url);
});

// chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
//   chrome.windows.update(tabs[0].windowId, { state: "fullscreen" });
// });

// 1. elements sont cachés mais avec une bordure/outline (hitbox) apparente.
// 2. bouton play
// 3. Vies
// 4. Win detection -> trouver sur quel site on est
//  -> inject.js, insérer un input text pour comparer avec l'url du site web
