// function onClicked(tab){
//     console.log(tab);
//     chrome.windows.create({
//         url:chrome.runtime.getURL("popup.html"),
//         type: "popup",
//         focused: true,
//         left:0,
//         top:0,
//     })
// }

// chrome.browserAction.onClicked.addListener(onClicked);
console.log('background script running');


chrome.browserAction.onClicked.addListener(buttonClicked);


function buttonClicked(tab){
    let msg ={
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}