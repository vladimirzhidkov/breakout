export class Vector {
    #x = 0;
    #y = 0;
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    add(vector) {
        var x = this.#x + vector.x;
        var y = this.#y + vector.y;
        return new Vector(x, y);
    }
    multiplyByScalar(scalar) {
        var x = this.#x * scalar;
        var y = this.#y * scalar;
        return new Vector(x, y);
    }
    flipY() {
        var y = -1 * this.#y;
        return new Vector(this.#x, y);
    }
    flipX() {
        var x = -1 * this.#x;
        return new Vector(x, this.#y);
    }
}
export class Dimensions {
    #vector;
    constructor(width, height) {
        this.#vector = new Vector(width, height);
    }
    get width() {
        return this.#vector.x;
    }
    get height() {
        return this.#vector.y;
    }
}