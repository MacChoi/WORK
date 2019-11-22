OBJECT[ID.MY_MISSILE] = {
    IMG:1,
    SOUND:1,
    NEW:[
    [0,0],//image
    [0],//sound
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