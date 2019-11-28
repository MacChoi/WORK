OBJECT[ID.TREE] = {
    IMG:4,
    SOUND:0,
    NEW:[
    [3,3,2,1],//image
    [NO_SOUND],//sound
    [10,40,100,130],//x
    [10,5,3,0],//y
    // [3,3,3,2,2,2,1,1]//gravity power
    ],
};

function callbackTree(type,indexA,indexB){
    var aniA = _aniCon2.getAnimate(indexA);
    switch (type) {
        case AnimateContainer.COLLISION_DOWN:
                _aniCon2.deleteAnimate(indexA);
        case AnimateContainer.END_FRAME:
            if(_aniCon2.getCount(ID.TREE) < 5 & getRandom(0,2)==0){
                
                if(aniA.reverseX == -1){
                    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,210,160,-1,null,callbackTree);
                }
                else{
                    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,260,160,1,null,callbackTree);
                }
                _aniCon2.deleteAnimate(indexA);
            }
        break;
    }    
}