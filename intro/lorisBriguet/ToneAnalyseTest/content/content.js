console.log("hey4");

const API =
  "https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/476ca0f2-89d3-41fa-ac02-b0d27eee4c9f";
const IBM_KEY = "6qpjSzQdGXjQ_5Wf2RmGbpLSx4IUnPnUkhZxeb6yjrBv";

document.body.classList.add("tone--background-overwrite");

async function processArticle(article) {
  if (article.className.includes("tone--")) {
    return;
  }

  article.classList.add("tone--background-overwrite");
  article.classList.add("tone--text-visibility");
  article.innerText.replace(/[^a-zA-Z0-9 ]/g, "");

  try {
    if (article.length != 0) {
      let headers = new Headers();
      headers.append("Authorization", "Basic " + btoa("apikey:" + IBM_KEY));
      const url = API + "/v3/tone?version=2017-09-21&text=" + article.innerText;
      const resp = await fetch(url, {
        method: "GET",
        headers: headers,
      }).then((r) => r.json());
      console.log(resp.document_tone.tones[0].tone_id);
      let tone = resp.document_tone.tones[0].tone_id;

      if (resp.document_tone?.tones?.length != 0) {
        if (tone == "angry") {
          article.classList.add("tone--angry");
        } else if (tone == "confident") {
          article.classList.add("tone--conf");
        } else if (tone == "joy") {
          article.classList.add("tone--joy");
        } else if (tone == "tentative") {
          article.classList.add("tone--tentative");
        } else if (tone == "analytical") {
          article.classList.add("tone--analytical");
        } else if (tone == "sadness") {
          article.classList.add("tone--sadness");
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function processElem(elem) {
  elem.querySelectorAll('[role*="article"]').forEach(processArticle);

  elem.querySelectorAll("img").forEach((image) => {
    if (image.className.includes("tone--")) {
      return;
    }

    image.style.backgroundImage = "none";
    image.style.style.background = "none";
    image.style.backgroundUrl = "none";
    console.log(image);
  });

  elem.querySelectorAll("div").forEach((div) => {
    if (div.className.includes("tone--")) return;
    //div.classList.add("tone--image-delete");
    // console.log(div);
  });
}

async function run() {
  // Process all elements currently on the DOM.
  processElem(document.body);

  // Add mutation observer to launch process everytime a new item is added.
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
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});
