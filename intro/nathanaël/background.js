function onClicked(tab) {
    console.log(tab);
    console.log("LOL")
    for (var i = 0; i < 0; i++) {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            focused: true,
        })
    }
}

chrome.browserAction.onClicked.addListener(onClicked);