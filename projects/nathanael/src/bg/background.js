// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/* chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  }); */

// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

const wordVectors = ml5.word2vec('wordvecs10000.json', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!!!');
}

// Find the closest word to 'rainbow'
wordVectors.nearest('rainbow', (err, results) => {
    console.log(results);
});
var fails = 0;

function w2v(word, tab, key) {
    var result;
    /* console.log("asking for " + word) */
    wordVectors.nearest(word, (e, r) => {
        result = r;
        console.log(r)
        if (true) {
            fails++
        }
        console.log(fails)
            /* var id = tab["id"] */
        chrome.tabs.sendMessage(tab, { "word": r, "originalWord": word, "key": key })
        return r;
    })
}
/* w2v("hi"); */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    /* console.log(request); */
    if (request.type == "wordRequest") {
        /* console.log(sender.tab.id) */
        var word = w2v(request.word, sender.tab.id, request.id);
    }
    return true;
})














/* chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
}); */