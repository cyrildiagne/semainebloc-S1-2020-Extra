// function onClicked(tab) {
//   const message = { action: 'run' };
//   chrome.tabs.sendMessage(tab.id, message);
// }

// // Send a message to the content script when button is clicked.
// chrome.browserAction.onClicked.addListener(onClicked);


let contrast = [100, 150];
let index = 1;
   
function doBlur(blur = 0, contrast = 100) {
  document.body.style.cssText = /*back ticks, template strings */ `
    filter: contrast(${contrast}%) blur(${blur}px) !important;
`;

}

let elem = placeButton('HERE', 'game-button');

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

  let filter = '*:not(script):not(.link):not(img):not(a):not(b)';

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
  console.log(message.txt);
  if (message.txt === 'hello') {
    doBlur();
    alert("Better one eye than quite blind. Right? Try again.");
  }
}

// document.body.

// console.log('hello from content.js');
// //document.body.style.transform="rotate(1deg)";

// // const ps = document.body.querySelectorAll("p");
// // for (const p of ps) {
// //     p.style.transform="rotate(90deg)";
// // }

// const ps = document.body.getElementsByTagName("p");
// for (const p of ps) {
//     p.classList.add('custom-p');
// }

// const hs1 = document.body.getElementsByTagName("h1");
// for (const h of hs1) {
//     h.classList.add('custom-h');
// }

// const hs2 = document.body.getElementsByTagName("h2");
// for (const h of hs2) {
//     h.classList.add('custom-h');
// }

// const hs3 = document.body.getElementsByTagName("h3");
// for (const h of hs3) {
//     h.classList.add('custom-h');
// }

// const as = document.body.getElementsByTagName("a");
// for (const a of as) {
//     a.classList.add('custom-a');
// }

// const imgs = document.body.getElementsByTagName("img");
// for (const img of imgs) {
//    // img.style.transform="rotate(45deg)";
//     img.classList.add('custom-img');
// }

// const lis = document.body.getElementsByTagName("li");
// for (const li of lis) {
//    // img.style.transform="rotate(45deg)";
//     li.classList.add('custom-li');
// }

// const spans = document.body.getElementsByTagName("span");
// for (const span of spans) {
//    // img.style.transform="rotate(45deg)";
//     span.classList.add('custom-span');
// }

// const tds = document.body.getElementsByTagName("td");
// for (const td of tds) {
//    // img.style.transform="rotate(45deg)";
//     td.classList.add('custom-td');
// }

// const ths = document.body.getElementsByTagName("th");
// for (const th of ths) {
//     th.classList.add('custom-th');
// }

// const buttons = document.body.getElementsByTagName("button");
// for (const button of buttons) {
//     button.classList.add('custom-button');
// }

// // const divs = document.body.getElementsByTagName("div");
// // for (const div of divs) {
// //    // img.style.transform="rotate(45deg)";
// //     div.classList.add('custom-div');
// // }

// const labels = document.body.getElementsByTagName("label");
// for (const label of labels) {
//     label.classList.add('custom-label');
// }

// const is = document.body.getElementsByTagName("i");
// for (const i of is) {
//     i.classList.add('custom-i');
// }

// const texts = document.body.getElementsByTagName('#text');
// for (const text of texts) {
//     text.classList.add('custom-text');
// }
