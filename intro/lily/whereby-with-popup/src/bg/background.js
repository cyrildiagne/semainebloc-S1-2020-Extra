// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


  function onClicked(tab) {
    chrome.windows.create({
      url: chrome.runtime.getURL("src/popup/popup.html"),
      type: "popup",
      focused: true,
    });
  }
  
  chrome.browserAction.onClicked.addListener(onClicked);