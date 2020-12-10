chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			// console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

		}
	}, 10);
});

let lignes = [];
let template = document.querySelector('.canvas');




var x = 0;

// var content = document.createElement("div");

var canvas = document.createElement("div");
var button = document.createElement("button");

var content = document.createElement('a');
var linkText = document.createTextNode("my title text");
content.appendChild(linkText);
// content.title = "my title text";

document.body.appendChild(button);


var body = document.body;


button.classList.add("button");

button.innerText = "SHOW MAP";

button.addEventListener('click', function (e) {
	// body.classList.add("blur");

	if (x == 0) {
		// body.classList.add("blur");
		document.body.appendChild(canvas);
		document.body.appendChild(button);
		document.body.appendChild(content);
		content.classList.add("content");

		canvas.classList.add("canvas");

		console.log('id')



		x = 1;
	} else {
		// body.classList.remove("blur");
		canvas.classList.remove("canvas");
		content.classList.remove("content");


		x = 0;
	}

});
// console.log("testdiv");



chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action == 'historychange') {
		// console.log('history changed', msg)


		// console.log(msg.history[0].title);
		// console.log(msg.history);

		content.href = msg.history.url;

		// content.innerText = (msg.history[0].date);
		// console.log(msg.history[i].url);


		for (let i = 0; i < msg.history.length; i++) {


			content.href = msg.history[i].url;
			content.innerText = (msg.history[i].title) + " - " + (msg.history[i].date);


		}
	}


});



// for (let i = 0; i < msg.history.title.length; i++) {
// 	if (lignes[i]) {
// 		for (let j = 0; j < msg.history[i].title.length; j++) {
// 			let info = lignes[i].querySelectorAll('.content');
// 			info[j].childNodes[1].textContent = msg.history[i][j];
// 			console.log(msg.history[i].title.length);


// 		}

// 	} else {
// 		lignes[i] = template.cloneNode(true);
// 		for (let j = 0; j < msg.history[i].title.length; j++) {
// 			let info = lignes[i].querySelectorAll('.content');
// 			info[j].childNodes[1].textContent = msg.history[i][j];


// 		}
// 		document.body.appendChild(lignes[i])
// 	}

// 		// }
// 	}

// });


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