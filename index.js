let tenTurns = [];
// need all sectors with the respective gradus

// main func - 10 turns game flow 
function turnBasedLoop() {

    const min = 1440;
    const max = 1800;

    let deg = Math.floor(Math.random() * (max - min) + min);


    if (tenTurns.length === 0) {

        rotateWheel(deg);

    } else if (tenTurns.length === 1) {

        rotateWheel(deg);

    } else if (tenTurns.length === 2) {

        rotateWheel(deg);

    } else if (tenTurns.length === 3) {

        rotateWheel(deg);

    } else if (tenTurns.length === 4) {

        rotateWheel(deg);

    } else if (tenTurns.length === 5) {

        rotateWheel(deg);

    } else if (tenTurns.length === 6) {

        rotateWheel(deg);

    } else if (tenTurns.length === 7) {

        rotateWheel(deg);

    } else if (tenTurns.length === 8) {

        rotateWheel(deg);

    } else if (tenTurns.length === 9) {

        rotateWheel(deg);

    } else {

        // reset the the turns

        rotateWheel(deg);
    }

}

function rotateWheel(deg) {

    // need to fil up the turns arr

    let wheel = document.getElementsByClassName("wheel-wrapper")[0];

    wheel.style.transitionTimingFunction = "ease-out";
    wheel.style.transitionDuration = "6s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    // need to update the motion, reset it after a spin

    // display the outcome
}
