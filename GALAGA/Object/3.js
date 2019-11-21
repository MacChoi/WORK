OBJECT[ID.MISSILE] = {
    IMG:1,
    SOUND:0,
    NEW:[
    [0,0],//image
    [NO_SOUND],//sound
    [0,1],//x
    [0,1],//y
    [5,5]//gravity power
    ]
};

function callbackMissile(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.deleteAnimate(indexA);
        break;
    } 
}