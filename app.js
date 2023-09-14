import { Game } from "./game.js"
import { Ui } from "./ui.js"

let game;
let leaderboard = [];
let ui;

createNewGame();
showMenu();


function showMenu(){
    if(game.gameOver == true){
        leaderboard.push(game.score);
        createNewGame();
    }
    ui.showLeaderboard(leaderboard);
    ui.leadeboardDiv.addEventListener("click", runTheGame);

}

function runTheGame(){
    game.gamePaused = false;
    ui.leadeboardDiv.removeEventListener("click", runTheGame);
    ui.pauseBtnDiv.addEventListener("click", () => game.gamePaused = true);
    ui.hideLeaderboard();

    var run = setInterval(function(){
       
        if(Number.isInteger(game.score / 10)){
            game.interval -= 10;
        }
        ui.updateMenu();
        game.createNewRow();
        game.holder++;
        ui.uiGameBoard.childNodes[ui.uiGameBoard.childNodes.length - 1].remove();
        ui.uiGameBoard.prepend(ui.uiAddGameRow(game.state.map[Game.MAP_ROWS - 1]));

        game.moveTheCar();
        
        if(game.gamePaused == true || game.gameOver == true){
            console.log(game.interval);
            clearInterval(run);
            ui.pauseBtnDiv.removeEventListener("click", () => game.gamePaused = true);
            showMenu();
        }
        

    }, game.interval);
    
}

function createNewGame(){
    game = new Game();
    ui = new Ui(game);
    ui.printFirstGameboard();
}

