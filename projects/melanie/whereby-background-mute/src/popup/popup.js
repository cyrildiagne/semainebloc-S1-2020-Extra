let currentURL;
let pointsCounter;

const answerInput = document.querySelector('.answer');
const btOk = document.querySelector('.bt-ok');
const messageEl = document.querySelector('.message');

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      console.log('POPUP STARTED');
      start();
    }
  }, 10);
});

function start() {
  chrome.runtime.sendMessage('getURL', (url) => {
    currentURL = url;
  });

  btOk.addEventListener('click', (ev) => {
    answer = answerInput.value.toLowerCase();
    console.log(`anwser given: ${answer} (correct url: ${currentURL})`);
    if (currentURL.indexOf(answer) > -1) {
      console.log('GOOD ANSWER!');
      messageEl.innerHTML = 'GOOD ANSWER!';
      chrome.extension.sendMessage('win', (nextURL) => {
        messageEl.innerHTML = '';
        answerInput.value = '';
        currentURL = nextURL;
      });
    } else {
      console.log('BAD ANSWER!');
      messageEl.innerHTML = 'Bad Answer ' + answer;
      answerInput.value = '';
    }
  });

}


