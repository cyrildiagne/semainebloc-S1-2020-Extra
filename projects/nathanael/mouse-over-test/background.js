console.log("hi I run in background")

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("button clicked !")
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
    console.log("asf")
    let all = document.body.getElementsByTagName("*");
    console.log(all);
    for (e in all) {
        e.style.backgroundColor = "tomato";
    }
}