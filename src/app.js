import { Game } from "./game.js"
import { Ui } from "./ui.js"

let game;
let leaderboard = [];
let ui;

createNewGame();
stopTheGame();


document.addEventListener("keydown", function(e){
    if (e.code === "Space" && game.gamePaused) startTheGame();
});

function startTheGame() {
    game.gamePaused = false;
    ui.leadeboardDiv.removeEventListener("click", startTheGame);
    ui.pauseBtnDiv.addEventListener("click", () => game.gamePaused = true);
    ui.hideLeaderboard();
    run();
}

function stopTheGame(){
    if(game.gameOver){
        leaderboard.push(game.score);
        createNewGame();
    }
    openLeaderboard();
}

function openLeaderboard() {
    ui.showLeaderboard(leaderboard);
    ui.leadeboardDiv.addEventListener("click", startTheGame);
}
function createNewGame(){
    game = new Game();
    ui = new Ui(game);
    ui.printFirstGameboard();
}

function run() {
    if (Number.isInteger(game.score / 10)) {
        game.raiseSpeed();
    }
    ui.updateMenu();
    game.createNewRow();
    game.holder++;
    ui.uiGameBoard.childNodes[ui.uiGameBoard.childNodes.length - 1].remove();
    ui.uiGameBoard.prepend(ui.uiAddGameRow(game.state.map[Game.MAP_ROWS - 1]));

    game.moveTheCarStraight();

    if (game.gamePaused === true || game.gameOver === true) {
        ui.pauseBtnDiv.removeEventListener("click", () => game.gamePaused = true);
        stopTheGame();
    } else {
        // Schedule the next run with the updated interval
        setTimeout(run, game.interval);
    }
}

