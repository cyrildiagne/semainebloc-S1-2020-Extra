let currentURL;
let pointsCounter;
let stage;

const answerInput = document.querySelector('.answer');
const btOk = document.querySelector('.bt-ok');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const stageEl = document.querySelector('.stage');

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      console.log('POPUP STARTED');
      start();
    }
  }, 10);
});

chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('received messsage', request)
  if (request.score) {
    scoreEl.innerText = request.score;
  }
});

function start() {
  chrome.runtime.sendMessage({ event: 'get_url' }, (url) => {
    currentURL = url;
    console.log(url);
    
    stage=1;
    stageEl.innerText = stage + '/10';
   
    
  });

  btOk.addEventListener('click', (ev) => {
    answer = answerInput.value.toLowerCase();

    console.log(`anwser given: ${answer} (correct url: ${currentURL})`);

    if (currentURL.includes(answer)) {
      console.log('GOOD ANSWER!');
      messageEl.innerHTML = 'GOOD ANSWER!';
      chrome.extension.sendMessage({ event: 'win' }, (response) => {
        const nextURL = response.url;
        scoreEl.innerText = response.score;
        messageEl.innerHTML = '';
        answerInput.value = '';
        currentURL = nextURL;
        stage++;
        stageEl.innerText = stage + '/10';
        console.log(stage);
        
      });
    } else {
      console.log('BAD ANSWER!');
      messageEl.innerHTML = answer + ' = Bad Answer ';
      answerInput.value = '';
    }
  });
}
