let VIDEO, CANVAS;

let baseY

window.addEventListener('load', load);

async function load() {
  VIDEO = await enableWebcam();

  await launchFaceAPI(VIDEO);
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
    let video = document.createElement('video');
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
            console.log('Option page opened');
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
          'loadedmetadata',
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
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models'),
  ]);

  console.log('models loaded');

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

    if (detections.length) {
      getEyesFromFace(detections[0]);
      newLeftEyePos(detections[0]);
    }

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    //faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
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

  //console.log(EYES.left[3].x);
  //console.log(EYES.left[3].y);
}

// if (isNaN(baseY)) {
//   baseY = EYES.left[3].y
// }

let isDown = false;
let isUp = false;

function newLeftEyePos(face) {
  if (EYES.left[3].x > 250) {
    console.log('left');

    /*chrome.tabs.query({ currentWindow: true }, function (tabsArray) {

      if (tabsArray.length === 1) return;

      let activeTabIndex = null;
      tabsArray.forEach(function (tab, index) {
        if (tab.active === true)
          activeTabIndex = index;
      });
      if(activeTabIndex == 0){
        activeTabIndex = tabsArray.length;
      }

      chrome.tabs.update(tabsArray[(activeTabIndex - 1) % tabsArray.length].id, {
        active: true
      });
    });*/
  }

  if (EYES.left[3].x < 160) {
    console.log('right');

    /* chrome.tabs.query({ currentWindow: true }, function (tabsArray) {
      if (tabsArray.length === 1) return;
      let activeTabIndex = null;
      tabsArray.forEach(function (tab, index) {
        if (tab.active === true)
          activeTabIndex = index;
      });

      chrome.tabs.update(tabsArray[(activeTabIndex + 1) % tabsArray.length].id, {
        active: true
      });
    });*/
  }

  const currDown = EYES.left[3].y > 250;
  if (currDown != isDown) {
    
    const action = currDown ? 'up-on' : 'up-off';
    chrome.tabs.query({ active: true }, function (tabs) {
      console.log('down changed');
      chrome.tabs.sendMessage(tabs[0].id, { action: action });
    });
    isDown = currDown;
  }

  // const currUp = EYES.left[3].y < 210;
  // if (currUp != isUp) {
  //   console.log('up changed');
  //   const action = currUp ? 'up-on' : 'up-off';
  //   chrome.tabs.query({ active: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: action });
  //   });
  //   isUp = currUp;
  // }
}