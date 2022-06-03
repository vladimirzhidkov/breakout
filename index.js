import {Vector, Dimensions, Point} from './modules/shapes.js';
import {Ball, Block, Playground} from './modules/game_elements.js';

class Blockout {
    DELTA_TIME = 20; // time step in milliseconds
    PLAYGROUND_WIDTH = 800;
    PLAYGROUND_HEIGHT = 400;
    PLAYGROUND_COLOR = "yellow";
    WALL_ROW_COUNT = 2;
    WALL_ROW_BLOCK_COUNT = 4;
    WALL_LEFT_RIGHT_MARGIN = 0.1; // fraction of playground width
    WALL_TOP_MARGIN = 0.25; // fraction of playground height
    WALL_BOTTOM_MARGIN = 0.5; // fraction of playground height
    BLOCK_COLORS = ["blue", "red"];
    BALL_DIRECTION_ANGLE = Math.PI / 4.0; // in radians 
    BALL_SPEED = 200; // in pixels per second
    BALL_SIZE_PROPORTION = 0.5 // fraction of block height
    BALL_COLOR = "green"; 
    ctx;
    timer;
    playground;
    blocks;
    ball;
    constructor(ctx) {
        this.ctx = ctx; 
        this.playground = this.constructPlayground();
        this.blocks = this.constructBlocks(); 
        this.ball = this.constructBall();
    }
    constructPlayground() {
        var position = new Vector(0, 0);
        var direction = new Dimensions(this.PLAYGROUND_WIDTH, this.PLAYGROUND_HEIGHT);
        var color = this.PLAYGROUND_COLOR;
        return new Playground(position, direction, color, this.ctx);
    }
    constructBlocks() {
        var blocks = []; 
        var wallPosition = this.calculateWallPosition();
        var wallDimensions = this.calculateWallDimensions(); 
        var blockDimensions = this.calculateBlockDimensions(wallDimensions); 
        for(let wallRowIndex = 0; wallRowIndex < this.WALL_ROW_COUNT; wallRowIndex++) {
            for(let blockIndex = 0; blockIndex < this.WALL_ROW_BLOCK_COUNT; blockIndex++) {
                var blockPosition = 
                    this.calculateBlockPosition(wallPosition, wallRowIndex, blockDimensions, blockIndex); 
                var block = new Block(blockPosition, blockDimensions, this.BLOCK_COLORS, this.ctx);
                blocks.push(block);
            }
        }
        return blocks;
    }   
    calculateWallPosition() {
        var x = this.PLAYGROUND_WIDTH * this.WALL_LEFT_RIGHT_MARGIN;
        var y = this.PLAYGROUND_HEIGHT * this.WALL_BOTTOM_MARGIN;
        return new Point(x, y);
    } 
    calculateWallDimensions() {
        var width = this.PLAYGROUND_WIDTH * (1 - 2 * this.WALL_LEFT_RIGHT_MARGIN); 
        var height = this.PLAYGROUND_HEIGHT * (1 - this.WALL_BOTTOM_MARGIN - this.WALL_TOP_MARGIN);
        return new Dimensions(width, height);    
    }
    calculateBlockDimensions(wallDimensions) {
        var width = wallDimensions.width / this.WALL_ROW_BLOCK_COUNT;
        var height = wallDimensions.height / this.WALL_ROW_COUNT;
        return new Dimensions(width, height);
d    }
    calculateBlockPosition(wallPosition, wallRowIndex, blockDimensions, blockIndex) {
        var x = wallPosition.x + blockDimensions.width * blockIndex;
        var y = wallPosition.y + blockDimensions.height * wallRowIndex;
        return new Point(x, y);
    }
    constructBall() {
        var wallDimensions = this.calculateWallDimensions(); 
        var blockDimensions = this.calculateBlockDimensions(wallDimensions);
        var ballSize = blockDimensions.height * this.BALL_SIZE_PROPORTION;
        var ballDimensions = new Dimensions(ballSize, ballSize);
        var x = (this.PLAYGROUND_WIDTH - ballSize) / 2;
        var y = 0;
        var ballPosition = new Vector(x, y);
        var ballDeltaPosition = this.calculateBallDeltaPosition()
        return new Ball(ballPosition, ballDimensions, this.BALL_COLOR, this.ctx, ballDeltaPosition); 
    }
    calculateBallDeltaPosition() {
        var velocityUnitVector = 
            new Vector(Math.cos(this.BALL_DIRECTION_ANGLE), Math.sin(this.BALL_DIRECTION_ANGLE));
        var delta = this.BALL_SPEED * this.DELTA_TIME / 1000.0; 
        var deltaPosition = velocityUnitVector.multiplyByScalar(delta);
        return deltaPosition;
    }
    checkForBallCollisionWithPlaygroundBorders() {
        if (this.isBallToHitPlaygroundTopOrBottomEdge()) {
            this.ball.flipYDirection();
        } else if (this.isBallToHitPlaygroundLeftOrRightEdge()) {
            this.ball.flipXDirection();
        }
    }
    isBallToHitPlaygroundTopOrBottomEdge() {
        var isToHitTopBorder = this.playground.isPointToGetOut(this.ball.top, this.ball.deltaPosition);
        var isToHitBottomBorder = this.playground.isPointToGetOut(this.ball.bottom, this.ball.deltaPosition);
        return isToHitTopBorder || isToHitBottomBorder;
    }
    isBallToHitPlaygroundLeftOrRightEdge() {
        var isToHitLeftBorder = this.playground.isPointToGetOut(this.ball.left, this.ball.deltaPosition);
        var isToHitRightBorder = this.playground.isPointToGetOut(this.ball.right, this.ball.deltaPosition);
        return isToHitLeftBorder || isToHitRightBorder;
    }
    checkForBallCollisionWithBlocks() {
        this.blocks.forEach(block => {
            if (this.isBallToHitBlockBottomOrTopEdge(block)) {
                this.ball.flipYDirection();
                block.flipColor(); 
            } 
            else if (this.isBallToHitBlockLeftOrRightEdge(block)) {
                this.ball.flipXDirection();
                block.flipColor(); 
            }
        }); 
    }
    isBallToHitBlockBottomOrTopEdge(block) {
        var isToHitBottom = block.isPointToGetIn(this.ball.top, this.ball.deltaPosition);
        var isToHitTop = block.isPointToGetIn(this.ball.bottom, this.ball.deltaPosition); 
        return isToHitBottom || isToHitTop;
    }
    isBallToHitBlockLeftOrRightEdge(block) {
        var isToHitLeft = block.isPointToGetIn(this.ball.right, this.ball.deltaPosition); 
        var isToHitRight = block.isPointToGetIn(this.ball.left, this.ball.deltaPosition); 
        return isToHitLeft || isToHitRight;
    }
    renderNextState() {
        this.checkForBallCollisionWithBlocks();
        this.checkForBallCollisionWithPlaygroundBorders();
        this.ball.move();
    }
    start() {
        this.timer = setInterval(this.renderNextState.bind(this), this.DELTA_TIME);
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

