const API = "https://pixabay.com/api/";
const API_KEY = "8609708-a661654ee4e5cad9c12571d32";

async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("h1, h2, h3");
  let idTest = document.getElementById("searchform");

  /*
  for (const h of idTest) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

    // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord == "") {
      continue;
    }

    try {
      // Get the rhyming lyrics using the API.
      const url = API + "?key=" + API_KEY + "&q=" + lastWord;
      console.log(url);

      const resp = await fetch(url).then((r) => r.json());
      // console.log(resp);

      // Get random image from JSON
      const photoURL = resp.data.hits[0].webformatURL;
      console.log(photoURL);

      //ADD GIF AS IMAGE
      const img = new Image();
      img.src = photoURL;
      img.alt = lastWord;
      h.appendChild(img);
    } catch (e) {
      console.log(e);
    }
  }
  */

  const url = API + "?key=" + API_KEY + "&q=" + lastWord;
  const resp = await fetch(url).then((r) => r.json());

  const photoURL = resp.data.hits[0].webformatURL;
  const img = new Image();
  idTest.img.src = photoURL;
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});

