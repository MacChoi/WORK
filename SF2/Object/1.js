OBJECT[ID.RYU] = {
    IMG:6,
    SOUND:0,
    NEW:[
    [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,1,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//x
    [3,0,0,0,0,-3,0,0,0,0,-3,0,0,0,0,-3,0,0,0,0,6,0,0,0,0],//y
    [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],//y
    ],
    LEFT:[
    [1,2,3,4,5],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5,-5],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],
    RIGHT:[
    [1,2,3,4,5],//image
    [NO_SOUND],//sound
    [5,5,5,5,5],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],
};

function callbackRyu(type,indexA,indexB,angle){
    var aniA = _ANIMATE_CONTAINER.getAnimate(indexA);
    var aniB = _ANIMATE_CONTAINER.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            _ANIMATE_CONTAINER.setState(indexA,STATE[ID.RYU].NEW,aniA.x,aniA.y);
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
        break;
    }    
}