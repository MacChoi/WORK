OBJECT[ID.CARS] = {
    IMG:6,
    SOUND:1,
    NEW:[
    [2,2,2,2,2,2,2,2,2,2,2,2],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0,0,0,0,0,0],//x
    [9,9,9,9,9,9,9,9,9,9,9,9],//y
    [5,5,5,5,5,5,5,5,5,5,5,5],//gravity power
    ],
    RIGHT:[
    [5,5],//image
    [NO_SOUND],//sound
    [5,5],//x
    [0,0],//y
    ],
};

function callbackCars(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    switch (type) {
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.setState(indexA,STATE[ID.CARS].NEW,300,10);
        case AnimateContainer.END_FRAME:
        break;
    }    
}

function callbackCars2(type,indexA,indexB){
    var aniA = _aniCon2.getAnimate(indexA);
    switch (type) {
        case AnimateContainer.COLLISION_DOWN:
            _aniCon2.deleteAnimate(indexA);
        break;
        case AnimateContainer.END_FRAME:
        break;
    }    
}
