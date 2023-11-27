/*jshint esversion: 8 */
const faceTrackButton = document.getElementById("faceTrack");
const trackSite = 'track.html';

const emotionTrackButton = document.getElementById("emotionTrack");
const emotionSite = 'showemotions.html';

const emotionGameButton = document.getElementById("emotionGame");
const emotionGameSite = 'emotionGame.html';

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

//Wenn Google Chrome nicht verwendet wird soll ein alert erscheinen.
if (isIOSChrome) {
   //Google Chrome auf iOS
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
   //Google CHrome sonst
} else { 
   // kein Google Chrome 
   alert("Please use Google Chrome to ensure full functionality of all features. Using a different browser may result in the webcam not functioning properly");
}

//Funktionen der Buttons
faceTrackButton.addEventListener('click', function(){
  window.location.href = trackSite;
}); 

emotionTrackButton.addEventListener('click', function(){
window.location.href = emotionSite;
}); 

emotionGameButton.addEventListener('click', function(){
window.location.href = emotionGameSite;
}); 
