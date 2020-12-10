// VALUE


console.log("linkedin ok")
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
      //REDUCE TEXT API
      // const resp = await deepai.callStandardApi('summarization', {
      //   text: p.innerText,
      // });
      // console.log(resp);

    let respSen = await deepai.callStandardApi("sentiment-analysis", {
            text: "Today, the One Planet Sovereign Wealth Funds has demonstrated that reinforced cooperation between global financial actors is key to accelerate the path to a net zero economy and implement the Paris Agreement. Your announcement on Task Force on Climate-related Financial Disclosures recommendations is a pivotal moment. I count on all members, sovereign wealth funds, asset managers, private equity firms to continue to use their collective power and ambition to accelerate the financing of the ecological transition and mitigate climate change.",
    });
    console.log(respSen.output);
    
      

      // h.dataset['rhyme'] = rhyme;
    } catch (e) {
      console.log(e);
    }

  }
  // return
}

//mission impossible theme GO!!!
(function audioTest() {
  const synth = new Tone.MembraneSynth().toMaster();
  // null is equal to rest
  const notes = ["G2", [null, "G2"], null, "Bb2", "C3", "G2", [null, "G2"], null, "F2", "F#2", "F2"];
  const synthPart = new Tone.Sequence(function (time, notes) {
    synth.triggerAttackRelease(notes, "10hz", time);
  }, notes, "8n");
  synthPart.start();


  /** Play Controls **/
  let playing = false;

  let img = document.getElementsByTagName("presence-entity");

  for (let i = 0; i < img.length; i++) {
    // img[i].classList.add("imgRot");
    // console.log(img[i].classList.add("imgRot"));

  }
  $(".artdeco-card").mouseenter(function () {

    Tone.Transport.start();
    console.log("insinde");
    // playing = true;

  });
  $(".artdeco-card").mouseout(function () {
    // Tone.Transport.stop();
    console.log("outside");
    // playing = false;
  });
  // document.querySelector("body").addEventListener("click", function(){ 
  // document.querySelector(".presence-entity").addEventListener("click", function(){ 
  // if(!playing){
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

      if (!("matches" in elem))
        return;

      if (elem.matches('[data-id*="urn:li:activity"]')) {
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