const video = document.getElementById('video')
const startButton = document.getElementById('start-button')

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

var running = false;
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

video.addEventListener('play', () => {

  if (!created){
  created =true

  setInterval(async () => {
    var detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    
    detections.forEach(result => {
    const {expressions} = result
    var happiness = expressions.happy;
    var neutral = expressions.neutral;
    var angry = expressions.angry;
    var surprised = expressions.surprised;
    var sad = expressions.sad;
    var disgusted = expressions.disgusted;

    changefilling(circleHappy,transformresult(happiness),colorHappy)
    changefilling(circleNeutral,transformresult(neutral),colorNeutral)
    changefilling(circleAngry,transformresult(angry),colorAngry)
    changefilling(circleSurprised,transformresult(surprised),colorSurprised)
    changefilling(circleSad,transformresult(sad),colorSad)
    changefilling(circleDisgusted,transformresult(disgusted),colorDisgusted)


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
    changefilling(circleAngry,100,colorAngry)
    changefilling(circleHappy,100,colorHappy)
    changefilling(circleNeutral,100,colorNeutral)
    changefilling(circleSurprised,100,colorSurprised)
    startButton.innerHTML="Start"
    stopVideo();

  }
}); 

//Ändert die Farbe und die Füllung des Kreises abhängig von i
function changefilling(kreis, i, farbe){
  i = i*100
  s = 'linear-gradient(0deg, '+farbe+' '+i.toString().slice(0, 4)+'%, #3f48cc00 0%)';
  kreis.style.background = s;
}







