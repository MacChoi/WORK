OBJECT[ID.FX] = {
    IMG:5,
    SOUND:1,
    NEW:[
    [0,1,2,3,4],//image
    [0],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    ]
};
    
function callbackFX(type,indexA,indexB){
    switch (type) {
        case AnimateContainer.END_FRAME:
           _aniCon.deleteAnimate(indexA); 
        break;    
    } 
}