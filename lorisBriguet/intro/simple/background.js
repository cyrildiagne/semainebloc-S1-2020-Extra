function onClicked(tab) {
  console.log(tab);
}
chrome.browserAction.onClicked.addListener(onClicked);
