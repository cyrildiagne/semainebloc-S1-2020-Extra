// const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
const API = 'https://api.deepai.org/api/summarization ';
const TEXT_SUM_KEY = 'dd7c38c7-9a46-48b3-8b78-0696a284771f';
console.log("TEST 2")
// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
// deepai.setApiKey('dd7c38c7-9a46-48b3-8b78-0696a284771f');
async function run() {
  // Get all headers.

  // var resp = await deepai.callStandardApi("summarization", {
  //   text: "YOUR_TEXT_URL",
  // });
  console.log(resp);
  // let headers = document.body.querySelectorAll('h1, h2, h3');

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, '').split(' ');

    // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord == '') {
      continue;
    }

    try {
      // Get the rhyming lyrics using the API.
      console.log('request');
      // const url = API + '?api_key=' + GIPHY_KEY + '&q=' + lastWord;
      // const resp = await fetch(url).then((r) => r.json());
      // const gifUrl = resp.data[0].images.original.url;

      // Add GIF as image
      // const img = new Image();
      // img.src = gifUrl;
      // img.alt = lastWord;
      // h.appendChild(img);

      // Set as dataset attribute. The :before pseudo element will display it.
      // h.dataset['rhyme'] = rhyme;
    } catch (e) {
      console.log(e);
    }
  }
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});
