OBJECT[ID.ENEMY] = {
    IMG:5,
    SOUND:0,
    NEW:[
    [-1,-4],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    [5,5]//gravity power
    ],
    RIGHT:[
    [-1,-2,-3,-1],//image
    [NO_SOUND],//sound
    [1,2,3,4],//x
    [0,0,0,0],//y
    [5,5,5,5]//gravity power
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
            if(aniA.state == STATE[ID.ENEMY].DIE){
                _aniCon.deleteAnimate(indexA);
                if(_aniCon.getCount(ID.ENEMY) < 4){
                    if(getRandom(0,2)==0)_aniCon.newAnimate(ID.ENEMY,STATE[ID.ENEMY].RIGHT,-50,100,1,callbackEnemy);
                    else _aniCon.newAnimate(ID.ENEMY,STATE[ID.ENEMY].RIGHT,290,100,-1,callbackEnemy); 
                }
            }else if(aniA.state == STATE[ID.ENEMY].NEW){
                _aniCon.setState(indexA,STATE[ID.ENEMY].RIGHT,aniA.x,_player_ani.y);
                aniA.setReverseX(aniA.reverseX * -1);
            }
        break;
        case AnimateContainer.NEXT_FRAME:
        break;
        case AnimateContainer.COLLISION:
            if(aniB.id == ID.PLAYER){
                switch (_player_ani.state){
                    case STATE[ID.PLAYER].UP_KICK:
                    case STATE[ID.PLAYER].KICK:
                    case STATE[ID.PLAYER].PUNCH:
                        if(_player_ani.reverseX != aniA.reverseX&
                            aniA.state != STATE[ID.ENEMY].DIE){
                            _aniCon.setState(indexA,STATE[ID.ENEMY].DIE,aniA.x,aniA.y);
                            _aniCon.newAnimate(ID.FX,STATE[ID.FX].TYPE_1,_player_ani.x,_player_ani.y,_player_ani.reverseX,callbackFX);
                        }
                    break;
                    default:
                        _aniCon.setState(indexA,STATE[ID.ENEMY].NEW,aniA.x,aniA.y);
                        _aniCon.setState(_player_idx,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
                    break;
                }    
            }
        break;
        case AnimateContainer.COLLISION_LEFT:
        case AnimateContainer.COLLISION_RIGHT:
            aniA.setReverseX(aniA.reverseX * -1);
        break;
    }    
}