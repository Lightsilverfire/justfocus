//sprite bepalen en laden
let img = new Image();
img.src = 'lopen.png';
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
