/*jshint esversion: 8 */
const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const trackingDiv = document.getElementById("track");
const trackingButton = document.getElementById("trackButton");
const homeSite = "index.html";
const canvas2 = document.getElementById('trackingGridCanvas');
const trackingGridDiv = document.getElementById('trackingGridDiv');
const backButton = document.getElementById("backButton");
 
var running = false;
var created = false;
var tracking = false;
var tracked = false;
var currentWidth = 0;

//Laden der Modelle
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]);

//Starten der Kamera, bzw fragen nach Erlaubnis
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => noPermission()
  );
}

//falls keine Erlaubnis erteilt wurde -> alert
function noPermission(){
  alert("Enable camera access permissions");
  window.location.href = 'track.html'; 
}

//startet das video mit dem tracking. Es wird ein canvas erstellt und dann die videogröße angepasst
video.addEventListener('play', () => {
  if (!created){
    created =true;
    canvas = faceapi.createCanvasFromMedia(video);
    canvas2.replaceWith(canvas);

    currentWidth = video.offsetWidth;
    var displaySize = { width: video.offsetWidth, height: video.offsetHeight };
    faceapi.matchDimensions(canvas, displaySize);

    //alle 100ms wird das Gesicht getrackt und das Canvas geupdatet
    setInterval(async () => { 
      displaySize = { width: video.offsetWidth, height: video.offsetHeight };

      //resize des canavs auf das Video falls Größe der Seite geändert wird
      if (video.offsetWidth != currentWidth) {
        faceapi.matchDimensions(canvas, displaySize);
          currentWidth = video.offsetWidth;
      }
      //zusammenbauen der Canvas Inhalte
      var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  }
});



//startet alles, macht video und track button sichtbar
startButton.addEventListener('click', function(){
  if (!running){
    running=true;
    startVideo();
    startButton.innerHTML="Stop";
    trackingDiv.style.visibility="visible";
  } else{ 
    //wenn nochmal gedrückt, dann soll es stoppen
    running = false;
    trackingGridDiv.style.visibility="hidden";
    startButton.innerHTML="Start";
    canvas2.style.visibility="hidden";
    stopVideo();
    tracking=false;

    if (tracked) {
      tracked=false;
      var button = new bootstrap.Button(trackingButton);
      button.toggle();
    }
    trackingDiv.style.visibility="hidden";
  }
}); 

//Wenn das Video gestoppt wird, muss der Track Button ungedrückt und unsichtbar(+video) gemacht werden
function stopVideo() {
  let video = document.querySelector('video'); 
  let stream = video.srcObject; 

  if (stream) {
    let tracks = stream.getTracks(); 
    tracks.forEach(track => track.stop()); 
    video.srcObject = null;
  }
}

//schaltet das Tracking hinzu
trackingButton.addEventListener('click', function(){
  if (!tracking){
      tracking=true;
      trackingGridDiv.style.visibility="visible";
      tracked=true;
  } else{
    console.log("hi");
    tracking=false;
    tracked=false;
    trackingGridDiv.style.visibility="hidden";
  }
}); 

backButton.addEventListener('click', function(){
  if (running){
    stopVideo();
  }
  window.location.href = homeSite;
}); 







