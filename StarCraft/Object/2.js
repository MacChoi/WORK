OBJECT[ID.OVERLOAD] = {
    IMG:10,
    SOUND:0,
    NEW:[
    [0,0,0,0,1],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    ],
    MOVE_0:[
    [4,5],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_45:[
    [2,3],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_90:[
    [0,1],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_135:[
    [-2,-3],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_180:[
    [-4,-5],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_225:[
    [-6,-7],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_270:[
    [8,9],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_315:[
    [6,7],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
    MOVE_360:[
    [4,5],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
};

function callbackOverload(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.END_FRAME:
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
        break;
    }    
}