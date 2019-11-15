OBJECT[ID.ENEMY] = {
    IMG:5,
    SOUND:0,
    NEW:[
    [1],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [5]//gravity power
    ],
    RIGHT:[
    [-1,-2,-3,-1],//image
    [NO_SOUND],//sound
    [0,0,0,0],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    DIE:[
    [5,6,7,8,9,10],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0],//x
    [0,0,0,0,0,0],//y 
    ],
};

function callbackEnemy(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
        
        break;
        case AnimateContainer.NEXT_FRAME:
       
        break;
        case AnimateContainer.COLLISION:

        break;
    }    
}