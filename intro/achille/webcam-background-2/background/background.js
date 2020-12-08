let VIDEO;

window.addEventListener("load", load);

async function load() {
  VIDEO = await enableWebcam();

  // chrome.runtime.sendMessage({
  //     action: "stream",
  //     data: video.srcObject,
  // });
}

function getStreamVideo() {
  return new Promise((resolve) => {
    let interval;

    interval = setInterval(() => {
      if (VIDEO && VIDEO.srcObject) {
        clearInterval(interval);
        resolve(VIDEO.srcObject);
      }
    }, 10);
  });
}

//ask for webcam permissions the first time
function enableWebcam() {
  return new Promise((resolve) => {
    let video = document.createElement("video");
    chrome.runtime.onMessage.addListener(request);
    request();

    function request() {
      requestWebcam(video)
        .then((video) => {
          chrome.extension.onMessage.removeListener(request);
          resolve(video);
        })
        .catch((e) => {
          chrome.runtime.openOptionsPage(() => {
            console.log("Option page opened");
          });
        });
    }
  });
}

//assign webcam and stream
function requestWebcam(video) {
  return new Promise((resolve, reject) => {
    const options = { video: { height: 420 }, audio: false };
    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        video.addEventListener(
          "loadedmetadata",
          (_) => {
            video.play();
            resolve(video);
          },
          { once: true }
        );

        video.srcObject = stream;
      })
      .catch((e) => {
        reject(e);
      });
  });
}
