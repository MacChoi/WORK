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

function callbackView(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.END_FRAME:
            _ENGINE.setState(indexA,STATE[ID.BG].NEW,objA.x,objA.y);
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
    }    
}