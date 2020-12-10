// function answer() {
//   let elem = document.createElement('div');
//   elem.classList.add(`answerSquare`);
//   document.body.appendChild(elem);

//   var y = document.createTextNode('Which website are you surfing on ?');
//   elem.appendChild(y);

//   addAnswer();
//   validationButton();
// }

// function addAnswer() {
//   let addText = document.createElement('div');
//   addText.classList.add(`textDiv`);

//   let write = document.createElement('INPUT');
//   write.setAttribute('fillText', 'textDiv');
//   // document.body.appendChild(write);
//   document.body.appendChild(addText);
// }

// let button = validationButton('I got it !', 'button');

// function validationButton(text) {
//   let button = document.createElement('div');
//   button.classList.add(`button`);
//   button.textContent = text;
//   document.body.appendChild(button);
// }

let currentURL;

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
