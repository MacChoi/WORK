OBJECT[ID.ENEMY_MISSILE] = {
    IMG:1,
    SOUND:0,
    NEW:[
    [0,0],//image
    [NO_SOUND],//sound
    [0,0],//x
    [5,5],//y
    [5,5]//gravity power
    ]
};
    
function callbackEnemyMissile(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.COLLISION:
        break;
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.deleteAnimate(indexA);
        break;     
    } 
}