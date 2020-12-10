console.log('background script running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    let msg ={
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}

//doit get message contenant les valeurs de la fonction doBlur(); afin de les rééinjecter et les incréementer