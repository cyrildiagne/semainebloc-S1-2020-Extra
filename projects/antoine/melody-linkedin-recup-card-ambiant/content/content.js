console.log("linkedin ok")
const API_KEY = 'dd7c38c7-9a46-48b3-8b78-0696a284771f';
deepai.setApiKey(API_KEY);
async function run() {
  let ps = document.body.querySelectorAll('p');

  for (const p of ps) {
    if (p.innerText == '') {
      continue;
    }

    try {
      //REDUCE TEXT API OK
      // const resp = await deepai.callStandardApi('summarization', {
      //   text: p.innerText,
      // });
      // console.log(resp);

      //SENTIMENT TEXT API OK
      // let respSen = await deepai.callStandardApi("sentiment-analysis", {
      //         text: "Today, the One Planet Sovereign Wealth Funds has demonstrated that reinforced cooperation between global financial actors is key to accelerate the path to a net zero economy and implement the Paris Agreement. Your announcement on Task Force on Climate-related Financial Disclosures recommendations is a pivotal moment. I count on all members, sovereign wealth funds, asset managers, private equity firms to continue to use their collective power and ambition to accelerate the financing of the ecological transition and mitigate climate change.",
      // });
      // console.log(respSen.output);
      //END

      //SET UP SOUNDSCAPE
      document.documentElement.addEventListener('mousedown', () => {
        if (Tone.context.state !== 'running') Tone.context.resume();
      });
      //END SET UP
    } catch (e) {
      console.log(e);
    }
  }
  // return
}
(function audioTest() {

  //SET UP SYNTH
  const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()];
  synths[0].oscillator.type = 'triangle';
  synths[1].oscillator.type = 'sine';
  synths[2].oscillator.type = 'sine2';
  synths[3].oscillator.type = 'sine3';
  synths[4].oscillator.type = 'triangle2';
  synths[5].oscillator.type = 'sine3';
  synths[6].oscillator.type = 'triangle2';
  //END

  //PLUG GAIN IN AMP
  const gain = new Tone.Gain(0.1);
  gain.toMaster();
  synths.forEach((synth) => synth.connect(gain));
  //END

  // SELECT DIV NOTES
  const rows = document.body.querySelectorAll('div > div'),
    notes = ['G3', 'E3', 'C3', 'A3', 'E2', 'B2', 'D2'];
  let index = 0;
  //END

  // SET UP REPEAT PARTITION
  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.start();
  //END 

  //PLAY OVER NOTES
  $('.artdeco').mouseenter(function () {
    $(this).toggleClass('isOver');
  });

  //LOOP FUNCTION
  //TIME = 120 DEFAULT
  function repeat(time) {
    let step = index % 32;
  
    for (let i = 0; i < rows.length; i++) {
      let synth = synths[i],
        note = notes[i],
        row = rows[i],
        input = row.children[step];
  
      if ($(input).hasClass('isOver')) {
        synth.triggerAttackRelease(note, '8n', time);
      }
    }
    index++;
  }
  //END LOOP

  let img = document.getElementsByTagName("presence-entity");

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
})();
//LISTENER SCROLL LOAD 
//NOT US
// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == 'run') {
    run();
  }
});
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