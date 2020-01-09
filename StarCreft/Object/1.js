OBJECT[ID.CURSOR] = {
    IMG:2,
    SOUND:0,
    NEW:[
    [0,1],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
};

function callbacCursor(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.NEW_FRAME:
            _ENGINE.getCanvas().style.cursor = "none";
            _ENGINE.getCanvas().addEventListener("mousemove", onMouseMove, false);
            _ENGINE.getCanvas().addEventListener("mousedown", onMouseDown, false);
            _ENGINE.getCanvas().addEventListener("mouseup", onMouseUp, false);
            window.addEventListener("mouseup", onMouseUp, true);
            break;
        case AnimateContainer.END_FRAME:
            _ENGINE.setState(indexA,STATE[ID.CURSOR].NEW,mouseX - (objA.w/2),mouseY - (objA.h/2));
        break;
        case AnimateContainer.NEXT_FRAME:
            
        break;
    }    
}

const MOUSE_BUTTON_LEFT = 0;
const MOUSE_BUTTON_RIGHT = 2;
var mouseStartX,mouseStartY;
var mouseX,mouseY;
var mouseDown = false;
var mouseDownButton = false;

function onMouseDown(e) {
    mouseDown = true;
    mouseStartX = e.offsetX;
    mouseStartY = e.offsetY;

    mouseDownButton = event.button;

    log(mouseDownButton)
}

function onMouseUp(e) {
    mouseDown = false;
    mouseDownButton = false;
}

function onMouseMove(e) {
    mouseX = e.offsetX /_ENGINE.getScale();
    mouseY = e.offsetY /_ENGINE.getScale();

    if(mouseDown && mouseDownButton == MOUSE_BUTTON_LEFT){
        var startX = mouseStartX;
        var startY = mouseStartY;
        var width = e.offsetX - mouseStartX;
        var height = e.offsetY - mouseStartY;

        if(width <= 0)startX += width;
        if(height <= 0)startY += height;

        // log("mouseStartX :" + mouseStartX);
        // log("mouseStartY :" + mouseStartY);
        // log(" Math.abs(mouseStartX - e.offsetX) :" + (mouseStartX - e.offsetX));
        // log("Math.abs(mouseStartY - e.offsetY) :" + (mouseStartY - e.offsetY));
        _ENGINE.getContext().strokeRect(startX, startY, Math.abs(width), Math.abs(height));
    }
}