OBJECT[ID.TREE] = {
    IMG:4,
    SOUND:0,
    NEW:[
    [3,3,3,2,2,2,1,1],//image
    [NO_SOUND],//sound
    [15,15,15,30,30,35,40,40],//x
    [10,15,15,15,20,20,20,20],//y
    [3,3,3,2,2,2,1,1]//gravity power
    ],
};

function callbackTree(type,indexA,indexB){
    var aniA = _aniCon2.getAnimate(indexA);
    switch (type) {
        case AnimateContainer.COLLISION_LEFT:
        case AnimateContainer.COLLISION_RIGHT:
        case AnimateContainer.COLLISION_DOWN:
        case AnimateContainer.END_FRAME:
            if(_aniCon2.getCount(ID.TREE) < 5 & getRandom(0,2)==0){
                _aniCon2.deleteAnimate(indexA);
                if(aniA.reverseX == -1){
                    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,150,110,-1,null,callbackTree);
                }
                else{
                    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,300,110,1,null,callbackTree);
                }
            }
        break;
    }    
}