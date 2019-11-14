OBJECT[ID.PLAYER] = {
    IMG:13,
    SOUND:0,
    NEW:[
    [1],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [5]//gravity power
    ],
    RIGHT:[
    [1,2,3,4],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    UP:[
    [11,11,11,11,11,11,11,11],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0,0],//x
    [-20,-20,-20,-20,20,20,20,20],//y
    [0,0,0,0,5,5,5,5]//gravity power
    ],
    UP_KICK:[
    [12,12,11,11],//image
    [NO_SOUND],//sound
    [0,0,0,0],//x
    [0,0,0,0],//y
    [15,15,15,15]//gravity power
    ],
    KICK:[
    [5,6,7,8,5],//image
    [NO_SOUND],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y
    [5,5,5,5,5]//gravity power
    ],
    PUNCH:[
    [5,9,10,5],//image
    [NO_SOUND],//sound
    [0,0,0,0],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    DIE:[
    [5,6,7,8,9,10],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0],//x
    [0,0,0,0,0,0],//y 
    ],
};


function callbackPlayer(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[ID.PLAYER].DIE){
                _aniCon.setState(indexA,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
                aniA.setGlint(100);
            }else{
                _aniCon.setState(indexA,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
            }

        break;
        case AnimateContainer.NEXT_FRAME:
            moveDrawMap(aniA);
        break;
        case AnimateContainer.COLLISION:

        break;
    }    
}