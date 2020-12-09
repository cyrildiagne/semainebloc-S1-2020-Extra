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

//mission impossible theme GO!!!
(function audioTest(){ 
  const synth = new Tone.MembraneSynth().toMaster();
  // null is equal to rest
  const notes = ["G2", [null, "G2"], null,"Bb2", "C3", "G2", [null, "G2"], null, "F2", "F#2", "F2"];
  const synthPart = new Tone.Sequence(function(time, notes){
                             synth.triggerAttackRelease(notes, "10hz", time);
                             }, notes, "8n");
  synthPart.start();
  /** Play Controls **/
  // let playing = false;
  // document.querySelector("p").addEventListener("click", function(){ 
  //   if(!playing){
  //     Tone.Transport.start();
  //     playing = true;
  //   }else{
  //     Tone.Transport.stop();
  //     playing = false;
  //   }
  // });
})();

// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});

console.log('yes');

const observer = new MutationObserver((records) => {
  records.forEach((record) => {
    
    record.addedNodes.forEach((elem) => {



    });


    record.addedNodes.forEach((elem) => {

      if(!("matches" in elem))
        return;

      if(elem.matches('[data-id*="urn:li:activity"]')) {
        let post = elem;
        console.log(post);
      }
    });
  });
});

observer.observe(document.body, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});