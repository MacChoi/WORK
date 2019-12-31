OBJECT[ID.BG] = {
    IMG:4,
    SOUND:1,
    COLLISION_DATA:[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ],
    NEW_BG:[
    [2],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    ],
    NEW_VIEW:[
    [3],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [5]//gravity
    ],
    VIEW_LEFT:[
    [3,3,3,3,3],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5,-5],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],
    VIEW_RIGHT:[
    [3,3,3,3,3],//image
    [NO_SOUND],//sound
    [5,5,5,5,5],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],
};

function callbackView(type,indexA,indexB,angle){
    var aniA = _ANIMATE_CONTAINER.getAnimate(indexA);
    var aniB = _ANIMATE_CONTAINER.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            _ANIMATE_CONTAINER.setState(indexA,STATE[ID.BG].NEW_VIEW,aniA.x,aniA.y);
        break;
        case AnimateContainer.NEXT_FRAME:
            _BG.setState(STATE[ID.BG].NEW_BG,aniA.x-500,_BG.y);
        break;
        case AnimateContainer.COLLISION:
        break;
    }    
}