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

/*const video = document.querySelector('#webcamVideo');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
])



 video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
}) */