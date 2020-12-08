// const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  iam_apikey: "6qpjSzQdGXjQ_5Wf2RmGbpLSx4IUnPnUkhZxeb6yjrBv",
  url: "https://gateway.watsonplatform.net/tone-analyzer/api",
});

async function run() {
  // Get all para.
  let para = document.body.querySelectorAll("p");

  for (const p of para) {
    // remove non alphanumeric characters.
    const words = p.innerText.replace(/[^a-zA-Z0-9 ]/g, "");

    const toneParams = {
      tone_input: { text: para },
      content_type: "application/json",
    };

    try {
      toneAnalyzer
        .tone(toneParams)
        .then((toneAnalysis) => {
          console.log(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch((err) => {
          console.log("error:", err);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});
