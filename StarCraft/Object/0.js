OBJECT[ID.BG] = {
    IMG:2,
    SOUND:0,
    NEW:[
    [0,1],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
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
    }    
}