initCamera();

function initCamera() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {

                chrome.runtime.sendMessage({action: "webcam activated"}, (response) => {
                    
                });

                stream.getTracks().forEach(track => {
                    track.stop();
                });
            })
            .catch(e => console.log(e));
    }
}