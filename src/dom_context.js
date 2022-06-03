export class DOMContext {
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