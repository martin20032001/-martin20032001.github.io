const video = document.getElementById('video')
const startButton = document.getElementById('start-button')
const gridDiv = document.getElementById("trackingGridDiv")
const trackingDiv = document.getElementById("track")
const trackingButton = document.getElementById("trackButton")
const homeSite = "index.html"

const canvas2 = document.getElementById('trackingGridCanvas');
var running = false;
var created = false;
var tracking = false;
var tracked = false;


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

video.addEventListener('play', () => {

  if (!created){
    created =true
    canvas = faceapi.createCanvasFromMedia(video)
    canvas2.replaceWith(canvas)

    var displaySize = { width: video.offsetWidth, height: video.offsetHeight }

    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      displaySize = { width: video.offsetWidth, height: video.offsetHeight }
      var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
  }
})

function stopVideo() {
  let video = document.querySelector('video'); 
  let stream = video.srcObject; 

  if (stream) {
    let tracks = stream.getTracks(); 
    tracks.forEach(track => track.stop()); 

  
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

backButton.addEventListener('click', function(){
  if (running){
    stopVideo();
  }
  window.location.href = homeSite;
}); 







