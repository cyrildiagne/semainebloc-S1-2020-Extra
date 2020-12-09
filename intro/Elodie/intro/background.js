function onClicked(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    focused: true,
  });
}

chrome.browserAction.onClicked.addListener(onClicked);
