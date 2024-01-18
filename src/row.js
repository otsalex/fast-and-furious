export class Row {
    constructor(leftSide, obstacle, roadShift){
        this.leftSide = leftSide;
        this.roadShift = roadShift;
        this.obstacle = obstacle;
    }
}

Row.ROAD_WIDTH = 0.3
