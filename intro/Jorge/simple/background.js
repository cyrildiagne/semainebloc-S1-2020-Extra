console.log("hello World");

function onClicked(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "panel",
    focused: true,
  });
}

chrome.browserAction.onClicked.addListener(onClicked);
