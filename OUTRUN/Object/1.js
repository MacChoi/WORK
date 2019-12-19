OBJECT[ID.MY_CAR] = {
    IMG:5,
    SOUND:0,
    NEW:[
    [4],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [10]//gravity power
    ],
    LEFT:[
    [2,2,2,2],//image
    [NO_SOUND],//sound
    [-1,-2,-3,-4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    RIGHT:[
    [3,3,3,3],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    CRASH:[
    [2,3,2,3],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ]
};

function callbackCar(type,indexA,indexB){
    var aniA = _ANIMATE_CONTAINER.getAnimate(indexA);
    var aniB = _ANIMATE_CONTAINER.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            _ANIMATE_CONTAINER.setState(indexA,STATE[ID.MY_CAR].NEW,_PLAYER.x,_PLAYER.y);
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
    }    
}