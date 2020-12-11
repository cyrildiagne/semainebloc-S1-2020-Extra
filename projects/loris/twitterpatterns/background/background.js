chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action == "run") {
    const message = { action: "run" };
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });

    console.log("run");
  } else if (msg.action == "export") {
    takeSnapshot();
  }
});

function onClicked(tab) {}

// Send a message to the content script when button is clicked.
chrome.browserAction.onClicked.addListener(onClicked);

function takeSnapshot() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "show-background" },
      (response) => {
        setTimeout(() => {
          chrome.tabs.captureVisibleTab((screenshotDataSrc) => {
            const url = screenshotDataSrc;

            chrome.downloads.download({
              url,
              filename: "background.jpeg",
              conflictAction: "overwrite",
              saveAs: true,
            });
          });
        }, 100);
      }
    );
  });
}
