const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("h1, h2, h3");

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const text = h.innerText;
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "");

    // // Get the last word and ensure it's not empty.
    const lastWord = words[words.length - 1].toLowerCase();

    // if (lastWord == "") {
    //   continue;
    // }

    try {
      // Get the rhyming lyrics using the API.
      // const rhyme = await fetch(API + lastWord).then((r) => r.text());
      // Set as dataset attribute. The :before pseudo element will display it.

      // h.dataset["rhyme"] = rhyme;
      var settings = {
        async: true,
        crossDomain: true,
        url:
          "http://api.intellexer.com/sentimentAnalyzerOntologies?apikey=2f2f37cb-5849-4425-b018-e61d2ea7b5af",
        method: "GET",
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
        processData: false,
        data: words,
      };

      fetch(settings).then((r) => console.log(r));

      // $.ajax(settings).done(function (response) {
      //   console.log(response);
      // });
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
