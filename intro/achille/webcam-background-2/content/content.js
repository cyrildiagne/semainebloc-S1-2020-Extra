/*video.addEventListener('play', () => {
    // Create canvas from our video element
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    // Current size of our video
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize);
    // run the code multiple times in a row --> setInterval
    //  async func 'cause it's a async library
    setInterval(async () => {
        // Every 100ms, get all the faces inside of the webcam image to video element
        const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions();
        // boxes will size properly for the video element
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // get 2d context and clear it from 0, 0, ...
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100)
});



const landmarkPositions = landmarks.positions

// only available for 68 point face landmarks (FaceLandmarks68)
const jawOutline = landmarks.getJawOutline();
const nose = landmarks.getNose();
const mouth = landmarks.getMouth();
const leftEye = landmarks.getLeftEye();
const rightEye = landmarks.getRightEye();
const leftEyeBrow = landmarks.getLeftEyeBrow();
const rightEyeBrow = landmarks.getRightEyeBrow();

video.addEventListener('play', () => {
    
    async function leftEyePosition() {
         const landmarks = await faceapi.detectFaceLandmarks(video)
         const leftEye = landmarks.getLeftEye();
         console.log("Left eye position ===>" + JSON.stringify(leftEye));
    }
});*/