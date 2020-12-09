chrome.extension.onMessage.addListener(async (msg, sender, sendResponse) => {

  if (msg.action === "clickButtons") {
    await waitForDocumentReady();

    let state = await searchAndClick("a");

    await delay(1000);
    requestNextAction();

  }
});

async function searchAndClick(selector) {

  const hyperlinks = document.querySelectorAll(selector);

  if (hyperlinks.length === 0) return false;

  const randomIndex = Math.floor(Math.random() * hyperlinks.length);
  const randomHyperlink = hyperlinks[randomIndex];

  //console.log(hyperlinks);

  console.log(randomHyperlink);

  randomHyperlink.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });

  await waitForScrollEnd();
  
  randomHyperlink.classList.add("wanderer--highlight");

  await delay(500);
  
  randomHyperlink.click();

  return true;
}
function requestNextAction() {
  chrome.runtime.sendMessage({action: "requestNextAction"});
}


function waitForDocumentReady() {
  return new Promise((resolve) => {
    let readyStateCheckInterval;
    setInterval(() => {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        resolve();
      }
    }, 10);
  });
}

async function delay(millis = 0) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, millis);
  });
}

function waitForScrollEnd() {
  return new Promise((resolve) => {
    var scrollTimeout = createTimeout(resolve);
    addEventListener("scroll", function (e) {
      clearTimeout(scrollTimeout);
      scrollTimeout = createTimeout(resolve);
    });
  });

  function createTimeout(resolve) {
    return setTimeout(function () {
      console.log("Scroll ended");
      resolve();
    }, 100);
  }
}
