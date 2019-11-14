OBJECT[ID.FX] = {
    IMG:1,
    SOUND:0,
    TYPE1_1:[
    [0,0,0],//image
    [NO_SOUND],//sound
    [5,5,10],//x
    [-1,-2,-3],//y
    ]
};

function callbackFX(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.END_FRAME:
            _aniCon.deleteAnimate(indexA);
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
        break;
    } 
}