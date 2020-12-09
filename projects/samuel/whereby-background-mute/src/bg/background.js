// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

const URLS = [];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log('updated from background');

  // new Date https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date
  if (changeInfo.status === "complete") {
    const infos = {
      title: tab.title,
      url: tab.url,
      date: new Date(),
    };
    URLS.push(infos); //loading
    console.log(infos);

    // chrome.extension.sendMessage(tabId, {action: "historychange", history: URLS}, function(){});
    // chrome.extension.sendMessage(chrome.runtime.id, {action: "hello", history: URLS}, function(response) {
    chrome.tabs.query({}, function (tabs) {
      var message = { action: "historychange", history: URLS };
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });

    // // WARNING! Might be evaluating an evil script!
    // var resp = eval("(" + response.farewell + ")");
    // });
  }
});
