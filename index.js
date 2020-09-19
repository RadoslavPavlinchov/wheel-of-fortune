let tenTurns = [];
// need all sectors with the respective degrees

// wheel sectors - [startDeg, endDeg, prize, sectorHits]
const sectors =
    [
        [ 0, 19, 18, 0 ],
        [ 20, 39, 17, 0 ],
        [ 40, 59, 16, 0 ],
        [ 60, 79, 15, 0 ],
        [ 80, 99, 14, 0 ],
        [ 100, 119, 13, 0 ],
        [ 120, 139, 12, 0 ],
        [ 140, 159, 11, 0 ],
        [ 160, 179, 10, 0 ],
        [ 180, 199, 9, 0 ],
        [ 200, 219, 8, 0 ],
        [ 220, 239, 7, 0 ],
        [ 240, 259, 6, 0 ],
        [ 260, 279, 5, 0 ],
        [ 280, 299, 4, 0 ],
        [ 300, 319, 3, 0 ],
        [ 320, 339, 2, 0 ],
        [ 340, 359, 1, 0 ]
    ];



function resetTenTurnsArr() {
    tenTurns = [];
    turns = tenTurns.length;
}

function fillUpTenTurnsArr(currPos) {
    tenTurns.push(currPos);
    console.log(tenTurns)
    console.log(tenTurns[0])
    console.log(tenTurns[1])
}

function checkDeg(deg) {
    let turns = tenTurns.length;
    if (Math.abs(tenTurns[turns - 1] - deg) >= 0 && Math.abs(tenTurns[turns - 1] - deg) <= 19) {
        return deg += 20;
    }
    return deg;
}


function rotateWheel(deg) {
    let currStatus = document.getElementsByClassName("status")[0];
    currStatus.textContent = "Spinning...";


    // need to fil up the turns arr
    fillUpTenTurnsArr(deg);

    let wheel = document.getElementsByClassName("wheel-wrapper")[0];

    wheel.style.transitionTimingFunction = "ease-out";
    wheel.style.transitionDuration = "6s";
    wheel.style.transform = "rotate(" + deg + "deg)";
    

    deg = parseInt(deg) % 360;

    // need to update the motion, reset it after a spin
    setTimeout(() => { 
        resetWheel(deg) 
    }, 6000);
}

function resetWheel(deg) {
    let wheel = document.getElementsByClassName("wheel-wrapper")[0];

    wheel.style.transitionTimingFunction = "";
    wheel.style.transitionDuration = "0s";
    wheel.style.transform = "rotate(" + deg + "deg)";


    currStatus = document.getElementsByClassName("wheel-wrapper")[0];

    // currStatus.textContent = "Congratulations! You've won!";

    // if ("BONUS") {
    //     currStatus.textContent = "Congratulations! You've won 3 free spins, Enjoy!";
    // } 

}


// main func - 10 turns game flow 
function turnBasedLoop() {

    const min = 1440;
    const max = 1800;

    let deg = Math.floor(Math.random() * (max - min) + min);


    if (tenTurns.length === 0) {

        rotateWheel(deg);

    } else if (tenTurns.length === 1) {

        console.log(deg)
        deg = checkDeg(deg);
        console.log(deg)

        rotateWheel(deg);

    } else if (tenTurns.length === 2) {

        deg = checkDeg(deg);
        rotateWheel(deg);

    } else if (tenTurns.length === 3) {

        rotateWheel((tenTurns[0]));

    } else if (tenTurns.length === 4) {

        deg = checkDeg(deg);
        rotateWheel(deg);

    } else if (tenTurns.length === 5) {

        rotateWheel(tenTurns[1]);

    } else if (tenTurns.length === 6) {

        deg = checkDeg(deg);
        rotateWheel(deg);

    } else if (tenTurns.length === 7) {

        rotateWheel((tenTurns[0]));

    } else if (tenTurns.length === 8) {

        deg = checkDeg(deg);
        rotateWheel(deg);

    } else if (tenTurns.length === 9) {

        deg = checkDeg(deg);
        rotateWheel(deg);

    } else {

        // reset the the turns
        resetTenTurnsArr()
        rotateWheel(deg);
    }

}


