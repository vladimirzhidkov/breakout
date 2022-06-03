export class Point {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    } 
    add(delta) {
        return new Point(this.x + delta.deltaX, this.y + delta.deltaY);
    }
}
export class Delta extends Point {
    constructor(deltaX, deltaY) {
        super(deltaX, deltaY);
    }
    get deltaX() {
        return this.x;
    }
    get deltaY() {
        return this.y;
    }
}
export class Dimensions extends Point {
    constructor(width, height) {
        super(width, height);
    }
    get width() {
        return this.x;
    }
    get height() {
        return this.y;
    }
}
export class Shape {
    position; 
    dimensions;
    color;
    ctx;
    constructor(position, dimensions, color, ctx) {
        this.position = position;
        this.dimensions = dimensions;
        this.color = color;
        this.ctx = ctx;
    }
    get bottomLeft() {
        return this.position;
    }
    get bottomRight() {
        var x = this.position.x + this.dimensions.width;
        return new Point(x, this.position.y);
    }
    get topLeft() {
        var y = this.position.y + this.dimensions.height;
        return new Point(this.position.x, y);
    }
    get topRight() {
        var x = this.position.x + this.dimensions.width;
        var y = this.position.y + this.dimensions.height;
        return new Point(x, y);
    }
    get center() {
        var x = this.position.x + this.dimensions.width / 2;
        var y = this.position.y + this.dimensions.height / 2;
        return new Point(x, y);
    }
    get top() {
        var x = this.position.x + this.dimensions.width / 2;
        var y = this.position.y + this.dimensions.height;
        return new Point(x, y);
    }
    get bottom() {
        var x = this.position.x + this.dimensions.width / 2;
        return new Point(x, this.position.y);
    }
    get left() {
        var y = this.position.y + this.dimensions.height / 2;
        return new Point(this.position.x, y);
    }
    get right() {
        var x = this.position.x + this.dimensions.width;
        var y = this.position.y + this.dimensions.height / 2;
        return new Point(x, y);
    }
}
export class Rectangle extends Shape {
    constructor(position, dimensions, color, ctx) {
        super(position, dimensions, color, ctx);
    }
    isPointInside(point) {
        var isPointInsideXBorders =
            point.x >= this.position.x && point.x <= this.position.x + this.dimensions.width;
        var isPointInsideYBorders =
            point.y >= this.position.y && point.y <= this.position.y + this.dimensions.height; 
        return isPointInsideXBorders && isPointInsideYBorders; 
    }
    isPointOutside(point) {
        return !this.isPointInside(point); 
    }
    isPointToGetInsideOut(point, delta) {
        return this.isPointOutside(point) && this.isPointInside(point.add(delta));
    }
    isPointToGetOutsideIn(point, delta) {
        return this.isPointInside(point) && this.isPointOutside(point.add(delta));
    }
}