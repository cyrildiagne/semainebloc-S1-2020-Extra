function onClicked(tab) {
  const message = { action: "run" };
  chrome.tabs.sendMessage(tab.id, message);

  setTimeout((e) => {
    takeSnapshot();
  }, 2000);
}

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
