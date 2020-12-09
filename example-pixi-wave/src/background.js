function onMessageReceived(message, sender, senderResponse) {
  // Only capture screenshot if the message object has a property
  // "action" with value "screenshot".
  if (message.action != "screenshot") {
    return;
  }
  // Grab a screenshot of the active tab.
  chrome.tabs.captureVisibleTab(function(screenshotDataSrc) {
    // Sendback screenshot data.
    const response = { src: screenshotDataSrc };
    senderResponse(response);
  });
  return true;
}

// Listen for messages from content.
chrome.runtime.onMessage.addListener(onMessageReceived);
