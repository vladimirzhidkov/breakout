export class DOMContext {
    root;    
    constructor() {
        this.root= document.getElementById("root");
    }
    createElement(model, parentElement) {
        var element = document.createElement("div");
        this.setCoordinates(element, model);
        this.setDimentions(element, model);
        this.setBorder(element, model);
        this.setColor(element, model);
        element.style.position = parentElement ? "absolute" : "relative";
        parentElement = parentElement || this.root;
        parentElement.appendChild(element); 
        return element;
    }   
    updateColor(element, model) {
        this.setColor(element, model);
    }
    updatePosition(element, model) {
        this.setCoordinates(element, model);
    }
    setColor(element, model) {
        element.style.background = model.color;
    }
    setBorder(element, model) {
        element.style.borderRadius = model.border.radius + "px";
        element.style.borderWidth = model.border.width + "px";
        element.style.borderStyle = model.border.style;
        element.style.borderColor = model.border.color;  
    }
    setDimentions(element, model) {
        // border width is part of height/width, so height/width must be reduced by border width
        element.style.height = (model.dimensions.height - 2 * model.border.width) + "px";
        element.style.width = (model.dimensions.width - 2 * model.border.width) + "px";
    }
    setCoordinates(element, model) {
        element.style.left = model.position.x + "px";
        element.style.bottom = model.position.y + "px"; 
    }
}