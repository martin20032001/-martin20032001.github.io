const video = document.getElementById('video')
const startButton = document.getElementById('start-button')
const gridDiv = document.getElementById("trackingGridDiv")
const trackingDiv = document.getElementById("track")
const trackingButton = document.getElementById("trackButton")
const circlehappy = document.getElementById("circle-happy")
const circleneutral = document.getElementById("circle-neutral")
const circleangry = document.getElementById("circle-angry")
const circlesurprised = document.getElementById("circle-surprised")

var canvas2 = document.getElementById('trackingGridCanvas');
var running = false;
let intervallid = 0
var created = false;
var tracking = false;
var tracked = false;
var second = 0;

var last1h=0;
var last2h=0;
var last3h=0;

var last1n=0;
var last2n=0;
var last3n=0;

var last1s=0;
var last2s=0;
var last3s=0;

var last1a=0;
var last2a=0;
var last3a=0;




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
  var displaySize = { width: video.offsetWidth, height: video.offsetHeight }
  // Die Dimensionen des Canvas an die Anzeigegröße anpassen
  faceapi.matchDimensions(canvas, displaySize)
  intervallid= setInterval(async () => {
    displaySize = { width: video.offsetWidth, height: video.offsetHeight }
    var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    detections.forEach(result => {
      const {expressions} = result
      var happiness = expressions.happy;
      var neutral = expressions.neutral;
      var angry = expressions.angry;
      var surprised = expressions.surprised;
      
      valuehappiness = (happiness+last1h+last2h)/3
      valueneutral = (neutral+last1n+last2n)/3
      valueangry = (angry+last1a+last2a)/3
      valuesurprised = (surprised+last1s+last2s)/3
      
      changefilling(circlehappy,transformresult(valuehappiness),'#ffff00')
      changefilling(circleneutral,transformresult(valueneutral),'#9c958a')
      changefilling(circleangry,transformresult(valueangry),'#fa3434')
      changefilling(circlesurprised,transformresult(valuesurprised),'#e809bf')

      
      last2h = last1h
      last1h = happiness

      last2n = last1n
      last1n = neutral
      
      last2a = last1a
      last1a = angry

      last2s = last1s
      last1s = surprised
      
       
      
      
    })
    
    
  }, 1)
  }
  
})

function transformresult(value){
  if (value > 1){
    value = 0
  } else if (value < 0.00001){
    value = 0
  }
  return value
}

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
    running=true;
    startVideo();
    trackingDiv.style.visibility="hidden"
    startButton.innerHTML="Stop"
    trackingDiv.style.visibility="visible"

  } else{
    running = false;
    trackingDiv.style.visibility="hidden"
    startButton.innerHTML="Start"
    gridDiv.style.visibility="hidden"
  
    stopVideo();
    tracking=false;
    if (tracked) {
      tracked=false;
      var button = new bootstrap.Button(trackingButton)
      button.toggle()
    }
    
  }
}); 

trackingButton.addEventListener('click', function(){
  if (!tracking){
      tracking=true;
      gridDiv.style.visibility="visible"
      tracked=true;
  } else{
    tracking=false;
    tracked=false;
    gridDiv.style.visibility="hidden"
  }
  
}); 

function changefilling(kreis, i, farbe){
  
  i = i*100
  
  s = 'linear-gradient(0deg, '+farbe+' '+i.toString().slice(0, 4)+'%, #3f48cc00 0%)';
  console.log(s)
  kreis.style.background = s;
}






