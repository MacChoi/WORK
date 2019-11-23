OBJECT[ID.PLAYER] = {
    IMG:6,
    SOUND:1,
    NEW:[
    [1],//image
    [NO_SOUND],//sound
    [0],//x
    [0],//y
    [5]//gravity power
    ],
    RIGHT:[
    [1,1,1,1],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
    ],
    DIE:[
    [2,3,4,5,4],//image
    [0],//sound
    [0,0,0,0,0],//x
    [0,0,0,0,0],//y 
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
        break;
        case AnimateContainer.COLLISION:
            if(_player_ani.glint != 0)return;
            if(aniB.id == ID.ENEMY_MISSILE || aniB.id == ID.ENEMY_1
                || aniB.id == ID.ENEMY_2|| aniB.id == ID.ENEMY_3)
            _aniCon.setState(indexA,STATE[ID.PLAYER].DIE,_player_ani.x,_player_ani.y);
        break;
    }    
}