// const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
const API =
  'https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/476ca0f2-89d3-41fa-ac02-b0d27eee4c9f';
const IBM_KEY = '6qpjSzQdGXjQ_5Wf2RmGbpLSx4IUnPnUkhZxeb6yjrBv';

async function run() {
  // Get all headers.
  let para = document.body.querySelectorAll('p');

  for (const p of para) {
    // remove non alphanumeric characters.
    const words = p.innerText.replace(/[^a-zA-Z0-9 ]/g, '');

    try {
      // Get the rhyming lyrics using the API.
      if (words.length == 0) {
        continue
      }

      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa('apikey:' + IBM_KEY));

      const url = API + '/v3/tone?version=2017-09-21&text=' + words;
      const resp = await fetch(url, {
        method: 'GET',
        headers: headers,
      }).then((r) => r.json());

      if (resp.document_tone?.tones?.length != 0) {
        console.log(p.innerText)
        console.log(resp);
      }
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
