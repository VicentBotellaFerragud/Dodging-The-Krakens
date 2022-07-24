const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice(30);
const scoreDisplay = document.querySelector(".score");
let dropCount;
let speed;
let score;

reset();

/**
 * The game starts if the player presses a key.
 */
document.addEventListener("keydown", e => {
    /**
     * Game starts if there is no "dropCount".
     */
    if (!dropCount) {
        startGame();
    }
    /**
     * The CSS class ".player" is transfered to the adjacent divs (within the "playerCells") when the player presses the right (".player" 
     * is transfered to the right adjacent div) or the left (".player" is transfered to the left adjacent div) arrow.
     */
    const player = document.querySelector(".player");
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
 * Calls the "reset()" and the "loop()" functions (starts the game).
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
        const nextCell = cells[i + 3];//"i+3" because we want the "nextCell" to be right under the "cell".
        const enemy = cell.children[0];
        //If there's no enemy the function continues running.
        if (!enemy) {
            continue;
        }
        //Brings the enemies down in a straight line.
        nextCell.appendChild(enemy);
        //If the enemy enters one of the "playerCells"...
        if (playerCells.includes(nextCell)) {
            //If the enemy enters one of the "playerCells" in which the player is, the game stops.
            if (nextCell.querySelector(".player")) {
                stopGame = true;
            //If the enemy enters one of the "playerCells" in which the player isn't, the player gets a point, the game's speed increases and 
            //the enemy is removed.
            } else {
                score++;
                speed = Math.max(100, speed - 25);
                scoreDisplay.innerHTML = score;
                enemy.remove();
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
    //If the game doen't stop, the "dropCount" increases and function "loop()" is recalled at the current speed (which increases every time 
    //the player dodges an enemy).
    } else {
        dropCount++;
        setTimeout(loop, speed);
    }
}





