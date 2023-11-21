const video = document.getElementById('video')
const startButton = document.getElementById('start-button')



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
])



function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

// Event-Listener für das Abspielen des Videos hinzufügen
video.addEventListener('play', () => {
  // Canvas-Element erstellen und zum Body hinzufügen
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  // Größe des Anzeigebereichs festlegen
  const displaySize = { width: video.offsetWidth, height: video.offsetHeight }
  // Die Dimensionen des Canvas an die Anzeigegröße anpassen
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

startButton.addEventListener('click', function(){
  startVideo();
}); 




