const video = document.getElementById('video')
const startButton = document.getElementById('start-button')
const noDetection = document.getElementById('noDetection')
const backButton = document.getElementById('backButton')

const circleHappy = document.getElementById("circle-happy")
const circleNeutral = document.getElementById("circle-neutral")
const circleAngry = document.getElementById("circle-angry")
const circleSurprised = document.getElementById("circle-surprised")
const circleSad = document.getElementById("circle-sad")
const circleDisgusted = document.getElementById("circle-disgusted")

const colorAngry = '#fa3434'
const colorSurprised ='#e809bf'
const colorHappy = '#ffff00'
const colorNeutral ='#9c958a'
const colorSad = '#091fe8'
const colorDisgusted ='#36e809'

const imgNeutral="neutral.png"
const imgHappy="happy.png"
const imgSad="sad.png"
const imgDisgusted="disgusted.png"
const imgSurprised="surprised.png"
const imgAngry="angry.png"

const homeSite = "index.html"

var running = false;
var created = false;

var happiness=0;
var neutral=0;
var angry=0;
var surprised=0;
var sad=0;
var disgusted=0;

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
    err => noPermission()
  )
}

function noPermission(){
  
  alert("Give access to the camera")
  window.location.href = 'showemotions.html';
  
}


video.addEventListener('play', () => {

  if (!created){
  created =true

  setInterval(async () => {
    var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    
    detections.forEach(result => {
    const {expressions} = result
    happiness = expressions.happy;
    neutral = expressions.neutral;
    angry = expressions.angry;
    surprised = expressions.surprised;
    sad = expressions.sad;
    disgusted = expressions.disgusted;

    changefilling(circleHappy,transformresult(happiness),colorHappy, imgHappy)
    changefilling(circleNeutral,transformresult(neutral),colorNeutral, imgNeutral)
    changefilling(circleAngry,transformresult(angry),colorAngry, imgAngry)
    changefilling(circleSurprised,transformresult(surprised),colorSurprised, imgSurprised)
    changefilling(circleSad,transformresult(sad),colorSad, imgSad)
    changefilling(circleDisgusted,transformresult(disgusted),colorDisgusted, imgDisgusted)

    
    })
  }, 100)
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
    startButton.innerHTML="Stop"
    startButton.disabled=true;
    setTimeout(function(){startButton.disabled = false;},100);
  } else{
    running = false;
    changefilling(circleAngry,100,colorAngry, imgAngry)
    changefilling(circleHappy,100,colorHappy, imgHappy)
    changefilling(circleNeutral,100,colorNeutral, imgNeutral)
    changefilling(circleSurprised,100,colorSurprised, imgSurprised)
    changefilling(circleSad,100,colorSad, imgSad)
    changefilling(circleDisgusted,100,colorDisgusted, imgDisgusted)
    startButton.innerHTML="Start"
    stopVideo();

  }
}); 

//Ändert die Farbe und die Füllung des Kreises abhängig von i
function changefilling(kreis, i, farbe, smileimg){
  i = i*100
  s = 'url('+smileimg+'), linear-gradient(0deg, '+farbe+' '+i.toString().slice(0, 4)+'%, #3f48cc00 0%)';
  kreis.style.background = s;
  kreis.style.backgroundSize= 'cover';
}

backButton.addEventListener('click', function(){
  if (running){
    stopVideo();
  }
  window.location.href = homeSite;

}); 

window.onload = function() {
  window.scrollTo(0, document.body.scrollHeight);
};





