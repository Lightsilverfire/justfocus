//Voor elk blok dat wordt aangemaakt komt in de for loop
let selector = document.querySelectorAll(".blok");
for (let i = 0; i < selector.length; i++) {
    //De funtie voor het blok wordt aangeroepen wanneer er op geklikt wordt
    selector[i].addEventListener("touchstart", savePosition);
    //De funtie voor het blok wordt aangeroepen wanneer de muis losgelaten wordt
    selector[i].addEventListener("touchend", clearPosition);
}

function savePosition(event) {
    console.log("Locatie opslaan");
    //aanmaken van een element waar geklikt wordt
    let element = event.target;
    let location = element.getBoundingClientRect();
    //slaat de locatie van het plaatje op wanneer erop geklikt wordt
    element.dataset.x = location.left;
    element.dataset.y = location.top;
    //gaat verder naar deze functie
    element.addEventListener("touchmove", moveBlok);
}

function moveBlok(event) {
    console.log("Bewegen element");
    //kijkt naar de beweging van de muis
    let delta_x = event.clientX || event.changedTouches[0].clientX;
    let delta_y = event.clientY || event.changedTouches[0].clientY;
    let element = event.target;
    //nieuwe locatie aangeven waarnaar het plaatje beweegt
    let location = element.getBoundingClientRect();
    element.style.left = (location.left + delta_x) + "px";
    element.style.top = (location.top + delta_y) + "px";
}

function clearPosition(event) {
    console.log("Locatie resetten");
    //het terug gaan naar de beginpositie die is opgeslagen
    let element = event.target;
    element.style.left = event.target.dataset.x + "px";
    element.style.top = event.target.dataset.y + "px";
    element.dataset.times++;
    //wanneer er drie keer een gedachte wordt gesleept dan komt er een functie
    if (element.dataset.times >= 3) {
        Visible();
        element.dataset.times = 0;
    }
    //verwijderen van waardes om restwaarde te voorkomen
    element.removeAttribute("data-x");
    element.removeAttribute("data-y");
    element.removeEventListener("touchmove", moveBlok);
}

var makeVisible = 0;
//Testen of je na 3x drukken makeVisible waarden kan aanpassen.
function Visible() {
    makeVisible++;
    if (makeVisible == 1) {
        document.getElementById("two").style.visibility = "visible";
    }
    if (makeVisible == 2) {
        document.getElementById("three").style.visibility = "visible";
    }
    if (makeVisible == 3) {
        document.getElementById("four").style.visibility = "visible";
    }
    if (makeVisible == 4) {
        document.getElementById("five").style.visibility = "visible";
    }
    if (makeVisible == 5) {
        alert("gedachtes vol");
    }
}