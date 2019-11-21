OBJECT[ID.MY_MISSILE] = {
    IMG:1,
    SOUND:0,
    NEW:[
    [0,0],//image
    [NO_SOUND],//sound
    [0,0],//x
    [-5,-5],//y
    ]
};

function callbackMyMissile(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.COLLISION_UP:
            _aniCon.deleteAnimate(indexA);
        break;
        
    } 
}