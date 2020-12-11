function toggleState(e) {
  e = !e;
  return e;
}

function setState(e) {
  e = e;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  console.log(sender);
  if (request && sender.frameId == 0) {
    sendResponse(setState(request));
  } else if (sender.id == "iakmlehablndimkabbgeodikdcjffdgc") {
    console.log("sent from popup");
    request = !request;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
        console.log(response.farewell);
      });
    });
    sendResponse(request);
  } else {
    sendResponse({ result: "error", message: `Invalid 'cmd'` });
  }
  // Note: Returning true is required here!
  //  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
  return true;
});
