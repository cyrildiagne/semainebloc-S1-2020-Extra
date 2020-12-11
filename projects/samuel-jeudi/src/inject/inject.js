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
// button.innerText = '';
document.body.appendChild(button);

// var linkText = document.createTextNode('my title text');
// content.title = "my title text";

// var body = document.body;

function createMap(history) {
  for (let page of history) {
    let content = document.createElement('a');
    // console.log(page.url);
    content.href = page.url;
    content.innerText = page.title + ' - ' + page.date;
    content.classList.add('content');
    canvas.appendChild(content);

    let urlCheck = [page.url]
    // let urlCheck = page.url;
    let newUrl = urlCheck;

    console.log(urlCheck);
  }


  // let newUrl = urlCheck;
  // if (oldurl != urltest) {
  //   console.log("ok");
  //   // content.style.left = "400px"
  // }
}

// function changeUrl(history) {
//   for (const page of history) {
//     const content = document.createElement('a');
//     console.log("bullecrée");
//     // content.style.left = "40px"
//     content.href = page.url;
//     content.innerText = page.title + ' - ' + page.date;
//     content.classList.add('content');
//     canvas.appendChild(content);
//   }
// }

button.addEventListener('click', function (e) {
  // body.classList.add("blur");

  if (document.body.classList.contains('blur-on')) {
    document.body.classList.remove('blur-on');
    canvas.remove();
    button.style.background = "rgba(0,0,0)";
    button.style.color = "rgba(255,255,255)";
    button.style.setProperty("-webkit-filter", "drop-shadow(0 0 0.0rem rgb(0, 0, 0))");


  } else {
    document.body.classList.add('blur-on');
    document.body.appendChild(canvas);
    button.style.background = "rgba(255,255,255)";
    button.style.color = "rgba(0,0,0)";
    button.style.setProperty("-webkit-filter", "drop-shadow(0 0 0.50rem rgb(0, 0, 0))");




  }
});

// console.log("testdiv");

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
  // console.log('onmessage', msg)

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