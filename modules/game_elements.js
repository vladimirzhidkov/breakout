import {Vector, Dimensions} from './vector.js';

export class Ball {
    canvas;
    position;
    dimensions;
    color = "green";
    constructor(position, dimensions, canvas) {
        this.position = position;
        this.dimensions = dimensions;
        this.canvas = canvas;
        this.canvas && this.canvas.drawBall(this);
    }
    move(position) {
        this.position = position;
        this.canvas.redrawBall(this.position);
    }
    get topPoint() {
        var x = this.position.x + this.dimensions.width / 2;
        var y = this.position.y + this.dimensions.height;
        return new Vector(x, y);
    }
    get bottomPoint() {
        var x = this.position.x + this.dimensions.width / 2;
        return new Vector(x, this.position.y);
    }
    get leftPoint() { var y = this.position.y + this.dimensions.height / 2;
        return new Vector(this.position.x, y);
    }
    get rightPoint() {
        var x = this.position.x + this.dimensions.width;
        var y = this.position.y + this.dimensions.height / 2;
        return new Vector(x, y);
    }
}
export class Block {
    canvas;
    position; 
    dimensions;
    color = "blue";
    view;
    constructor(position, dimensions, canvas) {
        this.position = position;
        this.dimensions = dimensions;
        this.canvas = canvas;
        this.view = this.canvas.drawBlock(this);
    }
    isPointInside(point) {
        var isPointInsideWidth = point.x >= this.position.x && point.x <= this.position.x + this.dimensions.width;
        var isPointInsideHeight = point.y >= this.position.y && point.y <= this.position.y + this.dimensions.height; 
        return isPointInsideHeight && isPointInsideWidth; 
    }
    isPointCrossingBorder(point, delta) {
        return !this.isPointInside(point) && this.isPointInside(point.add(delta));
    }
    flipColor() {
        this.color = (this.color === "blue") ? "red" : "blue";
        this.canvas.redrawBlock(this.view, this);
    }
}
export class Wall {
    position;
    dimensions;
    nLines = 2;
    nBlocksInLine = 4;
    blocks = [];
    constructor(position, dimensions, canvas) {
        this.position = position;
        this.dimensions = dimensions;
        this.generateBlocks(canvas);
    }
    generateBlocks(canvas) {
        var dimensions = this.calculateBlockDimensions(); 
        for(let lineIndex = 0; lineIndex < this.nLines; lineIndex++) {
            for(let blockIndex = 0; blockIndex < this.nBlocksInLine; blockIndex++) {
                var position = this.calculateBlockPosition(dimensions, lineIndex, blockIndex); 
                var block = new Block(position, dimensions, canvas);
                this.blocks.push(block);
            }
        }
    }
    calculateBlockDimensions() {
        var height = this.dimensions.height / this.nLines;
        var width = this.dimensions.width / this.nBlocksInLine;
        var dimensions = new Dimensions(width, height);
        return dimensions;
    }
    calculateBlockPosition(blockDimensions, lineIndex, blockIndex) {
        var x = blockDimensions.width * blockIndex + this.position.x;
        var y = blockDimensions.height * lineIndex + this.position.y; 
        return new Vector(x, y);
    }
}
export class Playground {
    canvas;
    wall;
    ball;
    position;
    dimensions;
    color = "yellow";
    constructor(position, dimensions, canvas) {
        this.position = position; 
        this.dimensions = dimensions;
        this.canvas = canvas;
        this.canvas.drawPlayground(this);
        this.wall = this.buildWall(this.canvas);
        this.ball = this.buildBall(this.wall, this.canvas);
    }
    buildWall(canvas) {
        var position = this.calculateWallPosition();
        var dimensions = this.calculateWallDimensions(); 
        return new Wall(position, dimensions, canvas);
    }
    calculateWallPosition() {
        var x = this.dimensions.width / 10;
        var y = this.dimensions.height / 2
        return new Vector(x, y);
    } 
    calculateWallDimensions() {
        var height = this.dimensions.height /4;
        var width = this.dimensions.width * 8 / 10;
        return  new Dimensions(width, height);    
    }
    buildBall(wall, canvas) {
        var width = wall.dimensions.height / wall.nLines / 2; 
        var height = width;
        var dimensions = new Dimensions(width, height);
        var x = this.dimensions.width / 2 - width / 2;
        var y = height; 
        var position = new Vector(x, y);
        return new Ball(position, dimensions, canvas);
    }
    isBallOutsideLeftOrRightBorder() {
        var isOutsideRightBorder = this.ball.rightPoint.x >= this.position.x + this.dimensions.width;
        var isOutsideLeftBorder = this.ball.leftPoint.x <= this.position.x;
        return isOutsideLeftBorder || isOutsideRightBorder; 
    }
    isBallOutsideBottomOrTopBorder() {
        var isBelowBottomBorder = this.ball.bottomPoint.y <= this.position.y;
        var isAboverTopBorder = this.ball.topPoint.y >= this.position.y + this.dimensions.height;
        return isBelowBottomBorder || isAboverTopBorder; 
    }

}