import { Game } from "./game.js"
import { Ui } from "./ui.js"

let game;
let leaderboard = [];
let ui;

createNewGame();
showMenu();

document.addEventListener("keydown", function(e){
    if (e.code === "Space" && game.gamePaused) runTheGame();
});

function showMenu(){
    if(game.gameOver){
        leaderboard.push(game.score);
        createNewGame();
    }
    ui.showLeaderboard(leaderboard);
    ui.leadeboardDiv.addEventListener("click", runTheGame);
}
function runTheGame() {
    game.gamePaused = false;
    ui.leadeboardDiv.removeEventListener("click", runTheGame);
    ui.pauseBtnDiv.addEventListener("click", () => game.gamePaused = true);
    ui.hideLeaderboard();

    function run() {
        if (Number.isInteger(game.score / 10)) {
            game.raiseSpeed();
        }
        ui.updateMenu();
        game.createNewRow();
        game.holder++;
        ui.uiGameBoard.childNodes[ui.uiGameBoard.childNodes.length - 1].remove();
        ui.uiGameBoard.prepend(ui.uiAddGameRow(game.state.map[Game.MAP_ROWS - 1]));

        game.moveTheCar();

        if (game.gamePaused === true || game.gameOver === true) {
            ui.pauseBtnDiv.removeEventListener("click", () => game.gamePaused = true);
            showMenu();
        } else {
            // Schedule the next run with the updated interval
            setTimeout(run, game.interval);
        }
    }
    // Initial run
    run();
}

function createNewGame(){
    game = new Game();
    ui = new Ui(game);
    ui.printFirstGameboard();
}

