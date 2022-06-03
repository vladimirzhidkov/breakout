import {Delta, Shape, Rectangle} from './shapes.js';

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
        this.deltaPosition = new Delta(-1 * this.deltaPosition.deltaX, this.deltaPosition.deltaY);
    }
    flipYDirection() {
        this.deltaPosition = new Delta(this.deltaPosition.deltaX, -1 * this.deltaPosition.deltaY);
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
    constructor(position, dimensions, color, ctx) {
        super(position, dimensions, color, ctx);
        this.ctx.drawPlayground(this);
    }
}