/*jshint esversion: 8 */
const video = document.getElementById('video');
const startButton = document.getElementById('start-button');
const backButton = document.getElementById('backButton');

const circleHappy = document.getElementById("circle-happy");
const circleNeutral = document.getElementById("circle-neutral");
const circleAngry = document.getElementById("circle-angry");
const circleSurprised = document.getElementById("circle-surprised");
const circleSad = document.getElementById("circle-sad");
const circleDisgusted = document.getElementById("circle-disgusted");

const colorAngry = '#fa3434';
const colorSurprised ='#e809bf';
const colorHappy = '#ffff00';
const colorNeutral ='#9c958a';
const colorSad = '#091fe8';
const colorDisgusted ='#36e809';

const imgNeutral="neutral.png";
const imgHappy="happy.png";
const imgSad="sad.png";
const imgDisgusted="disgusted.png";
const imgSurprised="surprised.png";
const imgAngry="angry.png";

const homeSite = "index.html";

var running = false;
var created = false;

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

//startet das Tracking
video.addEventListener('play', () => {
  if (!created){
    created =true;

    setInterval(async () => {
      var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      
      //Extrahieren der einzelnen Emotionswerte
      detections.forEach(result => {
      const {expressions} = result;
      var happiness = expressions.happy;
      var neutral = expressions.neutral;
      var angry = expressions.angry;
      var surprised = expressions.surprised;
      var sad = expressions.sad;
      var disgusted = expressions.disgusted;

      //ändern des Füllzustandes des Smilesy abhänig dert bereinigten Werte
      changefilling(circleHappy,transformresult(happiness),colorHappy, imgHappy);
      changefilling(circleNeutral,transformresult(neutral),colorNeutral, imgNeutral);
      changefilling(circleAngry,transformresult(angry),colorAngry, imgAngry);
      changefilling(circleSurprised,transformresult(surprised),colorSurprised, imgSurprised);
      changefilling(circleSad,transformresult(sad),colorSad, imgSad);
      changefilling(circleDisgusted,transformresult(disgusted),colorDisgusted, imgDisgusted);
      });
    }, 100);
  }
});

//Transformiert die Daten, da es zu Ausreisern kommen kann
function transformresult(value){
  if (value > 1){
    value = 0;
  } else if (value < 0.00001){
    value = 0;
  }
  return value;
}

//Stopt das Video und den Zugridd auf die Kamera
function stopVideo() {
  let video = document.querySelector('video'); 
  let stream = video.srcObject; 

  if (stream) {
    let tracks = stream.getTracks(); 
    tracks.forEach(track => track.stop()); 
    video.srcObject = null;
  }
}

//startet alles
startButton.addEventListener('click', function(){
  if (!running){
    running=true;
    startVideo();
    startButton.innerHTML="Stop";
    startButton.disabled=true;
    setTimeout(function(){startButton.disabled = false;},100);
  } else{
    // füllt alle smileys auf, damit es besser aussieht
    changefilling(circleAngry,100,colorAngry, imgAngry);
    changefilling(circleHappy,100,colorHappy, imgHappy);
    changefilling(circleNeutral,100,colorNeutral, imgNeutral);
    changefilling(circleSurprised,100,colorSurprised, imgSurprised);
    changefilling(circleSad,100,colorSad, imgSad);
    changefilling(circleDisgusted,100,colorDisgusted, imgDisgusted);
    running = false;
    startButton.innerHTML="Start";
    stopVideo();
  }
}); 

//Ändert die Farbe und die Füllung des Kreises abhängig von i
function changefilling(kreis, i, farbe, smileimg){
  i = i*100;
  var s = 'url('+smileimg+'), linear-gradient(0deg, '+farbe+' '+i.toString().slice(0, 4)+'%, #3f48cc00 0%)';
  kreis.style.background = s;
  kreis.style.backgroundSize= 'cover';
}


backButton.addEventListener('click', function(){
  if (running){
    stopVideo();
  }
  window.location.href = homeSite;
}); 