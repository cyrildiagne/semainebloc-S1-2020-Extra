console.log("hey4");

const API =
  "https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/476ca0f2-89d3-41fa-ac02-b0d27eee4c9f";
const IBM_KEY = "6qpjSzQdGXjQ_5Wf2RmGbpLSx4IUnPnUkhZxeb6yjrBv";

// let divs = document.body.getElementsByTagName("div");
// let title = document.body.getElementsByTagName("h1, h2, h3");
// let imgs = document.body.getElementsByTagName("img");
// let svgs = document.body.getElementsByTagName("svg");
// let headers = document.body.getElementsByTagName("header");
// let twiClassBg = document.getElementsByClassName("r-yfoy6g");
// let col1 = "rgb(12, 12, 12)";

document.body.classList.add("tone--background-overwrite");

var observer = new MutationObserver((records) => {
  records.forEach((record) => {
    record.addedNodes.forEach((elem) => {
      if (!("querySelectorAll" in elem)) return;

      elem.querySelectorAll('[role*="article"]').forEach((article) => {
        
        if(article.className.includes('tone--'))
          return;

        article.classList.add('tone--background-overwrite');
        article.classList.add('tone--angry');

      });
    });
  });
});

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});

// setTimeout(() => {
//   document.body.querySelectorAll('[role*="article"]').forEach(elem => {
//     console.log(elem);
//   })
// }, 2000)
// // document.body.style.setProperty('--bgColor', 'red');

// for (const t1 of twiClassBg) {
//   t1.style.backgroundColor = col1;
// }
// for (const d of divs) {
//   d.classList.add("bgColor");
// }
// for (const i of imgs) {
//   i.classList.add("noImg");
// }
// for (const s of svgs) {
//   s.classList.add("noSvg");
// }
// for (const h of headers) {
//   h.classList.add("bgColor");
// }

// async function run() {
//   // Get all headers.
//   let para = document.body.querySelectorAll("div.css-901oao");

//   for (const p of para) {
//     // remove non alphanumeric characters.
//     const words = p.innerText.replace(/[^a-zA-Z0-9 ]/g, "");

//     try {
//       // Get the rhyming lyrics using the API.
//       if (words.length == 0) {
//         continue;
//       }

//       let headers = new Headers();
//       headers.append("Authorization", "Basic " + btoa("apikey:" + IBM_KEY));
//       const url = API + "/v3/tone?version=2017-09-21&text=" + words;
//       const resp = await fetch(url, {
//         method: "GET",
//         headers: headers,
//       }).then((r) => r.json());

//       if (resp.document_tone?.tones?.length != 0) {
//         console.log(p.innerText);
//         console.log(resp.document_tone.tones[0].tone_id);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }

// Listen for background script message when the button has been clicked.
// chrome.runtime.onMessage.addListener((message, sender) => {
//   if (message.action == "run") {
//     run();
//   }
// });
