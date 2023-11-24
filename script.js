const faceTrackButton = document.getElementById("faceTrack");
const trackSite = 'track.html';

const emotionTrackButton = document.getElementById("emotionTrack");
const emotionSite = 'showemotions.html';

const emotionGameButton = document.getElementById("emotionGame");
const emotionGameSite = 'emotionGame.html';


faceTrackButton.addEventListener('click', function(){
    window.location.href = trackSite;
}); 

emotionTrackButton.addEventListener('click', function(){
  window.location.href = emotionSite;
}); 

emotionGameButton.addEventListener('click', function(){
  window.location.href = emotionGameSite;
}); 