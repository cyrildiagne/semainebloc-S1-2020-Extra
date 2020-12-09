//const API = "https://rhyme-lyrics-dot-gpu-sh.appspot.com/get?w=";
let wordsCounter = [];

let allWords;
async function run() {
  // Get all headers.
  allWords = document.body.querySelectorAll("p, h1, h2, h3,h4,h5,h6");

  // setInterval(function() {
  //   if (i < allWords.length) {
  //     checkIfExist(wordsCounter[i]);
  //   } else {
  //     return false;
  //   }
  //   i++;
  // }, 0);

  for (const h of allWords) {
    // remove non alphanumeric characters and split by ' '.
    const words = h.innerText.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
    console.log(words);

    // Get the last word and ensure it's not empty.
    // const lastWord = words[words.length - 1].toLowerCase();

    // if (lastWord == "") {
    //   continue;
    // }
    
  }
  
}

function checkIfExist(wordToCheck) {
  var needToAdd = true;
  wordsCounter.forEach(function(presentWord) {      //
  console.log(wordToCheck + " ? " + presentWord.word);
    if (wordToCheck == presentWord.word) {
      //console.log("counter++");
      presentWord.counter++;
      needToAdd = false;
      
    }
    console.log(presentWord);
  });
  if (needToAdd) {
    //console.log("add new");
    wordsCounter.push({
      word: allWords[i],
      counter: 0,
    });
    wordsCounter.sort(quantityComparator);
  }
}

function quantityComparator(wordA, wordB) {
  if(wordA.counter<wordB.counter) {
    return 1;
  } else {
    return -1;
  }
  
}
// Listen for background script message when the button has been clicked.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action == "run") {
    run();
  }
});





