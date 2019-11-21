OBJECT[ID.ENEMY] = {
    IMG:16,
    SOUND:0,
    NEW:[
    [-1,-4],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    [5,5]//gravity power
    ],
    RIGHT_TURN:[
    [-8,-7,-8,-7,-6,-5,-4,-3,-2,-1,15,14,13,12,11,10,10,10],//image
    [NO_SOUND],//sound
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [-7,-1,-1,-2,-2,-2,-2,-1,-1,3,1,1,2,2,2,2,1,1],//x
    [3,2,2,1,0,0,-1,-2,-2,-3,-2,-2,-1,0,0,1,2,2],//y
    //[5,5,5,5]//gravity power
    ],
    MOVE:[
    [10,10,10,10,10,10,10,10,10,10],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5,-5,-5,-5,-5,-5,-5],//x
    [1,1,1,1,1,1,1,1,1,1],//y
    [5,5,5,5,5,5,5,5,5,5]//gravity power
    ],
    HOME:[
    [-7],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    ],
    DIE:[
    [-4,-4,-4,-4],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5],//x
    [5,5,5,5],//y 
    ],
};

function callbackEnemy(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[ID.ENEMY].RIGHT_TURN){
                _aniCon.setState(indexA,STATE[ID.ENEMY].MOVE,aniA.x,aniA.y);
                if(getRandom(0,1)==0)_aniCon.newAnimate(ID.MISSILE,STATE[ID.MISSILE].NEW,aniA.x,aniA.y -15,1,callbackMissile);
            }
            else if(aniA.state == STATE[ID.ENEMY].MOVE){
                if(getRandom(0,1)==0)_aniCon.newAnimate(ID.MISSILE,STATE[ID.MISSILE].NEW,aniA.x,aniA.y -15,1,callbackMissile);
            }
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
        break;
        case AnimateContainer.COLLISION_LEFT:
            _aniCon.setState(indexA,STATE[ID.ENEMY].MOVE,220,aniA.y);
        break;
        case AnimateContainer.COLLISION_RIGHT:
            _aniCon.setState(indexA,STATE[ID.ENEMY].MOVE,aniA.x,15);
        break;
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.setState(indexA,STATE[ID.ENEMY].HOME,aniA.x,15);
        break;
    }    
}