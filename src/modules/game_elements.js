import {Delta, Shape, Rectangle, Border} from './shapes.js';

export class Ball extends Shape {
    deltaPosition; 
    constructor(position, dimensions, color, deltaPosition, ctx, parentView) {
        var border = new Border()
        border.radius = dimensions.width;
        super(position, dimensions, color, border, ctx, parentView);
        this.deltaPosition = deltaPosition;
    }
    move() {
        this.position = this.position.add(this.deltaPosition);
        this.ctx.updatePosition(this.view, this);
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
    constructor(position, dimensions, colors, border, ctx, parentView) {
        super(position, dimensions, colors[0], border, ctx, parentView);
        this.colors = colors;
    }
    flipColor() {
        this.color = (this.color ===  this.colors[0]) ? this.colors[1] : this.colors[0];
        this.ctx.updateColor(this.view, this);
    }
}