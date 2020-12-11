let API_ENABLED = true;

const API =
  "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/859fb5db-f129-43a7-98a0-a0ac29c1e31e";
const IBM_KEY = "0MhYqSM5Ebi_dwxFchPJr3pplMazhoyFxF-5y4cIQ8n0";

let newDiv;
let numOfPosts = 0;
let COL_CONTAINER;

document.body.classList.add("tone--background-overwrite");

async function processArticle(article) {
  let tone;

  if (API_ENABLED) {
    article.innerText.replace(/[^a-zA-Z0-9 ]/g, "");
    numOfPosts++;
    // newDiv = document.createElement("div");
    // document.body.appendChild(newDiv);
    // newDiv.classList.add("base-div");
    // var randomColor = Math.floor(Math.random() * 5);
    // newDiv.classList.add("tone--" + randomColor);
    try {
      if (article.length != 0) {
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("apikey:" + IBM_KEY));
        const url =
          API + "/v3/tone?version=2017-09-21&text=" + article.innerText;
        const resp = await fetch(url, {
          method: "GET",
          headers: headers,
        }).then((r) => r.json());

        tone = resp.document_tone.tones[0].tone_id;
        console.log(tone);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    let tones = ["anger", "joy", "analytical", "confident", "scared", ""];
    let index = Math.floor(tones.length * Math.random());
    tone = tones[index];
  }

  return tone;
}

function processElem(elem) {
  elem.querySelectorAll('[role*="article"]').forEach(async (article) => {
    if (article.className.includes("tone--checked")) return;

    article.classList.add("tone--checked");
    let tone = await processArticle(article);
    addColumnTone(tone);
  });
}

function addColumnTone(tone) {
  const colors = {
    anger: "#ff0000",
    analytical: "#6BCC94",
    joy: "#FAB40D",
    confident: "#483BD6",
    sadness: "#2F0038",
    tentative: "#119178",
    undefined: "rgb(230, 230, 230)",
  };

  let color = colors[tone];

  let colElem = document.createElement("div");
  colElem.classList.add("tone--column");
  if (tone != "undefined") {
    colElem.style.setProperty("--bgColor", color);
  }
  COL_CONTAINER.appendChild(colElem);
}

function initGrid() {
  COL_CONTAINER = document.createElement("div");
  COL_CONTAINER.classList.add("blend", "tone--container");
  document.body.appendChild(COL_CONTAINER);
}

function runApp() {
  processElem(document.body);

  // // Add mutation observer to launch process everytime a new item is added.
  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((elem) => {
        if (!("querySelectorAll" in elem)) {
          return;
        }
        processElem(elem);
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
chrome.runtime.onMessage.addListener((message, sender, callback) => {
  switch (message.action) {
    case "run":
      initGrid();
      runApp();
      break;
    case "show-background":
      COL_CONTAINER.classList.remove("blend");

      break;
  }
});
