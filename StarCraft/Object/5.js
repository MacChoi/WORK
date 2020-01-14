OBJECT[ID.COMMAND_CENTER] = {
    IMG:6,
    SOUND:0,
    NEW:[
        [0,1,2,3,4],//image
        [NO_SOUND],//sound
        [0,0,0,0,0],//x
        [0,0,0,0,0],//y
        ],
    NEW_SCV:[
        [5,5],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
};

function callbackCommandCenter(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.NEXT_FRAME:
        
        break;
    }    
}