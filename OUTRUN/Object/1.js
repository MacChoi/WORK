OBJECT[ID.MY_CAR] = {
    IMG:4,
    SOUND:0,
    NEW:[
    [2],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [5]//gravity power
    ],
    LEFT:[
    [1,1,1,1],//image
    [NO_SOUND],//sound
    [-1,-2,-3,-4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    RIGHT:[
    [2,2,2,2],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
};

function callbackCar(type,indexA,indexB){
    var aniA = _aniCon2.getAnimate(indexA);
    var aniB = _aniCon2.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            _aniCon2.setState(indexA,STATE[ID.MY_CAR].NEW,_player_ani.x,_player_ani.y);
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
        break;
    }    
}