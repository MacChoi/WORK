OBJECT[ID.FX] = {
    IMG:1,
    SOUND:0,
    TYPE_1:[
    [0,0],//image
    [NO_SOUND],//sound
    [0,10],//x
    [0,-10],//y
    ]
};

function callbackFX(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.END_FRAME:
            _aniCon.deleteAnimate(indexA);
        break;
    } 
}