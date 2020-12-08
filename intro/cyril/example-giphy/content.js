// const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
const API = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_KEY = 'wxuhNMkYnc2MMvTAjUYCfH5TNPBqyS3D';

async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll('h1, h2, h3');

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
      const url = API + '?api_key=' + GIPHY_KEY + '&q=' + lastWord;
      const resp = await fetch(url).then((r) => r.json());
      const gifUrl = resp.data[0].images.original.url;

      // Add GIF as image
      const img = new Image();
      img.src = gifUrl;
      img.alt = lastWord;
      h.appendChild(img);

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
