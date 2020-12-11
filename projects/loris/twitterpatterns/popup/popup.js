chrome.browserAction.setBadgeText({ text: "ON" });
chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });

const activateBt = document.getElementById("activate");
const screenshotBt = document.getElementById("screenshot");

activateBt.addEventListener("click", onActivateBtClick);
screenshotBt.addEventListener("click", onExportBtClick);

function onActivateBtClick() {
  chrome.runtime.sendMessage({ action: "run" });
  console.log("message sent");
}

function onExportBtClick() {
  chrome.runtime.sendMessage({ action: "export" });
  console.log("message sent");
}
