import {Vector, Shape, Rectangle} from './shapes.js';

export class Ball extends Shape {
    deltaPosition; 
    constructor(position, dimensions, color, ctx, deltaPosition) {
        super(position, dimensions, color, ctx);
        this.deltaPosition = deltaPosition;
        this.ctx && this.ctx.drawBall(this);
    }
    move() {
        this.position = this.position.add(this.deltaPosition);
        this.ctx.redrawBall(this.position);
    }
    flipXDirection() {
        this.deltaPosition = new Vector(-1 * this.deltaPosition.x, this.deltaPosition.y);
    }
    flipYDirection() {
        this.deltaPosition = new Vector(this.deltaPosition.x, -1 * this.deltaPosition.y);
    }
}
export class Block extends Rectangle {
    colors;
    view;
    constructor(position, dimensions, colors, ctx) {
        super(position, dimensions, colors[0], ctx);
        this.colors = colors;
        this.view = this.ctx.drawBlock(this);
    }
    flipColor() {
        this.color = (this.color === "blue") ? "red" : "blue";
        this.ctx.redrawBlock(this.view, this);
    }
}
export class Playground extends Rectangle {
    // wall;
    // ball;
    constructor(position, dimensions, color, ctx) {
        super(position, dimensions, color, ctx);
        this.ctx.drawPlayground(this);
        // this.wall = this.buildWall(this.ctx);
        // this.ball = this.buildBall(this.wall, this.ctx);
    }
    // buildWall(ctx) {
    //     var position = this.calculateWallPosition();
    //     var dimensions = this.calculateWallDimensions(); 
    //     return new Wall(position, dimensions, "", ctx);
    // }
    // calculateWallPosition() {
    //     var x = this.dimensions.width / 10;
    //     var y = this.dimensions.height / 2
    //     return new Vector(x, y);
    // } 
    // calculateWallDimensions() {
    //     var height = this.dimensions.height /4;
    //     var width = this.dimensions.width * 8 / 10;
    //     return  new Dimensions(width, height);    
    // }
    // buildBall(wall, ctx) {
    //     var width = wall.dimensions.height / wall.nLines / 2; 
    //     var height = width;
    //     var dimensions = new Dimensions(width, height);
    //     var x = this.dimensions.width / 2 - width / 2;
    //     var y = height; 
    //     var position = new Vector(x, y);
    //     return new Ball(position, dimensions, "green", ctx);
    // }
    // isBallOutsideLeftOrRightBorder() {
    //     var isOutsideRightBorder = this.ball.right.x >= this.position.x + this.dimensions.width;
    //     var isOutsideLeftBorder = this.ball.left.x <= this.position.x;
    //     return isOutsideLeftBorder || isOutsideRightBorder; 
    // }
    // isBallOutsideBottomOrTopBorder() {
    //     var isBelowBottomBorder = this.ball.bottom.y <= this.position.y;
    //     var isAboverTopBorder = this.ball.top.y >= this.position.y + this.dimensions.height;
    //     return isBelowBottomBorder || isAboverTopBorder; 
    // }
}