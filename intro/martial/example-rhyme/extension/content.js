// http://esapi.intellexer.com/Home/Help
async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll("h1, h2, h3");

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "");
    console.log(words);
    try {
      let settings = {
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
        data: { id: "snt1", text: words },
      };

      fetch(settings).then(function (r) {
        console.log(r);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});
