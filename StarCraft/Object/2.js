OBJECT[ID.CURSOR] = {
    IMG:22,
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
    [-6,0,0,0,6,0,0,0,-5,0,0,0,0,5],//x
    [0,0,0,0,0,0,0,0,0,5,0,0,0,-5],//y
    ],
    CURSOR_3:[
    [20,21],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
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
        case AnimateContainer.NEXT_FRAME:
            objA.x = mouseX - (objA.w/2);
            objA.y = mouseY - (objA.h/2);
        break;
    }    
}

const MOUSE_STATE_HOLD =-1
const MOUSE_STATE_MOVE =-2
const MOUSE_STATE_ATTACK =-3

const MOUSE_BUTTON_LEFT = 0;
const MOUSE_BUTTON_RIGHT = 2;
var mouseStartX,mouseStartY;
var mouseX,mouseY;
var mouseDown = false;
var mouseDownButton = false;
var mouseSelectRect = 0;

function onMouseDown(e) {
    mouseDown = true;
    mouseStartX = e.offsetX;
    mouseStartY = e.offsetY;
    mouseDownButton = event.button;

    if(mouseDownButton == MOUSE_BUTTON_RIGHT){
        _CURSOR.setState(STATE[ID.CURSOR].CURSOR_3,_CURSOR.x,_CURSOR.y);
        _ENGINE.animateContainer.setTarget(mouseX,mouseY);
        _ENGINE.animateContainer.setAllSelectState(MOUSE_STATE_MOVE);
    }
    else if(mouseDownButton == MOUSE_BUTTON_LEFT){
        if(_ENGINE.animateContainer.setSelectRect(mouseStartX /_ENGINE.scale,mouseStartY/_ENGINE.scale, _CURSOR.w, _CURSOR.h)){
            mouseStartX=0;mouseStartY=0;
            mouseDown = false;
            mouseDownButton = false;
            //_ENGINE.animateContainer.setAllSelectState(MOUSE_STATE_HOLD);
        }
    }
}

function onMouseUp(e) {
    if(mouseDown && mouseDownButton == MOUSE_BUTTON_LEFT ){
        if(_ENGINE.animateContainer.setSelectRect(mouseSelectRect.x,mouseSelectRect.y,mouseSelectRect.w,mouseSelectRect.h) == false)
        _ENGINE.animateContainer.setAllSelect(false);
    }
    
    _CURSOR.setState(STATE[ID.CURSOR].NEW,_CURSOR.x,_CURSOR.y);
    mouseStartX=0;mouseStartY=0;
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
        _ENGINE.getContext().strokeStyle = '#0c0';
        _ENGINE.getContext().strokeRect(startX, startY, Math.abs(width), Math.abs(height));
        _ENGINE.getContext().strokeStyle = '#fff';
        _CURSOR.setState(STATE[ID.CURSOR].CURSOR_1,_CURSOR.x,_CURSOR.y);

        _ENGINE.animateContainer.setAllSelect(false);
        mouseSelectRect = {x:startX/_ENGINE.scale,y:startY/_ENGINE.scale,w:Math.abs(width)/_ENGINE.scale,h:Math.abs(height)/_ENGINE.scale};
    }
}