import {Dimensions, Point, Delta, Border, Rectangle} from './modules/shapes.js';
import {Ball, Block} from './modules/game_elements.js';

export class Breakout {
    DELTA_TIME = 10; // time step in milliseconds
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
    BALL_SPEED = 300; // in pixels per second
    BALL_SIZE_PROPORTION = 0.5 // fraction of block height
    BALL_COLOR = "green"; 
    ctx;
    timer;
    playground;
    blocks;
    ball;
    constructor(ctx) {
        this.ctx = ctx; 
        this.playground = this.constructPlayground(this.ctx);
        this.blocks = this.constructBlocks(this.ctx, this.playground); 
        this.ball = this.constructBall(this.ctx, this.playground);
    }
    constructPlayground(ctx) {
        var position = new Point(0, 0);
        var dimensions = new Dimensions(this.PLAYGROUND_WIDTH, this.PLAYGROUND_HEIGHT);
        var color = this.PLAYGROUND_COLOR;
        var border = new Border();
        return new Rectangle(position, dimensions, color, border, ctx);
    }
    constructBlocks(ctx, playground) {
        var blocks = []; 
        var wallPosition = this.calculateWallPosition();
        var wallDimensions = this.calculateWallDimensions(); 
        var blockDimensions = this.calculateBlockDimensions(wallDimensions); 
        var border = new Border();
        border.color = playground.color;
        border.style = "solid";
        border.width = 2;
        border.radius = blockDimensions.height / 4;
        for(let wallRowIndex = 0; wallRowIndex < this.WALL_ROW_COUNT; wallRowIndex++) {
            for(let blockIndex = 0; blockIndex < this.WALL_ROW_BLOCK_COUNT; blockIndex++) {
                var blockPosition = 
                    this.calculateBlockPosition(wallPosition, wallRowIndex, blockDimensions, blockIndex); 
                var block = new Block(blockPosition, blockDimensions, this.BLOCK_COLORS, border, ctx, playground.view);
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
    constructBall(ctx, playground) {
        var wallDimensions = this.calculateWallDimensions(); 
        var blockDimensions = this.calculateBlockDimensions(wallDimensions);
        var ballSize = blockDimensions.height * this.BALL_SIZE_PROPORTION;
        var ballDimensions = new Dimensions(ballSize, ballSize);
        var x = (this.PLAYGROUND_WIDTH - ballSize) / 2;
        var y = 0;
        var ballPosition = new Point(x, y);
        var ballDeltaPosition = this.calculateBallDeltaPosition();
        return new Ball(ballPosition, ballDimensions, this.BALL_COLOR, ballDeltaPosition, ctx, playground.view); 
    }
    calculateBallDeltaPosition() {
        var delta = this.BALL_SPEED * this.DELTA_TIME / 1000.0; 
        var deltaPosition = new Delta(
            Math.cos(this.BALL_DIRECTION_ANGLE) * delta,
            Math.sin(this.BALL_DIRECTION_ANGLE) * delta
        ); 
        return deltaPosition;
    }
    checkForBallCollisionWithPlaygroundBorders() {
        if (this.isBallToHitPlaygroundTopOrBottomEdge()) {
            this.ball.flipYDirection();
        }
        if (this.isBallToHitPlaygroundLeftOrRightEdge()) {
            this.ball.flipXDirection();
        }
    }
    isBallToHitPlaygroundTopOrBottomEdge() {
        var isToHitTopBorder = this.playground.isPointToGetOutsideIn(this.ball.top, this.ball.deltaPosition);
        var isToHitBottomBorder = this.playground.isPointToGetOutsideIn(this.ball.bottom, this.ball.deltaPosition);
        return isToHitTopBorder || isToHitBottomBorder;
    }
    isBallToHitPlaygroundLeftOrRightEdge() {
        var isToHitLeftBorder = this.playground.isPointToGetOutsideIn(this.ball.left, this.ball.deltaPosition);
        var isToHitRightBorder = this.playground.isPointToGetOutsideIn(this.ball.right, this.ball.deltaPosition);
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
        var isToHitBottom = block.isPointToGetInsideOut(this.ball.top, this.ball.deltaPosition);
        var isToHitTop = block.isPointToGetInsideOut(this.ball.bottom, this.ball.deltaPosition); 
        return isToHitBottom || isToHitTop;
    }
    isBallToHitBlockLeftOrRightEdge(block) {
        var isToHitLeft = block.isPointToGetInsideOut(this.ball.right, this.ball.deltaPosition); 
        var isToHitRight = block.isPointToGetInsideOut(this.ball.left, this.ball.deltaPosition); 
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