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
  } else if (request.event == "get_forbidden_words") {
    // currentTab = sender.tab.id;
    sendResponse(getCurrentWebsite());
  } else if (request.event == "click_score") {

    globalScore -= 10;
    chrome.extension.sendMessage({ score: globalScore });

  } else if (request.event == "win") {
    // Get new URL
    
    let url = getNextWebsite();
    console.log(url);
    updateTab(url);
    // Increment score
    globalScore += 100;

    // Send new url & score
    setTimeout(() => {
      sendResponse({ url: url, score: globalScore });
    }, 2000);
  // } else if (request.event == "click_score"){
  //   globalScore = (-50);
  //   let url = getNextWebsite();
  //   updateTab(url);
  //   console.log(globalScore);


  } else {

    sendResponse();

  }
  return true;
});

function getNextWebsite() {
  urlIndex = (urlIndex + 1) % urls.length;
  let url = urls[urlIndex].url;
  return url;
}

function updateTab(url) {
  chrome.tabs.query({active: true, windowType: "normal"}, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url });
  });
  // chrome.tabs.query({active: true, windowType: "popup"}, function (tabs) {
  //   chrome.tabs.update(tabs[0].url, { url: tabs[0].url });
  // });
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
