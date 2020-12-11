console.log("test");

chrome.runtime.onMessage.addListener((msg) => {
    console.log("loaded");
    console.log(msg)
    switch(msg.action) {
        case 'up-on':
            
            R.onKeyDown({keyCode: '38'})
            break;
        case 'up-off':
            
            R.onKeyUp({keyCode: '38'})
            break;
        case 'down-on':
            break;
        case 'down-off':
            break;
    }
})