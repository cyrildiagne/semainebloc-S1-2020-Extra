console.log('hello from js in popup.js');
const bt = document.querySelector(".btn-gameover");
bt.addEventListener('click',buttonClicked);

function buttonClicked() {
    let msg = {
      txt: 'hello',
    };
    chrome.runtime.sendMessage(msg);
  }