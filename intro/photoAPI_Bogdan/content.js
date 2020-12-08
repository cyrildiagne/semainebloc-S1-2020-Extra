const API = "https://pixabay.com/api/";
const API_KEY = "8609708-a661654ee4e5cad9c12571d32";

async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("h3");
  let idTest = document.getElementById("searchform");

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

    // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();
    const url = API + "?key=" + API_KEY + "&q=" + lastWord;

    if (lastWord == "") {
      continue;
    }

    try {
      // Get the rhyming lyrics using the API.
      const url = API + "?key=" + API_KEY + "&q=" + lastWord;
      // console.log(url);

      const resp = await fetch(url).then((r) => r.json());
      // console.log(resp.hits[0]);

      const img = new Image();
      img.src = resp.hits[0];
      img.alt = lastWord;
      h.appendChild(img);
      
    } catch (e) {
      console.log(e);
      console.log("it's an error");
    }
  }
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});
