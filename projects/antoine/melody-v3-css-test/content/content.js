let TAB_ID = Date.now().toString();

let ID = 0;

let SYNTHTYPE = "triangle";

let NOTES = {
  Negative: "Eb1",
  Positive: "C3",
  Neutral: "G3",
  Outside: "B3",
};


const port = chrome.runtime.connect({ name: "tab-synth" });
port.onMessage.addListener(function (msg) {



  if (msg.tabId !== TAB_ID)
    return;

  if (msg.action === "playNote") {

    // console.log(msg);

    let tonePlaying = msg.tonePlaying;

    let elem = document.querySelector(`[data-toneplaying="${tonePlaying}"]`);

    let active = elem.classList.contains("tone--active");
    let note = elem.dataset.tonenote;


    if (active) playNote(SYNTHTYPE, note);
  }

});


const API_KEY = "dd7c38c7-9a46-48b3-8b78-0696a284771f";
deepai.setApiKey(API_KEY);

async function run() {
  // getPosts();

  let ps = document.body.querySelectorAll("p");

  for (const p of ps) {
    if (p.innerText == "") {
      continue;
    }
    //   //GET TEXT WITH API
    try {
      //     //REDUCE TEXT API OK
      //     // const resp = await deepai.callStandardApi('summarization', {
      //     //   text: p.innerText,
      //     // });

      //     //SENTIMENT TEXT API OK
      //     //REPONSE = respSen.output
      // let respSen = await deepai.callStandardApi("sentiment-analysis", {
      //   //TEST LOCAL TEXT OK
      //   // text: "Today, the One Planet Sovereign Wealth Funds has demonstrated that reinforced cooperation between global financial actors is key to accelerate the path to a net zero economy and implement the Paris Agreement. Your announcement on Task Force on Climate-related Financial Disclosures recommendations is a pivotal moment. I count on all members, sovereign wealth funds, asset managers, private equity firms to continue to use their collective power and ambition to accelerate the financing of the ecological transition and mitigate climate change.",
      //   text: p.innerText,
      // });
      // if (respSen.output == "Negative") {
      //   console.log("Negative FILTER");
      // } else if (respSen.output == "Positive") {
      //   console.log("Positive FILTER");
      // } else if (respSen.output == "Neutral") {
      //   console.log("Neutral FILTER");
      // } else {
      //   console.log("OUTSIDE FILTER BUG");
      // }

      //     // console.log(p.innerText + " ==  " + respSen.output);
      //     //END

      //     //CLICK TO SET UP SOUNDSCAPE
      //     document.documentElement.addEventListener("mousedown", () => {
      //       if (Tone.context.state !== "running") Tone.context.resume();
      //     });
      //     //END SET UP
    } catch (e) {
      //     console.log(e);
    }
    //   //END GET TEXT WITH API
  }
  return
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});

async function analyseText(e) {
  // console.log(e) 
  let respSen = await deepai.callStandardApi("sentiment-analysis", {
    text: e,

  });
  // console.log(respSen.output.length);
  let negM = 0;
  let posM = 0;
  let neuM = 0;
  for (let index = 0; index < respSen.output.length - 1; index++) {
    let elMoyenne = respSen.output[index];

    if (elMoyenne == "Negative") {
      negM++;
    } else if (elMoyenne == "Positive") {
      posM++;
      // console.log("Positive FILTER");
    } else if (elMoyenne == "Neutral") {
      neuM++;
      // console.log("Neutral FILTER");
    } else {
      // console.log("OUTSIDE FILTER BUG");
    }

  }
  //MOYENNE FAKE
  let eValue = "Outside";
  if (negM > posM && negM > neuM) {
    // console.log("Negative FILTER");
    eValue = "Negative";
  }
  if (posM > 0) {
    // console.log("Positive FILTER");
    eValue = "Positive";
  } else if (neuM > posM && neuM > negM) {
    eValue = "Outside";
    // console.log("Neutral FILTER");
  }
  // console.log("eValue "+eValue+" negM "+negM +" posM "+posM+" neuM "+neuM);  

  return eValue;
}

function analyseNewPosts() {
  let posts = document.querySelectorAll("[data-urn]");
  posts.forEach(async (post) => {
    if (isNewTextPost(post)) {
      let description = post.querySelector('[class*="commentary"]');
      setListener(post);
      let output = await analyseText(description.textContent);
      console.log(post);
      let note = NOTES[output];
      post.dataset.tonenote = note;
      console.log(output);
      post.classList.toggle(output);
      // console.log(description, description.textContent);
    }
  });
}

function setListener(post) {
  post.addEventListener("mouseenter", () => {
    // post.classList.toggle("tone--active");
    $(post).toggleClass("tone--active");
    post.classList.toggle("artdeco-card");
    post.classList.toggle("full-height");
    let activePosts = getAllPlayingPosts();
    port.postMessage({
      tabId: TAB_ID,
      action: "postUpdated",
      posts: activePosts,
      synthType: SYNTHTYPE,
    });
  });
}

function getAllPlayingPosts() {
  let posts = Array.from(document.querySelectorAll("[data-toneplaying]"));

  return posts.map((post) => {
    return {
      tonePlaying: post.dataset.toneplaying,
      active: post.classList.contains("tone--active"),
      note: post.dataset.tonenote,
    };
  });
}

function isNewTextPost(post) {
  if (post.dataset.toneplaying) return false;
  if (!post.querySelector('[class*="commentary"]')) return false;

  post.dataset.toneplaying = ID;
  ID++;

  return true;
}

const observer = new MutationObserver((records) => {
  records.forEach((record) => {
    record.addedNodes.forEach((elem) => {
      analyseNewPosts();
    });
  });
});

observer.observe(document.body, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});
