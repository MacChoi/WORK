OBJECT[ID.CAR_FX] = {
    IMG:4,
    SOUND:0,
    LEFT:[
    [0,1,2,3],//image
    [0],//sound
    [-1,-2,-3,-4],//x
    [-1,-2,-3,-4],//y
    ]
};

function callbackCarFx(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.END_FRAME:
            _aniCon2.deleteAnimate(indexA);
        break; 
    } 
}