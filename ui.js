import { Game } from "./game.js"

export class Ui{
    constructor(game){
        this.rowHeight = document.documentElement.clientHeight / Game.MAP_ROWS;
        this.screenWidth = document.documentElement.clientWidth;
        this.roadWidth = 15.57 * 10;
        this.game = game;
        this.uiGameBoard = document.querySelector("#app");
        this.pauseBtnDiv = document.querySelector("#pauseButton");
        this.leadeboardDiv = document.querySelector("#leaderboard");
        this.scoreDiv = document.querySelector("#score");

        this.pauseBtnDiv.innerHTML = '&#9616;&#9616;';
        
        
    }

    printFirstGameboard(){
        this.uiGameBoard.innerHTML = "";
        for (let index = Game.MAP_ROWS - 1; index >= 0; index--) {
            this.uiGameBoard.appendChild(this.uiAddGameRow(this.game.state.map[index]));
            this.game.holder = index;
        }
        this.game.holder = 100;
    }

    uiAddGameRow(row){
    
        let rowDiv = document.createElement('div');
        let roadDiv = document.createElement('div');
        let leftEdgeDiv = document.createElement('div');
        let rightEdgeDiv = document.createElement('div');
    
        rowDiv.className = "row";
        roadDiv.className = "road";
        leftEdgeDiv.className = "edge";
        rightEdgeDiv.className = "edge";
        
        rowDiv.style.height = this.rowHeight + "px";
        

        leftEdgeDiv.style.width = row.leftSide + "px";
        roadDiv.style.width = this.roadWidth + "px";
        rightEdgeDiv.style.width = this.screenWidth - row.leftSide - this.roadWidth + "px";
    

        for (let index = 0; index < 10; index++) {
            let roadLineDiv = document.createElement('div');

            if(row.obstacle == index){
                roadLineDiv.id = "obstacle";
                roadLineDiv.className = "obstacle";
            } else{
                roadLineDiv.id = "roadLine" + index;
                roadLineDiv.className = "roadLine";
            }
            roadDiv.append(roadLineDiv);
        }
        if(this.game.holder == undefined){
            rowDiv.id = "row100";
        } else{
            rowDiv.id = "row" + this.game.holder;
        }
        
        rowDiv.appendChild(leftEdgeDiv);
        rowDiv.appendChild(roadDiv);
        rowDiv.appendChild(rightEdgeDiv);
    
        return rowDiv;
    }
    updateMenu(){
        
        this.pauseBtnDiv.className = 'RunTimeMenu';
        this.scoreDiv.innerHTML = `<b>Score ${this.game.score}</b>`;
    }
    showLeaderboard(leaderboard){
        this.leadeboardDiv.style.display = "block";
        this.scoreDiv.style.display = "none";
        this.pauseBtnDiv.style.display = "none";
        let HtmlText = "Click on me to start";
        if(leaderboard){
            HtmlText += "<br><b>Leaderboard:</b>"
            for (let index = 0; index < leaderboard.length; index++) {
                let score = (index + 1) + ". " + leaderboard[index];
                HtmlText += "<div>" + score + "</div>"
            };
               
            this.leadeboardDiv.innerHTML = HtmlText;
            
        }
        
    }
    hideLeaderboard(){
        this.leadeboardDiv.style.display = "none";
        this.scoreDiv.style.display = "block";
        this.pauseBtnDiv.style.display = "block";
        // let playButton = document.createElement("div");
        // playButton.className = 'playButton'
        // playButton.innerHTML = '\u23F5';
        // this.menuDiv.appendChild(playButton);
    }
}