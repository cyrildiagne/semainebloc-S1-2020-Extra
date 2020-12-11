let screenCanvas = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "sendScreenCanvas") {
    screenCanvas = request.value;
    sendResponse({ result: screenCanvas });
    //alert(screenCanvas);
  }
  if(request.type == "whatIsTheCanvasLike"){
    sendResponse({ result: screenCanvas });
  }
});