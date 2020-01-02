OBJECT[ID.RYU] = {
    IMG:35,
    SOUND:0,
    NEW:[
    [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//x
    [0,0,0,0,0,0,0,0,0,-3,0,3,0,0,0],//y
    [5,5,5,0,5,0,5,5,5,0,5,0,5,5,5],//gravity
    ],
    LEFT:[
    [17,16,15,14,13,12],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5,-5,-5],//x
    [1,2,3,3,2,1],//y
    [5,5,5,5,5,5]//gravity
    ],
    RIGHT:[
    [11,10,9,8,7,6],//image
    [NO_SOUND],//sound
    [5,5,5,5,5,5],//x
    [1,2,3,3,2,1],//y
    [5,5,5,5,5,5]//gravity
    ],
    JUMP:[
    [18,19,20,21,22,23,24],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0],//x
    [-0,-10,-20,-30,-20,-10,-0],//y
    ],
    JUMP_DOWN:[
    [24,24,24,5,5],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    [20,20,20,20,20]//gravity
    ],
    JUMP_LEFT:[
    [30,30,30,29,29,29,28,28,28,27,27,27,26,26,26,25,25,25],//image
    [NO_SOUND],//sound
    [0,-10,-10,-10,-10,-10,0,0,0,0,0,-10,0,0,0,0,0,0],//x
    [-10,0,0,0,0,-50,0,0,0,0,0,0,0,0,0,0,0,0],//y
    ],
    JUMP_RIGHT:[
    [25,25,25,26,26,26,27,27,27,28,28,28,29,29,29,30,30,30],//image
    [NO_SOUND],//sound
    [0,10,10,10,10,10,0,0,0,0,0,10,0,0,0,0,0,0],//x
    [-10,0,0,0,0,-50,0,0,0,0,0,0,0,0,0,0,0,0],//y
    ], 
    PUNCH:[
    [31,31,31,32,32],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],
    KICK:[
    [33,33,33,34,34],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity
    ],  
};

function callbackRyu(type,indexA,indexB,angle){
    var objA = _ANIMATE_CONTAINER.getObject(indexA);
    var objB = _ANIMATE_CONTAINER.getObject(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            _ANIMATE_CONTAINER.setState(indexA,STATE[ID.RYU].NEW,objA.x,objA.y);
        break;
        case AnimateContainer.NEXT_FRAME:
            
        break;
        case AnimateContainer.COLLISION:
        break;

        case AnimateContainer.COLLISION_LEFT:
            objA.x =30;
        break;

        case AnimateContainer.COLLISION_RIGHT:
            objA.x =400;
        break;
    }    
}