// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function onClicked(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("src/popup/popup.html"),
    type: "popup",
    focused: true,
  });
}

chrome.browserAction.onClicked.addListener(onClicked);

chrome.runtime.onInstalled.addListener(scheduleAlarm);



function scheduleAlarm() {
  var params = {
    delayInMinutes: 1,
    periodInMinutes: 0.1
  }
  chrome.alarms.create("helloooooo", params);
}

// Now add a function for when the alarm is triggered
chrome.alarms.onAlarm.addListener(alarmEvent);

// What to do when the alarm is triggered
function alarmEvent() {
  let modal = document.createElement("div");

  modal.classList.add("modal");

  body.appendChild(modal);
  // return modal;
  modal.style.display = "block";

  
  // There is metadata associated with the alarm
  console.log(modal);
}

