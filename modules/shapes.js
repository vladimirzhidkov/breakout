export class Point {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } 
}
export class Vector extends Point {
    constructor(x, y) {
        super(x, y);
    }
    add(vector) {
        var x = this.x + vector.x;
        var y = this.y + vector.y;
        return new Vector(x, y);
    }
    multiplyByScalar(scalar) {
        var x = this.x * scalar;
        var y = this.y * scalar;
        return new Vector(x, y);
    }
}
export class Dimensions {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
export class Shape {
    position; // position vector
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
        return new Vector(x, this.position.y);
    }
    get topLeft() {
        var y = this.position.y + this.dimensions.height;
        return new Vector(this.position.x, y);
    }
    get topRight() {
        var x = this.position.x + this.dimensions.width;
        var y = this.position.y + this.dimensions.height;
        return new Vector(x, y);
    }
    get center() {
        var x = this.position.x + this.dimensions.width / 2;
        var y = this.position.y + this.dimensions.height / 2;
        return new Vector(x, y);
    }
    get top() {
        var x = this.position.x + this.dimensions.width / 2;
        var y = this.position.y + this.dimensions.height;
        return new Vector(x, y);
    }
    get bottom() {
        var x = this.position.x + this.dimensions.width / 2;
        return new Vector(x, this.position.y);
    }
    get left() {
        var y = this.position.y + this.dimensions.height / 2;
        return new Vector(this.position.x, y);
    }
    get right() {
        var x = this.position.x + this.dimensions.width;
        var y = this.position.y + this.dimensions.height / 2;
        return new Vector(x, y);
    }
}
export class Line {
    point1;
    point2;
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }
}
export class Rectangle extends Shape {
    constructor(position, dimensions, color, ctx) {
        super(position, dimensions, color, ctx);
    }
    get bottomEdge() {
        return new Line(this.bottomLeft, this.bottomRight);
    }
    get topEdge() {
        return new Line(this.topLeft, this.topRight);
    }
    get leftEdge() {
        return new Line(this.bottomLeft, this.topLeft);
    }
    get rightEdge() {
        return new Line(this.bottomRight, this.topRight);
    }
    isPointInside(point) {
        var isPointInsideXBorders = point.x >= this.position.x && point.x <= this.position.x + this.dimensions.width;
        var isPointInsideYBorders = point.y >= this.position.y && point.y <= this.position.y + this.dimensions.height; 
        return isPointInsideXBorders && isPointInsideYBorders; 
    }
    isPointOutside(point) {
        return !this.isPointInside(point); 
    }
    isPointToGetIn(point, delta) {
        return this.isPointOutside(point) && this.isPointInside(point.add(delta));
    }
    isPointToGetOut(point, delta) {
        return this.isPointInside(point) && this.isPointOutside(point.add(delta));
    }
}