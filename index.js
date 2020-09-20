let tenTurns = [];
// need all sectors with the respective degrees

// wheel sectors - [startDeg, endDeg, prize, sectorHits]
const sectors =
    [
        [0, 19, 18, 0],
        [20, 39, 17, 0],
        [40, 59, 16, 0],
        [60, 79, 15, 0],
        [80, 99, 14, 0],
        [100, 119, 13, 0],
        [120, 139, 12, 0],
        [140, 159, 11, 0],
        [160, 179, 10, 0],
        [180, 199, 9, 0],
        [200, 219, 8, 0],
        [220, 239, 7, 0],
        [240, 259, 6, 0], // BONUS
        [260, 279, 5, 0],
        [280, 299, 4, 0],
        [300, 319, 3, 0],
        [320, 339, 2, 0],
        [340, 359, 1, 0]
    ];



function resetTenTurnsArr() {
    tenTurns = [];
    turns = tenTurns.length;
}

function fillUpTenTurnsArr(currPos) {
    tenTurns.push(currPos);
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

    let currStatus = document.getElementsByClassName("status")[0];

    for (const x of sectors) {
        if (parseInt(deg) >= x[0] && parseInt(deg) <= x[1]) {
            if (x[2] === 6) {
                currStatus.textContent = "Congratulations! You've won 3 free spins, Enjoy!";
            } else {
                currStatus.textContent = "Congratulations! You've " + x[2] + " won!";
            }
        }
    }

}


function getCurrentSector(deg) { // getCurrentSector

    let test = deg - 1440;

    test = parseInt(test / 10);

    for (const sector of sectors) {

        let startDeg = sector[0]
        let endDeg = sector[1];

        startDeg = parseInt(startDeg / 10);
        endDeg = parseInt(endDeg / 10);

        if (startDeg === test || endDeg === test) {
            return sector[2];
        }

    }
}

function modifyAsPerLastSector(deg) {
    if (deg + 20 >= 1800) {
        return deg -= 20
    }
    if (deg - 20 <= 1440) {
        return deg += 20
    }
    return deg += 20;
}


function hitSector(sector) {
    let finder = sectors.find(x => x[2] === sector)
    return finder[3]++;
}

// Global Variables
let condition1 = false;
let condition2 = false;
let condition4 = false;

let x2Sector;
let x3Sector;

let oneHitsArr;


// Conditions
function lock2XAnd3XTogether(sector) { // -------------- Condition 1 --------------------
    //  CHECKS OUR CURRENT SECTOR IF IT IS HIT 2x Times and there is a sector that is already on 2 hits as well

    let currentSector = sectors.find(x => x[2] === sector);
    let differentSectorsArr = sectors.filter(x => x[3] === 2);
    //contains the two 2x sectors up until now and then we select the second, to guarantee that it currentSector and differentSector are different

    if (currentSector[3] === 2 && differentSectorsArr[1] && currentSector[2] !== differentSectorsArr[1][2]) {
        return true
    }
    return false;
}

function lock3xSingle(sector) { // -------------- Condition 2 --------------------
    let currentSector = sectors.find(x => x[2] === sector);
    let differentSectorsArr = sectors.filter(x => x[3] === 2);
    //contains the two 2x sectors up until now and then we select the second, to guarantee that it currentSector and differentSector are different

    if (currentSector[3] === 2 && differentSectorsArr[1] && currentSector[2] !== differentSectorsArr[1][2]) {
        return true;
    }
    return false;
}

function check1Hit(sector) { // -------------- Condition 3 --------------------
    let finder = sectors.find(x => x[2] === sector);
    let twoXTwo = sectors.filter(x => x[3] === 2);

    if (finder[3] === 1 && twoXTwo.length === 2) {
        return true;
    }

    return false;
}

function onlyOneHits() { // -------------- Condition 4 -------------------- Used in condition 5th as well
    if (!x2Sector && !x3Sector) {
        return sectors.filter(x => x[3] === 1);
    }
}


function checkHitOnlyZeroes() { // -------------- Condition 6 --------------------
    if (x2Sector && x3Sector) {
        return true;
    }
    return false;
}


// main func - 10 turns game flow 
function turnBasedLoop() {

    const min = 1440;
    const max = 1800;

    let lastSector;
    let currentSector;


    let deg = Math.floor(Math.random() * (max - min) + min);


    if (tenTurns.length === 0) { // First spin - here

        lastSector = getCurrentSector(deg)

        rotateWheel(deg);
        hitSector(lastSector);

    } else if (tenTurns.length === 1) { // Second spin - here

        currentSector = getCurrentSector(deg);

        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector

    } else if (tenTurns.length === 2) {  // Third spin - here

        currentSector = getCurrentSector(deg);

        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector

    } else if (tenTurns.length === 3) { // Fourth spin - here

        currentSector = getCurrentSector(deg);

        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector

    } else if (tenTurns.length === 4) { // Fifth spin - here

        currentSector = getCurrentSector(deg);

        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }


        // This way we have the x2 sectors and x3 sectors completed
        if (lock2XAnd3XTogether(currentSector)) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;  // ------------ Added this line ------------//

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;

        } else if (lock3xSingle(currentSector)) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector;

    } else if (tenTurns.length === 5) { // Sixth spin - here we can have sectors with 2x and 3x completed

        if (condition1) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;
        }


        if (condition2) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;
        }


        currentSector = getCurrentSector(deg);


        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }


        if (lock2XAnd3XTogether(currentSector)) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;

        } else if (lock3xSingle(currentSector)) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }


        if (check1Hit(currentSector)) { // 3rd condition

            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector;

    } else if (tenTurns.length === 6) {  // Seventh spin - here we can have sectors with 2x and 3x completed

        if (condition1) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector
            return;
        }

        if (condition2) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        currentSector = getCurrentSector(deg);


        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }


        if (lock2XAnd3XTogether(currentSector)) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;

        } else if (lock3xSingle(currentSector)) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }


        // 4th condition
        // // IF we have 2 hits somewhere this means that we can skip this condition
        // // we only search for 1 hits only if we do not have any two hits

        let checkForTwoHits = sectors.filter(x => x[3] === 2); // 4th condition // maybe add the 2xSector and 3xSector checks

        if (checkForTwoHits.length === 0) {

            oneHitsArr = onlyOneHits();

            currentSector = oneHitsArr[0][2];
            deg = oneHitsArr[0][0] + 1440 + 5;

            condition4 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;

        }

        // 5th condition 
        if (checkForTwoHits.length === 1) { // 5th condition  // Previous logic -remove due it is incorrect (x2Sector && !x3Sector)
            oneHitsArr = onlyOneHits();

            currentSector = oneHitsArr[0][2];
            deg = oneHitsArr[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }


        if (check1Hit(currentSector)) { // 3rd condition

            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }


        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector;

    } else if (tenTurns.length === 7) { // Eighth spin - here we can have sectors with 2x and 3x completed

        if (condition1) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (condition2) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (condition4) {
            oneHitsArr = onlyOneHits();

            currentSector = oneHitsArr[0][2];
            deg = oneHitsArr[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        currentSector = getCurrentSector(deg);


        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }


        if (lock2XAnd3XTogether(currentSector)) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;

        } else if (lock3xSingle(currentSector)) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (check1Hit(currentSector)) { // 3rd condition

            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (checkHitOnlyZeroes()) { // 6th condition - IF WE HAVE LOCKED 2X AND 3X, WE MUST HIT ONLY 0 HITS SECTORS

            let sectors0Hits = sectors.filter(x => x[3] === 0);


            for (const x of sectors0Hits) {
                if (x[3].includes(currentSector)) {
                    deg = modifyAsPerLastSector(deg);
                    currentSector = getCurrentSector(deg);
                }
                return;
            }

        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector;

    } else if (tenTurns.length === 8) { // Ninth spin - here we can have sectors with 2x and 3x completed

        if (condition1) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;


            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (condition2) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;


            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (condition4) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        currentSector = getCurrentSector(deg);

        if (lastSector === currentSector) {
            deg = modifyAsPerLastSector(deg);
            currentSector = getCurrentSector(deg);
        }


        if (lock2XAnd3XTogether(currentSector)) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;

        } else if (lock3xSingle(currentSector)) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }

        if (check1Hit(currentSector)) { // 3rd condition

            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            return;
        }


        if (checkHitOnlyZeroes()) { // 6th condition - IF WE HAVE LOCKED 2X AND 3X, WE MUST HIT ONLY 0 HITS SECTORS
            let sectors0Hits = sectors.filter(x => x[3] === 0);

            for (const x of sectors0Hits) {
                if (x[3].includes(currentSector)) {
                    deg = modifyAsPerLastSector(deg);
                    currentSector = getCurrentSector(deg);
                }
                return;
            }
        }

        hitSector(currentSector);
        rotateWheel(deg);

        lastSector = currentSector;

    } else if (tenTurns.length === 9) { // Tenth spin - here we can have sectors with 2x and 3x completed

        if (condition1) {
            let zeroHitters = sectors.filter(x => x[3] === 0);

            currentSector = zeroHitters[0][2];
            deg = zeroHitters[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        if (condition2) {
            oneHitsArr = onlyOneHits();

            currentSector = oneHitsArr[0][2];
            deg = oneHitsArr[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        if (condition4) {
            let twoHitters = sectors.filter(x => x[3] === 2);

            currentSector = twoHitters[0][2];
            deg = twoHitters[0][0] + 1440 + 5;


            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        // This is when we have completed only 2x with 2 hits and 3x with 2 hits
        let checkForTwoHits = sectors.filter(x => x[3] === 2);
        if (checkForTwoHits.length === 2) {

            currentSector = checkForTwoHits[0][2];
            deg = checkForTwoHits[0][0] + 1440 + 5;

            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            resetTenTurnsArr();
            return;
        }

        if (x3Sector) {
            oneHitsArr = onlyOneHits();

            currentSector = oneHitsArr[0][2];
            deg = oneHitsArr[0][0] + 1440 + 5;


            hitSector(currentSector);
            rotateWheel(deg);

            lastSector = currentSector;
            resetTenTurnsArr();
            return;
        }

        resetTenTurnsArr();
    }
}


