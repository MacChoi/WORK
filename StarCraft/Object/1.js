OBJECT[ID.BG] = {
    IMG:1,
    SOUND:0,
    NEW:[
    [0],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    ],
};

function callbackBG(type,indexA,indexB,angle){
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