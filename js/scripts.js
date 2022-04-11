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

//Functie activate gif
document.getElementById("startButton").addEventListener("click", playgif);
document.getElementById("continueButton").addEventListener("click", playgif);
document.getElementById("hamburgermenu").addEventListener("click", hamburger);
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
    document.getElementById('mainmenu').style.backgroundImage = "url(/images/start.gif)";
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

/*window.location.href = '...';*/