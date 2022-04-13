//See if the browser supports Service Workers, if so try to register one
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(function(registering) {
        // Registration was successful
        console.log("Browser: Service Worker registration is successful with the scope", registering.scope);
    }).catch(function(error) {
        //The registration of the service worker failed
        console.log("Browser: Service Worker registration failed with the error", error);
    });
} else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
}

var $ = document.getElementById.bind(document);

var orientKey = 'orientation';
if ('mozOrientation' in screen) {
  orientKey = 'mozOrientation';
} else if ('msOrientation' in screen) {
  orientKey = 'msOrientation';
}

var target = $('logTarget');
var device = $('device');
var orientationTypeLabel = $('orientationType');

//Functie activate gif
document.getElementById("startButton").addEventListener("click", playgif);
document.getElementById("continueButton").addEventListener("click", playgif);
document.getElementById("menu").addEventListener("click", hamburger);
document.getElementById("popContinue").addEventListener("click", vervolg);
document.getElementById("popupquit").addEventListener("click", quit);
document.getElementById("quityes").addEventListener("click", backtostart);
document.getElementById("quitno").addEventListener("click", backtomenu);

let menuswitch = document.getElementById("hamburgermenu");
let popmenu = document.getElementById("popupmenu");
let quitbutton = document.getElementById("quityesno");
let quitbutton2 = document.getElementById("popupquit");

//Startup values and classes
let opacitymenu = 0;
let popswitch = 0;
let quitmenu = 0;



if (opacitymenu == 0) {
    menuswitch.classList.add("hamburgerHide")
    menuswitch.classList.remove("hamburgerShow")
}

if (popswitch == 0) {
    popmenu.classList.remove("popShow")
    popmenu.classList.add("popHide")
}

if (quitmenu == 0) {
    quitbutton.classList.remove("quitShow")
    quitbutton.classList.add("quitHide")
}

function playgif() {
    menuswitch.classList.remove("hamburgerHide")
    menuswitch.classList.add("hamburgerShow")
    document.getElementById('buttonsdiv').style.display = "none"
}

function hamburger() {
    popmenu.classList.add("popShow")
    popmenu.classList.remove("popHide")
    menuswitch.classList.add("hamburgerHide")
    menuswitch.classList.remove("hamburgerShow")
    quitbutton.classList.add("quitHide")
    quitbutton.classList.remove("quitShow")
}

function vervolg() {
    popmenu.classList.remove("popShow")
    popmenu.classList.add("popHide")
    menuswitch.classList.remove("hamburgerHide")
    menuswitch.classList.add("hamburgerShow")
}

function quit() {
    quitbutton.classList.remove("quitHide")
    quitbutton.classList.add("quitShow")
}

function backtostart() {
    window.location.href = 'https://justfocus.netlify.app/';
}

function backtomenu() {
    quitbutton.classList.remove("quitShow")
    quitbutton.classList.add("quitHide")
}

//hieronder zit de scripts voor het geanimeerd lopen met de sprite

//sprite bepalen en laden
let img = new Image();
img.src = 'images/lopen2.png';
img.onload = function() {
    init();
};
 
//sprite op canvas zetten met goede frame
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let touch;
 
const scale = 1;
const width = 255;
const height = 255;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
 
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

//we hebben 26 frames voor het lopen
const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

let currentLoopIndex = 0;
let frameCount = 0;
 
 //touch event, touchstart is je vinger op het scherm is, touchend is als je vinger niet meer op het scherm is
document.getElementById("canvas").addEventListener("touchstart", function (){touch = true});
document.getElementById("canvas").addEventListener("touchend", function (){touch = false});


 //sprite laten lopen als het scherm aangeraakt wordt
function step() {

  if (touch){
    frameCount++; 
    if (frameCount < 4) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
  }
  //als er niet meer op het scherm gedrukt wordt, dan maakt hij het scherm leeg en zet de eerste frame op het canvas
  else
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[0], 0, 0, 0);
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);

}
 
function init() {
  window.requestAnimationFrame(step);
}