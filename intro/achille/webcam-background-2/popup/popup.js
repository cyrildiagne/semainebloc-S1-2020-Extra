init();

async function init() {

    let background = chrome.extension.getBackgroundPage();
    let stream = await background.getStreamVideo();

    document.querySelector('#webcamVideo').srcObject = stream;
}