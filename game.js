import { Row } from "./row.js";



export class Game{
    
    constructor(){
        this.state ={
            map: [],
        }
        this.carLocationY = 15;
        this.carLocationX = 6;
        this.score = 0;
        this.moveDirection = 0;
        this.gamePaused = true;
        this.gameOver = false;
        this.interval = 200;
        this.initalizeState();
        
    }
    createNewRow(){      
            let move = Math.random();
            let roadShift;
            let obstacle = null;


            if (move <= 0.5){
                this.leftSide = this.lastRowLeftSide - 15.57;
                roadShift = "left";
            } else{
                this.leftSide = this.lastRowLeftSide + 15.57;
                roadShift = "right";
            }

            //will not let the road too close to edges
            if(this.leftSide < 30.14){
                this.leftSide += 15.57;
                roadShift = null;
            } if((document.documentElement.clientWidth - this.leftSide - roadShift) < 30.14){
                this.leftSide -= 15.57;
                roadShift = null;
            }          

            if(move < 0.05 || move > 0.95){

                obstacle = Math.round(Math.random() * 9);
            }
          
            
            this.state.map.push(
                new Row(this.leftSide, obstacle, roadShift))
            
            if(this.state.map.length > Game.MAP_ROWS){
                this.state.map.splice(0, 1);
            }
         
            this.lastRowLeftSide = this.leftSide;

    }


    initalizeState(){
        this.lastRowLeftSide = 150;
        this.leftSide= 150;
        
        for(let index = 0; index < Game.MAP_ROWS; index++){
            this.createNewRow();
        }
        document.addEventListener("keydown", function(e){
            this.moveDirection = 0;
            switch (e.key) {
                case 'ArrowLeft':
                    // left
                    this.moveDirection--;
                    break;      
                case 'ArrowRight':
                    // right
                    this.moveDirection++;
                    break;      
            }
        }.bind(this));
    }

    
    moveTheCar(){
        
        
        switch(this.state.map[13].roadShift){
            
            case "left":
                this.moveDirection++;
                break;
            case "right":
                this.moveDirection--;
                break;
            default:
                break;
                
        }
        
        
        let nextRowCarLocX = this.carLocationX + this.moveDirection;

        // console.log("------------")
        // console.log(this.state.map[15-2].roadShift)
        // console.log("next row:");
        // console.log(this.carLocationY)
        // console.log("current pos:");
        // console.log(this.carLocationX);
        // console.log("next pos:");
        // console.log(nextRowCarLocX);
        // console.log("------------")

        let nextRowCarLocXId = "#roadLine" + nextRowCarLocX;

              
        if(nextRowCarLocX < 0 || nextRowCarLocX > 9 || nextRowCarLocX === this.state.map[13].obstacle){
            this.gameOver = true;

        } else{

            // add new car to next row
            let carsNextLocYId = "#row" + this.carLocationY; 
            let carsNextLocDiv = document.querySelector(carsNextLocYId).querySelector(".road").querySelector(nextRowCarLocXId);
            carsNextLocDiv.className = "car";
        
            // remove car from prevoius row
            let carsPreviousLocIdY = "#row" + (this.carLocationY - 1);
            let carsPreviousLocDiv = document.querySelector(carsPreviousLocIdY).querySelector(".road").querySelector(".car");
        
            if(carsPreviousLocDiv){
                carsPreviousLocDiv.className = "roadLine"; //"carPrevLoc";
            }    

            this.carLocationX = nextRowCarLocX;
            this.carLocationY++;
            this.moveDirection = 0;
            this.score++;
        }
        
    }
}
Game.MAP_ROWS = 100;


