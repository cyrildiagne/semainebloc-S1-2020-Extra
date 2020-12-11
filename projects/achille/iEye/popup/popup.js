init();

async function init() {

    let background = chrome.extension.getBackgroundPage();
    let stream = await background.getStreamCanvas();

    document.querySelector('#webcamVideo').srcObject = stream;
}