chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      // console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------
    }
  }, 10);
});

// let lignes = [];
// let template = document.querySelector('.canvas');

const canvas = document.createElement('div');
canvas.classList.add('canvas');

// Add show map button
const button = document.createElement('button');
button.classList.add('button');
button.innerText = 'SHOW MAP';
document.body.appendChild(button);

// var linkText = document.createTextNode('my title text');
// content.title = "my title text";

// var body = document.body;

function createMap(history) {
  console.log('createmap');
  for (const page of history) {
    const content = document.createElement('a');
    content.href = page.url;
    content.innerText = page.title + ' - ' + page.date;
    content.classList.add('content');
    canvas.appendChild(content);
  }
}

button.addEventListener('click', function (e) {
  // body.classList.add("blur");

  if (document.body.classList.contains('blur-on')) {
    document.body.classList.remove('blur-on');
    canvas.remove();
  } else {
    document.body.classList.add('blur-on');
    document.body.appendChild(canvas);
  }
});
// console.log("testdiv");

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log('onmessage', msg)
  if (msg.action == 'historychange') {
    // console.log('history changed', msg)

    // console.log(msg.history[0].title);
    // console.log(msg.history);

    // content.href = msg.history.url;

    // content.innerText = (msg.history[0].date);
    // console.log(msg.history[i].url);

    createMap(msg.history);
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
