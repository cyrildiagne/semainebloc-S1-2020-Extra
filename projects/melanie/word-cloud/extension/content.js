const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";

async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("p, h1, h2, h3,h4,h5,h6");

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
    console.log(words);

    // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord == "") {
      continue;
    }

 
  }
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});





