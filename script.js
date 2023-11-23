const faceTrackButton = document.getElementById("faceTrack");
const trackSite = 'track.html';

const emotionTrackButton = document.getElementById("emotionTrack");
const emotionSite = 'showemotions.html';


faceTrackButton.addEventListener('click', function(){
    window.location.href = trackSite;
}); 

emotionTrackButton.addEventListener('click', function(){
  window.location.href = emotionSite;
}); 