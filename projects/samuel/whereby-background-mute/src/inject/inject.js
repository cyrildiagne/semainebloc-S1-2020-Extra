chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) { 
    if (msg.action == 'historychange') { 
    	console.log('history changed', msg)
    } 
}); 

// chrome.tabs.sendRequest(tabId: 
// 	number
// 	, request: 
// 	any
// 	, responseCallback: 
// 	function
// 	)


// 	chrome.webNavigation.onCommitted.addListener(function(e) {
// 		if (hasHostSuffix(e.url, 'google.com') ||
// 			hasHostSuffix(e.url, 'google.com.au')) {
// 		  // ...
// 		}
// 	  });