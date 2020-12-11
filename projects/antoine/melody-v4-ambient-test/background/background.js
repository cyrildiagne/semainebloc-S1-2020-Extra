const TABS = {};

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    switch (msg.action) {
      case "postUpdated":
        let tabId = msg.tabId;

        if (!TABS[tabId]) {
          TABS[tabId] = {
            port,
            index: 0,
            posts: [],
            synth: "triangle",
          }; //new tab
        }

        TABS[tabId].posts = msg.posts;
        TABS[tabId].synthType = msg.synthType;

        break;
    }
  });
});

function onClicked(tab) {
  const message = { action: "run" };
  chrome.tabs.sendMessage(tab.id, message);
}

setupAudio();

chrome.browserAction.onClicked.addListener(onClicked);

function setupAudio() {
  Tone.Transport.scheduleRepeat(repeatAudio, "8n");
  Tone.Transport.start();
}

function playTab(tabId, time) {
  let { index, posts } = TABS[tabId];
  let post = posts[index];

  TABS[tabId].port.postMessage({ action: "playNote", tabId, tonePlaying: post.tonePlaying });
  TABS[tabId].index = (index + 1) % posts.length;

  console.log('playtab');
}

function repeatAudio(time) {

  

  for (let tabId of Object.keys(TABS)) {
    playTab(tabId, time);
  }
}
