//Global variables:
const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice(30);
const scoreDisplay = document.querySelector(".score");

let dropCount;
let speed;
let score;

reset();

//The game starts if the player presses any key...
document.addEventListener("keydown", e => {
    
    //And if there is no "dropCount".
    if (!dropCount) {

        startGame();

    }

    const player = document.querySelector(".player");

    //The CSS class ".player" is transfered to the adjacent divs (ONLY within the "playerCells") when the player presses the left or 
    //right arrow key.
    if (e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)) {

        player.parentElement.nextElementSibling.appendChild(player);

    }

    if (e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)) {
        
        player.parentElement.previousElementSibling.appendChild(player);

    }

});

/**
 * Resets the variables, empties all the cells and places the player in the middle cell of the "playerCells".
 */
function reset() {

    dropCount = 0;
    speed = 1000;
    score = 0;

    scoreDisplay.innerHTML = "0";
    cells.forEach(cell => cell.innerHTML = "");
    playerCells[1].innerHTML = `<div class="player"></div>`;

}

/**
 * Starts the game by calling the "reset()" and the "loop()" functions.
 */
function startGame() {

    reset();
    loop();

}

/**
 * Creates the enemies, makes them go down and checks if they collide with the player.
 */
function loop() {

    let stopGame = false;

    for (let i = enemyCells.length - 1; i >= 0; i--) {

        const cell = enemyCells[i];
        const nextCell = cells[i + 3]; //"i+3" because we want the "nextCell" to be right under the "cell".
        const enemy = cell.children[0];

        //If there's no enemy the function continues running.
        if (!enemy) {

            continue;

        }

        //Brings the enemies down in a straight line.
        nextCell.appendChild(enemy);

        //If the enemy enters one of the "playerCells"...
        if (playerCells.includes(nextCell)) {

            //And the "playerCell" that the enemy enters is the one in which the player is...
            if (nextCell.querySelector(".player")) {

                stopGame = true;//The game stops.

            //And the "playerCell" that the enemy enters is NOT the one in which the player is...
            } else {  

                score++;//The player gets a point...
                speed = Math.max(100, speed - 25);//The game's speed increases...
                scoreDisplay.innerHTML = score;
                enemy.remove();//And the enemy is removed.

            }

        }

    }

    //Every time the "dropCount" is an even number a new enemy is created.
    if (dropCount % 2 === 0) {

        const position = Math.floor(Math.random() * 3);
        enemyCells[position].innerHTML = `<div class="enemy"></div>`;

    }

    //If the game stops, the player can see his/her final score and the game is reset.
    if (stopGame) {

        alert('Your score: ' + score + ". Close this window to play again.");
        reset();

    //If the game doesn't stop, the "dropCount" increases and the function "loop()" is recalled at the current speed (which, like pointed
    //before, increases every time the player dodges an enemy).
    } else {

        dropCount++;
        setTimeout(loop, speed);

    }

}

/**
 * THIS MAY INTEREST YOU:
 * 
 * This last function is called "loop" because it is called every time the game does not stop, i.e. every time no kraken invades the cell 
 * where the player is. The speed variable, which also increases every time the game does not stop, causes the function to be called 
 * faster and faster, thus creating enemies and bringing them down to the "playerCells" faster and faster as well.
 */