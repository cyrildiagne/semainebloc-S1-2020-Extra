const API =
  "https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/476ca0f2-89d3-41fa-ac02-b0d27eee4c9f";
const IBM_KEY = "6qpjSzQdGXjQ_5Wf2RmGbpLSx4IUnPnUkhZxeb6yjrBv";

let newDiv;
let numOfPosts = 0;

document.body.classList.add("tone--background-overwrite");

async function processArticle(article) {
  if (article.className.includes("tone--")) {
    return;
  }

  article.classList.add("tone--background-overwrite");
  article.classList.add("tone--text-visibility");
  article.innerText.replace(/[^a-zA-Z0-9 ]/g, "");

  numOfPosts++;

  newDiv = document.createElement("div");
  document.body.appendChild(newDiv);
  newDiv.classList.add("base-div");

  var randomColor = Math.floor(Math.random() * 5);
  newDiv.classList.add("tone--" + randomColor);

  // try {
  //   if (article.length != 0) {
  //     let articleText = article.querySelector("[lang]");
  //     let lang = articleText.getAttribute("lang");

  //     let headers = new Headers();
  //     headers.append("Authorization", "Basic " + btoa("apikey:" + IBM_KEY));
  //     const url =
  //       API + "/v3/tone?version=2017-09-21&text=" + articleText.innerText;
  //     const resp = await fetch(url, {
  //       method: "GET",
  //       headers: headers,
  //     }).then((r) => r.json());

  //     console.log(articleText.innerText, resp);

  //     if (resp.document_tone?.tones?.length != 0) {
  //       let tone = resp.document_tone.tones[0].tone_id;
  //       let cssClass = "tone--" + tone;
  //       article.classList.add(cssClass);
  //     }
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
}

function processElem(elem) {
  elem.querySelectorAll('[role*="article"]').forEach(processArticle);
}

function run() {
  processElem(document.body);

  // // Add mutation observer to launch process everytime a new item is added.
  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((elem) => {
        if (!("querySelectorAll" in elem)) {
          return;
        }
        processElem(elem);
        let divTable = document.querySelectorAll(".base-div");
        let columns = Math.round(Math.sqrt(numOfPosts));
        let rows = Math.ceil(numOfPosts / columns);
        let divWidth = window.innerWidth / divTable.length;
        let divHeight = window.innerHeight / rows;
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);

        for (let i = 0; i < divTable.length; i++) {
          divTable[i].style.width = divWidth + "px";
          divTable[i].style.height = 10 + "vh";
          divTable[i].style.opacity = "0.6";
          divTable[i].style.left = i * divWidth + "px";
        }
      });
    });
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});
