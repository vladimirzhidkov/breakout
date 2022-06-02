import {Vector, Dimensions} from './modules/vector.js';
import {Ball, Block, Wall, Playground} from './modules/game_elements.js';

class Blockout {
    canvas;
    playground;
    timer;
    
    theta = Math.PI / 4.0; // direction of ball in radians 
    delta_t = 20; // time step in milliseconds
    speed = 300; // in pixels/seconds
    deltaPosition = this.calculateBallDeltaPosition();

    constructor(canvas) {
        this.canvas = canvas; 
        this.playground = new Playground(new Vector(0, 0), new Dimensions(800, 400), canvas);
    }
    calculateBallDeltaPosition() {
        var velocityUnitVector = new Vector(Math.cos(this.theta), Math.sin(this.theta));
        var deltaPosition = velocityUnitVector.multiplyByScalar(this.speed * this.delta_t / 1000.0);
        return deltaPosition;
    }
    checkForCollisionWithPlaygroundBorders() {
        // var thisBall = this.playground.ball;
        // var nextBall = new Ball(thisBall.position.add(this.deltaPosition), thisBall.dimensions);
        if(this.playground.isBallOutsideLeftOrRightBorder()) {
            this.deltaPosition = this.deltaPosition.flipX();
        }
        if (this.playground.isBallOutsideBottomOrTopBorder()) {
            this.deltaPosition = this.deltaPosition.flipY();
        }
    }
    checkForCollisionWithBlocks() {
        this.playground.wall.blocks.forEach(block => {
            if (this.isBallTouchingBlockFromBottom(block) || this.isBallTouchingBlockFromTop(block)) {
                this.deltaPosition = this.deltaPosition.flipY();
                block.flipColor(); 
            }
            if (this.isBallTouchingBlockFromLeft(block) || this.isBallTouchingBlockFromRight(block)) {
                this.deltaPosition = this.deltaPosition.flipX();
                block.flipColor(); 
            }
        }); 
    }
    isBallTouchingBlockFromBottom(block) {
        return block.isPointCrossingBorder(this.playground.ball.topPoint, this.deltaPosition); 
    }
    isBallTouchingBlockFromTop(block) {
        return block.isPointCrossingBorder(this.playground.ball.bottomPoint, this.deltaPosition); 
    } 
    isBallTouchingBlockFromRight(block) {
        return block.isPointCrossingBorder(this.playground.ball.leftPoint, this.deltaPosition); 
    }
    isBallTouchingBlockFromLeft(block) {
        return block.isPointCrossingBorder(this.playground.ball.rightPoint, this.deltaPosition); 
    }
    calcBallNextPosition() {
        this.checkForCollisionWithPlaygroundBorders();
        this.checkForCollisionWithBlocks();
        var next = this.playground.ball.position.add(this.deltaPosition) 
        this.playground.ball.move(next);
    }
    start() {
        this.timer = setInterval(this.calcBallNextPosition.bind(this), this.delta_t);
    }
}
class DOMCanvas {
    root;    
    playground;
    
    constructor() {
        this.root= document.getElementById("root");
    }
    drawPlayground(modelPlayground) {
        this.playground = this.createDOMElement(modelPlayground); 
        this.playground.style.position = "relative";
        this.root.appendChild(this.playground);
    }
    drawBlock(modelBlock) {
        var block = this.createDOMElement(modelBlock);
        var borderWidth = 2;
        var borderRadius = modelBlock.dimensions.height / 4;
        block.style.borderRadius = borderRadius + "px";
        block.style.borderWidth = borderWidth + "px";
        block.style.borderStyle = "solid";
        block.style.borderColor = this.playground.style.background; 
        block.style.height = (modelBlock.dimensions.height - 2 * borderWidth) + "px";
        block.style.width = (modelBlock.dimensions.width - 2 * borderWidth) + "px";
        this.playground.appendChild(block);
        return block;      
    }
    redrawBlock(element, model) {
        element.style.background = model.color; 
    }
    drawBall(modelBall) {
        this.ball = this.createDOMElement(modelBall);
        this.ball.style.borderRadius = (modelBall.dimensions.width / 2) + "px";
        this.playground.appendChild(this.ball);
    } 
    redrawBall(newPosition) {
        this.ball.style.left = newPosition.x + "px";
        this.ball.style.bottom = newPosition.y + "px";
    }
    createDOMElement(model) {
        var element = document.createElement("div");
        element.style.position = "absolute";
        element.style.height = model.dimensions.height + "px";
        element.style.width = model.dimensions.width + "px";
        element.style.left = model.position.x + "px";
        element.style.bottom = model.position.y + "px"; 
        element.style.background = model.color;
        return element;
    }
}

var canvas = new DOMCanvas();
var blockout = new Blockout(canvas);
blockout.start();

