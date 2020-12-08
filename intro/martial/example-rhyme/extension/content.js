// http://esapi.intellexer.com/Home/Help
const API =
  'http://api.intellexer.com/analyzeSentiments?apikey=2f2f37cb-5849-4425-b018-e61d2ea7b5af';
async function run() {
  // Get all headers.
  let headers = document.body.querySelectorAll('h1, h2, h3');

  for (const h of headers) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, '');
    console.log(words);
    try {
      let settings = {
        // async: true,
        // crossDomain: true,
        // mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        // processData: false,
        body: JSON.stringify([{ id: 'test', text: words }]),
      };

      fetch(API, settings).then(function (r) {
        console.log(r);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});
