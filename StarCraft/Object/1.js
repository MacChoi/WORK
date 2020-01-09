OBJECT[ID.CURSOR] = {
    IMG:20,
    SOUND:0,
    NEW:[
    [0,1,2,3,4],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    ],
    CURSOR_1:[
    [5],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    ],
    CURSOR_2:[
    [6,7,8,9,10,11,12,13,14,15,16,17,18,19],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],//x
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],//y
    ]
};

function callbackCursor(type,indexA,indexB,angle){
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
            if(objA.state == STATE[ID.CURSOR].NEW)
            _ENGINE.setState(indexA,STATE[ID.CURSOR].NEW,mouseX - (objA.w/2),mouseY - (objA.h/2));
            else if(objA.state == STATE[ID.CURSOR].CURSOR_1)
            _ENGINE.setState(indexA,STATE[ID.CURSOR].CURSOR_1,mouseX - (objA.w/2),mouseY - (objA.h/2));
            else if(objA.state == STATE[ID.CURSOR].CURSOR_2)
            _ENGINE.setState(indexA,STATE[ID.CURSOR].CURSOR_2,mouseX - (objA.w/2),mouseY - (objA.h/2));
        break;
        case AnimateContainer.NONE_COLLISION:
            if(objA.state != STATE[ID.CURSOR].NEW && objA.state == STATE[ID.CURSOR].CURSOR_2)
            objA.setState(STATE[ID.CURSOR].NEW,mouseX - (objA.w/2),mouseY - (objA.h/2));
        break;
        case AnimateContainer.COLLISION:
            if(objA.state != STATE[ID.CURSOR].CURSOR_2)
            objA.setState(STATE[ID.CURSOR].CURSOR_2,mouseX - (objA.w/2),mouseY - (objA.h/2));
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
}

function onMouseUp(e) {
    mouseDown = false;
    mouseDownButton = false;
    _CURSOR.setState(STATE[ID.CURSOR].NEW,_CURSOR.x,_CURSOR.y);
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
        _ENGINE.getContext().strokeStyle = '#0c0';
        _ENGINE.getContext().strokeRect(startX, startY, Math.abs(width), Math.abs(height));
    
        _CURSOR.setState(STATE[ID.CURSOR].CURSOR_1,_CURSOR.x,_CURSOR.y);
    }
}