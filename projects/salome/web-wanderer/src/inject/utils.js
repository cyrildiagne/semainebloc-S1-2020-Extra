// function requestNextAction() {
//   console.log('request next action')
//   chrome.runtime.sendMessage({action: "requestNextAction"});
// }

function waitForDocumentReady() {
  return new Promise((resolve) => {
    let readyStateCheckInterval;
    setInterval(() => {
      if (document.readyState === 'complete') {
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
    addEventListener('scroll', function (e) {
      clearTimeout(scrollTimeout);
      scrollTimeout = createTimeout(resolve);
    });
  });

  function createTimeout(resolve) {
    return setTimeout(function () {
      console.log('Scroll ended');
      resolve();
    }, 100);
  }
}
