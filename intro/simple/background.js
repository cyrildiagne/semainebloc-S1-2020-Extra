function onClicked(tab) {
    console.log(tab + "hello");
}

chrome.browserAction.onClicked.addListener(onClicked);