import { Row } from "./row.js";
export class Game {
    constructor() {
        this.state ={
            map: [],
        }

        // change this to set initial speed - lower number, faster speed
        this.interval = 80;
        // change this to speed game up faster
        this.speedingStep = 1

        this.carLocationY = 15;
        this.carLocationX = 6;
        this.score = 0;
        this.moveDirection = 0;
        this.gamePaused = true;
        this.gameOver = false;

        this.lastRowLeftSide = 800;
        this.leftSide= 800;

        this.initializeState();

    }
    raiseSpeed = () => {
        this.interval -= this.speedingStep;
    }
    createNewRow(){
        let random = Math.random();
        let roadShiftDirection = getRoadShiftDirection(random);
        const obstacle = getObstacleIfLucky(random);

        this.leftSide = calculateShift(roadShiftDirection, this.lastRowLeftSide, this.leftSide);

        if (this.leftSide === this.lastRowLeftSide) {
            roadShiftDirection = null;
        }

        this.state.map.push(
            new Row(this.leftSide, obstacle, roadShiftDirection)
        )

        if (this.state.map.length > Game.MAP_ROWS) {
            this.state.map.splice(0, 1);
        }
        this.lastRowLeftSide = this.leftSide;
    }


    initializeState(){
        for (let index = 0; index < Game.MAP_ROWS; index++) {
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


    moveTheCarStraight(){
        const roadShiftDirection = this.state.map[13].roadShift;

        if (roadShiftDirection === "left") this.moveDirection++;
        if (roadShiftDirection === "right") this.moveDirection--;

        let nextRowCarLocX = this.carLocationX + this.moveDirection;


        if (isTheCarCrashed(nextRowCarLocX, this.state.map[13].obstacle)) {
            this.gameOver = true;

        } else {
            assignCarClassToNextRow(this.carLocationY, nextRowCarLocX)

            removeCarFromPreviousRow(this.carLocationY)

            this.carLocationX = nextRowCarLocX;
            this.carLocationY++;
            this.moveDirection = 0;
            this.score++;
        }
    }

}
Game.MAP_ROWS = 100;


function getRoadShiftDirection(random) {
    if (random < 0.5){
        return "left";
    }
    return "right";
}

function calculateShift(direction, lastRowLeftSide, leftSide) {
    if (direction === "left" && leftSide >= 30.14){
        return lastRowLeftSide - 15.57;
    } else if (direction === "right" && (document.documentElement.clientWidth - leftSide) >= 30.14) {
        return lastRowLeftSide + 15.57;
    } else {
        return lastRowLeftSide
    }
}

function getObstacleIfLucky(random) {
    if (random < 0.05 || random > 0.95) {
        return Math.round(Math.random() * 9);
    }
    return null;
}

function assignCarClassToNextRow(carLocationY, nextRowCarLocX){
    document
        .querySelector("#row" + carLocationY)
        .querySelector(".road")
        .querySelector("#roadLine" + nextRowCarLocX)
        .className = "car";
}

function removeCarFromPreviousRow(carLocationY){
    let carsPreviousLocDiv = document.querySelector("#row" + (carLocationY - 1)).querySelector(".road").querySelector(".car");

    if(carsPreviousLocDiv){
        carsPreviousLocDiv.className = "roadLine";
    }
}
function isTheCarCrashed(nextRowCarLocX, obstacle){
    return nextRowCarLocX < 0 || nextRowCarLocX > 9 || nextRowCarLocX === obstacle;
}
