let contrast = [100, 150];
let index = 1;

function doBlur(blur = 0, contrast = 100) {
  document.body.style.cssText = /*back ticks, template strings */ `
    filter: contrast(${contrast}%) blur(${blur}px) !important;
`;
}

let elem = placeButton("", "game-button");



// doBlur(10, 150);
chrome.runtime.sendMessage({ action: "getBlur" }, (blurValue) => {
  console.log(blurValue);
  doBlur(blurValue, contrast[2]);

  // requestAnimationFrame(_ => {document.body.classList.remove('game-no-transition')});
});
//doit envoyer les valeur de doBlur au background pour qu'il les stocke chrome.extension.sendMessage()
//doit récupérer les valeurus stockées dans le background pour les incérementer.

async function placeButton(text, subclass) {

  let elem = document.createElement("div");
  elem.classList.add(`custom--${subclass}`);
  elem.textContent = text;

  let filter =
    "*:not(script):not(input):not(.link):not(img):not(a):not(b):not(button):not(.deal-panel)";

  let allDoms = document.body.querySelectorAll(filter);
  let selectedContainer = allDoms[Math.floor(Math.random() * allDoms.length)];

  //   let allTexts = randomDom.childNodes;
  // let randomText = allTexts[Math.floor(Math.random() * allTexts.length)];

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

  if (!selectedContainer) return placeButton(text, subclass);

  // selectedContainer = randomDom;

  let bounds = selectedContainer.getBoundingClientRect();

  let x = bounds.left + Math.random() * bounds.width;
  let y = bounds.top + Math.random() * bounds.height; 

  // if (x < 0 || x > document.body.scrollWidth)
    x = Math.random() * document.body.scrollWidth;

  // if (y < 0 || y > document.body.scrollHeight)
    y = Math.random() * document.body.scrollHeight;

  elem.style.left = x + "px";
  elem.style.top = y + "px";

  // return placeButton(text, subclass);

  // if (!selectedContainer?.offsetParent) return placeButton(text, subclass);

  // // if (!selectedContainer.offsetHeight || !selectedContainer.offsetWidth)
  // // return placeButton(text, subclass);

  document.body.appendChild(elem);

  await delay(1);
  elem.classList.add('make-visible');
  

  window.addEventListener(
    "click",
    (evt) => {
      if (evt.target !== elem) return;
      elem = undefined;
      win();
    },
    true
  );

  return elem;
}

async function win() {
  console.log("FOUND!");

  chrome.runtime.sendMessage({ action: "onWin" });
  document.body.classList.add('game-transition');

  await delay(400);
  // doBlur(blur[index+1], contrast[2]);
  doBlur();
  console.log("reloading now!");
  await delay(1000);

  
  await delay(100);
  window.location.reload();
}

async function delay(millis = 0) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, millis);
  });
}

//tester message
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.action === "gameover") {
    console.log("game over");
    
    doBlur();
  }
}
