const video = document.getElementById('video')
const startButton = document.getElementById('start-button')
const dd = document.getElementById("test1")

var canvas2 = document.getElementById('gca');
var running = false;
let intervallid = 0
var created = false;

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
  if (!created){
  created =true
  canvas = faceapi.createCanvasFromMedia(video)
  canvas2.replaceWith(canvas)

  // Größe des Anzeigebereichs festlegen
  const displaySize = { width: video.offsetWidth, height: video.offsetHeight }
  // Die Dimensionen des Canvas an die Anzeigegröße anpassen
  faceapi.matchDimensions(canvas, displaySize)
  intervallid= setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
  }
  
})

function stopVideo() {
  let video = document.querySelector('video'); // Holen des Videoelements
  let stream = video.srcObject; // Zugriff auf den Stream

  if (stream) {
    let tracks = stream.getTracks(); // Holen der Tracks des Streams
    tracks.forEach(track => track.stop()); // Stoppen aller Tracks

    // Leeren des Video-Elements und des Stream-Objekts
    video.srcObject = null;
  }
}

startButton.addEventListener('click', function(){
  if (!running){
    running=true
    startVideo();
    dd.style.display="block";
  } else{
    
    dd.style.display="none";
    running = false;
    stopVideo()
  }
  
}); 



