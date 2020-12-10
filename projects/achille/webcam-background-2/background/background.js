let VIDEO, CANVAS;

window.addEventListener("load", load);

async function load() {
  chrome.extension.getURL("logo.png");

  VIDEO = await enableWebcam();
  // setInterval(e => {
  // console.log(VIDEO.srcObject.getVideoTracks()[0].getSettings().height);
  // }, 100);
  await launchFaceAPI(VIDEO);

  // chrome.runtime.sendMessage({
  //     action: "stream",
  //     data: video.srcObject,
  // });
}

function getStreamCanvas() {
  return new Promise((resolve) => {
    let interval;

    interval = setInterval(() => {
      if (CANVAS) {
        clearInterval(interval);
        resolve(CANVAS.captureStream(60));
      }
    }, 10);
  });
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
    document.body.appendChild(video);
    chrome.runtime.onMessage.addListener(request);
    request();

    function request() {
      requestWebcam(video)
        .then((video) => {
          chrome.extension.onMessage.removeListener(request);
          video.autoplay = true;
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

/*//////////////////////////////////////////////////////////
                  Charger les models 
/////////////////////////////////////////////////////////*/

async function launchFaceAPI(video) {
  //await faceapi.nets.ssdMobilenetv1.loadFromUri("./models");

  // let res = chrome.extension.getURL('background/models')
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
    faceapi.nets.faceExpressionNet.loadFromUri("../models"),
  ]);

  console.log("models loaded");

  let { width, height } = video.srcObject.getVideoTracks()[0].getSettings();

  const canvas = faceapi.createCanvasFromMedia(video);
  CANVAS = canvas;
  document.body.append(canvas);
  const displaySize = { width, height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length) getEyesFromFace(detections[0]);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
}

let EYES = {
  left: null,
  right: null,
};

function getEyesFromFace(face) {
  let newLeftEyePos = face?.landmarks?.getLeftEye();
  let newRightEyePos = face?.landmarks?.getRightEye();

  if (newLeftEyePos) EYES.left = newLeftEyePos;
  if (newRightEyePos) EYES.right = newRightEyePos;
}

/*//////////////////////////////////////////////////////////
      Mise en place Face Detection et Face Landmarks
/////////////////////////////////////////////////////////*/

/*video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
       
        const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100)
}); */

/*//////////////////////////////////////////////////////////
      Récuperer les Face landmarks pour les yeux
/////////////////////////////////////////////////////////*/

/*const landmarkPositions = landmarks.positions
const leftEye = landmarks.getLeftEye();
const rightEye = landmarks.getRightEye();*/

/*//////////////////////////////////////////////////////////
      Créer fonction pour oeil gauche et droite  
/////////////////////////////////////////////////////////*/

/*video.addEventListener('play', () => {
  
  async function leftEyePosition() {
       const landmarks = await faceapi.detectFaceLandmarks(video)
       const leftEye = landmarks.getLeftEye();
       console.log("Left eye position ===>" + JSON.stringify(leftEye));
  }

    async function rightEyePosition() {
       const landmarks = await faceapi.detectFaceLandmarks(video)
       const rightEye = landmarks.getRightEye();
       console.log("right eye position ===>" + JSON.stringify(rightEye));
  }
});*/
