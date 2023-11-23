const video = document.getElementById('video')
const startButton = document.getElementById('start-button')
const trackingDiv = document.getElementById("track")
const trackingButton = document.getElementById("trackButton")
const homeSite = "index.html"
const canvas2 = document.getElementById('trackingGridCanvas');
const trackingGridDiv = document.getElementById('trackingGridDiv');
 
var running = false;
var created = false;
var tracking = false;
var tracked = false;
var currentWidth = 0;


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
    currentWidth = video.offsetWidth

    var displaySize = { width: video.offsetWidth, height: video.offsetHeight }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
      displaySize = { width: video.offsetWidth, height: video.offsetHeight }
      if (resizeCheck(currentWidth, video)) {
        faceapi.matchDimensions(canvas, displaySize)
          currentWidth = video.offsetWidth;
      }
      
      
      var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
  }
})

function resizeCheck(w, video) {
  if (video.offsetWidth != w) {
    return true
  } else {
    return false
  }
    
}

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
    startButton.innerHTML="Stop"
    trackingDiv.style.visibility="visible"

  } else{
    running = false;
    trackingGridDiv.style.visibility="hidden"
    startButton.innerHTML="Start"
    canvas2.style.visibility="hidden"
  
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
      trackingGridDiv.style.visibility="visible"
      tracked=true;
  } else{
    console.log("hi")
    tracking=false;
    tracked=false;
    trackingGridDiv.style.visibility="hidden"
  }
}); 

backButton.addEventListener('click', function(){
  if (running){
    stopVideo();
  }
  window.location.href = homeSite;
}); 







