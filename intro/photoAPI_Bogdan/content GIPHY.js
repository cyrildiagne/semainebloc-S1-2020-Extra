const API = "https://api.giphy.com/v1/gifs/search";
const API_KEY = "wxuhNMkYnc2MMvTAjUYCfH5TNPBqyS3D";

async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("h1, h2, h3");

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

    // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();
    const url = API + "?api_key=" + API_KEY + "&q=" + lastWord;

    if (lastWord == "") {
      continue;
    }

    try {
      // Get the rhyming lyrics using the API.
      const resp = await fetch(url).then((r) => r.json());
      console.log(resp);

      // Get random image from JSON
      const gifUrl = resp.data[0].images.original.url;

      //ADD GIF AS IMAGE
      const img = new Image();
      img.src = gifUrl;
      img.alt = lastWord;
      h.appendChild(img);
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
