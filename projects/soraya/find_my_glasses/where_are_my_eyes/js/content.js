let contrast = [100, 150];
let index = 1;

function doBlur(blur = 0, contrast = 100) {
  document.body.style.cssText = /*back ticks, template strings */ `
    filter: contrast(${contrast}%) blur(${blur}px) !important;
`;
}

let elem = placeButton('Find me !', 'game-button');

window.addEventListener(
  'click',
  (evt) => {
    if (evt.target !== elem) return;
    elem = undefined;
    win();
  },
  true
);

// doBlur(10, 150);
chrome.runtime.sendMessage({ action: 'getBlur' }, (blurValue) => {
  console.log(blurValue);
  doBlur(blurValue, contrast[2]);
});
//doit envoyer les valeur de doBlur au background pour qu'il les stocke chrome.extension.sendMessage()
//doit récupérer les valeurus stockées dans le background pour les incérementer.

function placeButton(text, subclass) {
  let elem = document.createElement('div');
  elem.classList.add(`custom--${subclass}`);
  elem.textContent = text;

  let filter = '*:not(script):not(.link):not(img):not(a):not(b):not(button):not(.deal-panel)';

  let allDoms = document.body.querySelectorAll(filter);
  let randomDom = allDoms[Math.floor(Math.random() * allDoms.length)];

  //   let allTexts = randomDom.childNodes;
  // let randomText = allTexts[Math.floor(Math.random() * allTexts.length)];

  let selectedContainer;

  //   if (allTexts.length > 0) {
  //     let randomI = Math.floor(Math.random() * allTexts.length);
  //     let randomNode = randomDom.childNodes[randomI];

  //     if("matches" in randomNode && !randomNode.matches(filter))
  //         return placeButton(text, subclass);

  //     if ("append" in randomNode) {
  //       randomNode.append(elem);
  //       //   return elem;
  //       selectedContainer = randomNode;
  //     }
  //   } else {
  //     selectedContainer = randomDom;
  //   }

  selectedContainer = randomDom;

  let bounds = selectedContainer.getBoundingClientRect();

  if (bounds.width < 10 || bounds.height < 10)
    return placeButton(text, subclass);

  if (!selectedContainer?.offsetParent) return placeButton(text, subclass);

  selectedContainer.appendChild(elem);

  return elem;
}

async function win() {
  console.log('FOUND!');

  await delay(400);
  // doBlur(blur[index+1], contrast[2]);
  doBlur();
  console.log('reloading now!');
  await delay(1000);

  chrome.runtime.sendMessage({ action: 'onWin' });
  location.reload();
}

async function delay(millis = 0) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, millis);
  });
}

//tester message
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.action === 'gameover') {
    console.log('game over');
    doBlur();
  }
}
