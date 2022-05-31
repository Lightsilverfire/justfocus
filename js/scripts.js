//Service worker functies
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

//hieronder staan alle click elementen
document.getElementById("startButton").addEventListener("click", start);
document.getElementById("menu").addEventListener("click", hamburger);
document.getElementById("popupquit").addEventListener("click", quit);
document.getElementById("popContinue").addEventListener("click", continueButton);
document.getElementById("quityes").addEventListener("click", backtostart);
document.getElementById("quitno").addEventListener("click", backtomenu);
document.getElementById("Enterschool").addEventListener("click", loadingScene);
document.getElementById("endGameButton").addEventListener("click", endGame);
document.getElementById("back").addEventListener("click", backtostart);
document.getElementById('startbutton').addEventListener('click', startbar)
document.getElementById('tap').addEventListener('click', touchFocus);
document.getElementById("footerbar").addEventListener("touchstart", function() { touch = true });
document.getElementById("footerbar").addEventListener("touchend", function() { touch = false });

//hieronder staan alle constantes
const scale = 1; //dit is voor op welke scale de spritesheet getoont moet worden
const width = 255; //widht is de breedte van één afbeelding in de spritesheet
const height = 255; //height is de hoogte van één afbeelding in de spritesheet
const scaledWidth = scale * width; //dit is de gescalde breedte van de afbeelding
const scaledHeight = scale * height; //dit is de gescalde hoogte van de afbeelding
const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const progressBar = document.getElementsByClassName('progress-bar')[0];

//hieronder staan alle let variabelen die we gebruiken
let menuswitch = document.getElementById("hamburgermenu");
let popmenu = document.getElementById("popupmenu");
let quitbutton = document.getElementById("quityesno");
let quitbutton2 = document.getElementById("popupquit");
let character = document.getElementById("canvas");
let invisiblelay = document.getElementById("invisiblelayer");
let infotext = document.getElementById("textfooter");
let background = document.getElementById("background");
let mainmenu = document.getElementById("mainmenu");
let logo = document.getElementById("logodiv");
let menuschool = document.getElementById("fieldmenuschool");
let loading = document.getElementById("loadingscreen");
let backgroundImg = document.getElementById("backgroundImg");
let goingsit = document.getElementById("goingsit");
let teacher = document.getElementById("teacher");
let startfocus = document.getElementById("startmenu");
let teacherimage = document.getElementById("teacherimg");
let footer = document.getElementById("footerbar");
let taptofocus = document.getElementById("tap");
let textmenu = document.getElementById('textmenu');
let breakingFocusText = document.getElementById('wrapper');
let endScreen = document.getElementById('endScreen');
let texttaphere = document.getElementById("taphere");
let hands = document.getElementById("hands");
let grayedOut = document.getElementById("grayedOut");
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let textlogo = document.getElementById("logodiv2");
let goingSitImage = document.getElementById("goingsitimg");
let northenlight = document.getElementById("Northenlight");
let divlight = document.getElementById("Northenlightdiv");
let topfooter = document.getElementById("topfooter");

let currentLoopIndex = 0;
let frameCount = 0;
let x = 0;
let tapcount = 0;
let focus = 1.5;
let touch;
let magBewegen = true;
let achtergrondCheck = true;
let secondgray = false;
let fgameOver = true;
let frustrated = true;
let sendOut = true;
let img = new Image();

//hieronder de dingen die niet op het hoofdmenu te zien moeten zijn
menuswitch.classList.add("hamburgerHide")
menuswitch.classList.remove("hamburgerShow")
popmenu.classList.remove("popShow")
popmenu.classList.add("popHide")
quitbutton.classList.remove("quitShow")
quitbutton.classList.add("quitHide")
img.src = 'images/lopen.png'; // sprite bepalen
img.onload = function() { init() }; //sprite laden

//dit is de functie van het laadscherm
function loadingScene() {
    background.style.display = "none";
    menuschool.style.display = "none";
    loading.style.display = "flex";
    backgroundImg.style.left = "0px";
    x = 0;
    achtergrondCheck = false;
    magBewegen = true;
    northenlight.style.animation = "changeLight 10s forwards";
    backgroundImg.src = "./images/classroom.png";
    backgroundImg.className = "scene2";
    document.getElementById("backgroundImg").setAttribute("id", "scene2");

    //dit laat het laadscherm weer verdwijnen
    let laadscherm = setInterval(function() {
        clearInterval(laadscherm);
        document.getElementById("loadingscreen").remove();
        background.style.display = "block";
        infotext.style.display = "block";
        grayedOut.style.display = "none";
        secondgray = false;
        //interval van ongeveer 6000 nodig
    }, 1);
}

//deze functie laat het eindscherm zien van de app
function endGame() {
    background.style.display = "none";
    goingsit.style.display = "none";
    teacher.style.display = "none";
    startfocus.style.display = "none";
    progressBar.style.display = "none";
    taptofocus.style.display = "none";
    textmenu.style.display = "none";
    breakingFocusText.style.display = "none";
    endScreen.style.display = "flex";
    loading.style.display = "flex";
}

//startknop op het hoofdmenu
function start() {
    menuswitch.classList.remove("hamburgerHide")
    menuswitch.classList.add("hamburgerShow")
    document.getElementById('buttonsdiv').style.display = "none"
    infotext.style.display = "block"
    backgroundImg.style.display = "block"
    topfooter.style.display = "block"
    mainmenu.style.background = "none"
    logo.style.display = "none"
    backgroundImg.src = "./images/backgroundwalk.png";
    canvas.style.display = "block";
    textlogo.style.display = "none";
    divlight.style.display = "block";
}



//hamburger menu openen
function hamburger() {
    popmenu.classList.add("popShow")
    popmenu.classList.remove("popHide")
    menuswitch.classList.add("hamburgerHide")
    menuswitch.classList.remove("hamburgerShow")
    quitbutton.classList.add("quitHide")
    quitbutton.classList.remove("quitShow")
    invisiblelay.style.display = "block";
    grayedOut.style.display = "block";
    actionbartutorial.style.display = "block";
}

//dit zorgt ervoor dat je popup menu weer weg gaat als je op continue drukt
function continueButton() {
    popmenu.classList.add("popHide")
    popmenu.classList.remove("popShow")
    menuswitch.classList.add("hamburgerShow")
    menuswitch.classList.remove("hamburgerHide")
    invisiblelay.style.display = "none";
    if (!secondgray) { grayedOut.style.display = "none"; }
    actionbartutorial.style.display = "none";
}

//afsluit knop in pauzescherm laat de yes no knoppen zien, zodat je de app niet per ongelijk afsluit
function quit() {
    quitbutton.classList.remove("quitHide")
    quitbutton.classList.add("quitShow")
    mainmenu.style.background = "none"
}

//quitmenu yes knop zorgt ervoor dat je opnieuw naar de pagina gaat
function backtostart() {
    location.reload();
    canvas.style.display = "none"
    invisiblelay.style.display = "none";
}

// quitmenu no knop zorgt ervoor dat de yes no weg gaat
function backtomenu() {
    quitbutton.classList.remove("quitShow")
    quitbutton.classList.add("quitHide")
}

//hieronder staan de functies voor het animeren van de sprite
//zorgt ervoor dat de frame op de goede plek komt
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

//sprite laten lopen als het scherm aangeraakt wordt
function step() {
    if (touch && magBewegen) {
        // Laat de afbeelding verschuiven op de achtergrond
        if (magBewegen) {
            x--;
            //px is een string die voor de css duidelijk maakt dat het om pixels gaat
            backgroundImg.style.left = x + "px";
            console.log(x)
        }
        // als de x van de afbeelding op -430 komt, dan gaat hij uit de if statement doordat hij magBewegen op 2 zet
        if (x <= -430 && achtergrondCheck) { //-430 is de goede waarde
            magBewegen = false;
            menuschool.style.display = "block";
            grayedOut.style.display = "block";
            secondgray = true;
        }
        if (x <= -505 && !achtergrondCheck) { //-505 is de goede waarde
            magBewegen = false;
            character.style.display = "none";
            goingsit.style.display = "block";
            teacher.style.display = "block";
            teacherimage.src = "./images/DocentV3.gif";
            startfocus.style.display = "block";
            footer.style.display = "none";
            taptofocus.style.display = "flex";
            hands.style.display = "none";
            texttaphere.style.display = "block";
            hands.style.display = "block";
            grayedOut.style.display = "block";
            secondgray = true;
            progressBar.style.display = "flex";
            actionbartutorial.style.display = "block";
            divlight.style.display = "none";
        }

        //frameCount is hoe snel de animatie gaat, hoe lager het getal, hoe sneller de de sprite zal lopen
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
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[0], 0, 0, 0);
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}

//Microgame FOCUS
//Cracked text start
document.getElementById('startbutton').addEventListener('click', function() {
    document.getElementById('crackedtext').classList.add('cracked');
    document.getElementById('crackedtext').style.opacity = 1;
});

//zorgt ervoor dat als je op start microgame drukt dat de progress bar leeg loopt
function startbar() {
    const progressBar = document.getElementsByClassName('progress-bar')[0];
    document.getElementById('startmenu').style.display = "none";
    document.getElementById("startmenu").remove();
    grayedOut.style.display = "none";
    secondgray = false;
    actionbartutorial.style.display = "none";
    goingSitImage.src = "./images/writing.gif";

    setInterval(() => {
        const computedStyle = getComputedStyle(progressBar)
        const width = parseFloat(computedStyle.getPropertyValue('--width'))
            //de snelheid van de progressbar bepalen -.200
        progressBar.style.setProperty('--width', width + -0.02)

        //Wanneer progressbar leeg is naar you lose window
        if (progressBar.style.getPropertyValue('--width') < 0 && fgameOver) {
            gameover();
            if (sendOut) {
                goingSitImage.src = "./images/going-stand.gif";
                sendOut = false;
            }
        }

        //background color van progress rood maken wanneer bijna af
        if (progressBar.style.getPropertyValue('--width') < 40) {
            document.documentElement.style.setProperty('--backgroundcol', 'red');
            if (frustrated) {
                goingSitImage.src = "./images/slamming.gif";
                frustrated = false;
            }
        }
    }, 5)
}


//dit zorgt ervoor dat er meer wordt toegevoegd aan de progres balk als je op de knop drukt
function touchFocus(data) {
    var pageY = data.pageY;
    //kijken of er in het juiste vak wordt gedrukt
    if (pageY > 100) {
        //aantal klikken geregistreerd
        tapcount = tapcount + 1;
        console.log(tapcount);
        addProgresstap();
        const computedStyle = getComputedStyle(progressBar)
        const width = parseFloat(computedStyle.getPropertyValue('--width'));
        progressBar.style.setProperty('--width', width + focus);
    }
}

//dit zorgt ervoor dat als de progres balk leeg is dat je een game over screen krijgt
function gameover() {
    document.getElementById('textmenu').style.display = "block";
    teacher.style.display = "block";
    grayedOut.style.display = "block";
    teacherimage.src = "./images/DocentV3Pointing.gif";
    console.log('game over')
    tapcount = 0;
    fgameOver = false;
    secondgray = true;
}

//dit zorgt ervoor dat je steeds minder toe voegd aan de progres balk
function addProgresstap() {
    //Deze functie haalt er in de tafel van 3 elke keer 0.05 van de focus af
    if (tapcount % 3 == 0) {
        console.log("modulowerkt");
        focus = focus - 0.05;
        if (focus <= 0) {
            focus = 0;
        }
        console.log(focus);
    }
}