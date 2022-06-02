import {Vector, Dimensions} from './modules/vector.js';

export class Shape {
    #position;
    #dimensions;
    #color;
    constructor(position, dimensions, color) {
        this.#position = position;
        this.#dimensions = dimensions;
        this.#color = color;
    }
    get position() {
        return this.#position;
    }
    get dimensions() {
        return this.#dimensions;
    }
    get color() {
        return this.#color;
    }
    get center() {
        var x = this.#position.x + this.#dimensions.width / 2;
        var y = this.#position.y + this.#dimensions.height / 2;
        return new Vector(x, y);
    }
    get top() {
        var x = this.#position.x + this.#dimensions.width / 2;
        var y = this.#position.y + this.#dimensions.height;
        return new Vector(x, y);
    }
    get bottom() {
        var x = this.#position.x + this.#dimensions.width / 2;
        return new Vector(x, this.#position.y);
    }
    get left() {
        var y = this.#position.y + this.#dimensions.height / 2;
        return new Vector(this.#position.x, y);
    }
    get right() {
        var x = this.#position.x + this.#dimensions.width;
        var y = this.#position.y + this.#dimensions.height / 2;
        return new Vector(x, y);
    }
}