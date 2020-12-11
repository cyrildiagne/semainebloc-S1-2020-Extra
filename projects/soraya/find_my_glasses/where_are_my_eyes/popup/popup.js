console.log('hello from js in popup.js');
const bt = document.querySelector('.btn-gameover');
bt.addEventListener('click', buttonClicked);

function buttonClicked() {
  let msg = {
    action: 'gameover',
  };
  chrome.runtime.sendMessage(msg);
}
