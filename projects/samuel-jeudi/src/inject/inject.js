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

function updateMap(history) {
  const offset = {};
  let currOffset = 0;

  for (let page of history) {
    let content = document.createElement('a');
    // console.log(page.url);
    content.href = page.url;
    content.innerText = page.title + ' - ' + page.date;
    content.classList.add('content');
    canvas.appendChild(content);

    const url = new URL(content.href);
    console.log(url);

    if (!offset[url.hostname]) {
      offset[url.hostname] = currOffset + 'px';
      currOffset += 300;
    }
    content.style.left = offset[url.hostname];
  }

  // let newUrl = urlCheck;
  // if (oldurl != urltest) {
  //   console.log("ok");
  //   // content.style.left = "400px"
  // }
}

button.addEventListener('click', function (e) {
  if (document.body.classList.contains('blur-on')) {
    document.body.classList.remove('blur-on');
    canvas.remove();
    button.style.background = 'rgba(0,0,0)';
    button.style.color = 'rgba(255,255,255)';
    button.style.setProperty(
      '-webkit-filter',
      'drop-shadow(0 0 0.0rem rgb(0, 0, 0))'
    );
  } else {
    document.body.classList.add('blur-on');
    document.body.appendChild(canvas);
    button.style.background = 'rgba(255,255,255)';
    button.style.color = 'rgba(0,0,0)';
    button.style.setProperty(
      '-webkit-filter',
      'drop-shadow(0 0 0.50rem rgb(0, 0, 0))'
    );
  }
});

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action == 'historychange') {
    updateMap(msg.history);
  }
});
