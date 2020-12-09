// DeepAI API KEY
// console.log("linkedin ok")
const API_KEY = 'dd7c38c7-9a46-48b3-8b78-0696a284771f';
deepai.setApiKey(API_KEY);
async function run() {
  // console.log("linkedin ok")
  let ps = document.body.querySelectorAll('p');
  
  for (const p of ps) {
    // console.log(ps);
    if (p.innerText == '') {
      continue;
    }

    try {
      const resp = await deepai.callStandardApi('summarization', {
        text: p.innerText,
      });
      console.log(resp);
     
      // h.dataset['rhyme'] = rhyme;
    } catch (e) {
      console.log(e);
    }
   
  }
  // return
}

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});
