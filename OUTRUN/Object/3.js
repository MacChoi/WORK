OBJECT[ID.ENEMY_1] = {
    IMG:16,
    SOUND:1,
    NEW:[
    [-7,-7,-7,-7,-7,-7,-7,-7,-8,-8],//image
    [NO_SOUND],//sound
    [0,0,0,0,0,0,0,0,0,0,0],//x
    [0,0,0,0,0,0,0,0,0,0,0],//y  
    ],
    RIGHT_TURN:[
    [-8,-7,-8,-7,-6,-5,-4,-3,-2,-1,15,14,13,12,11,10,10,10],//image
    [0],//sound
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [-7,-1,-1,-2,-2,-2,-2,-1,-1,3,1,1,2,2,2,2,1,1],//x
    [3,2,2,1,0,0,-1,-2,-2,-3,-2,-2,-1,0,0,1,2,2],//y
    //[5,5,5,5]//gravity power
    ],
    MOVE:[
    [10,10,10,10,10,10,10,10,10,10],//image
    [NO_SOUND],//sound
    [-5,-5,-5,-5,-5,-5,-5,-5,-5,-5],//x
    [1,1,1,1,1,1,1,1,1,1],//y
    [5,5,5,5,5,5,5,5,5,5]//gravity power
    ],
    HOME:[
    [9,10],//image
    [NO_SOUND],//sound
    [0,0],//x
    [0,0],//y
    ],
};

function callbackEnemy(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[aniA.id].RIGHT_TURN){
                _aniCon.setState(indexA,STATE[aniA.id].MOVE,aniA.x,aniA.y);
                if(getRandom(0,10)==0)_aniCon.newAnimate(ID.ENEMY_MISSILE,STATE[ID.ENEMY_MISSILE].NEW,aniA.x,aniA.y -15,1,null,callbackEnemyMissile);
                if(getRandom(0,5)==0)aniA.setReverseX(aniA.reverseX * -1);
            }
            else if(aniA.state == STATE[aniA.id].MOVE){
                if(getRandom(0,10)==0)_aniCon.newAnimate(ID.ENEMY_MISSILE,STATE[ID.ENEMY_MISSILE].NEW,aniA.x,aniA.y -15,1,null,callbackEnemyMissile);
                if(getRandom(0,5)==0)aniA.setReverseX(aniA.reverseX * -1);
            }else if(aniA.state == STATE[aniA.id].NEW){
                if(getRandom(0,100)==0)_aniCon.setState(indexA,STATE[aniA.id].RIGHT_TURN,aniA.x,aniA.y);
            }
        break;
        case AnimateContainer.NEXT_FRAME:
            if(aniA.state == STATE[aniA.id].NEW)
            aniA.x = aniA.value.x + _enemy_move_ani.x;

            if(aniA.state == STATE[aniA.id].HOME)
            moveHome(aniA,indexA);
        break;
        case AnimateContainer.COLLISION:
            if(aniB.id == ID.MY_MISSILE){
                _aniCon.deleteAnimate(indexB);
                _aniCon.deleteAnimate(indexA);
                _aniCon.newAnimate(ID.FX,STATE[ID.FX].NEW,aniA.x,aniA.y,1,null,callbackFX);

                if(_aniCon.getCount(ID.ENEMY_1) + _aniCon.getCount(ID.ENEMY_2) +_aniCon.getCount(ID.ENEMY_3) == 0)
                initEnemy(_ENEMY_X,_ENEMY_Y);
            }
        break;
        case AnimateContainer.COLLISION_LEFT:
            _aniCon.setState(indexA,STATE[aniA.id].MOVE,220,aniA.y);
        break;
        case AnimateContainer.COLLISION_RIGHT:
            _aniCon.setState(indexA,STATE[aniA.id].MOVE,aniA.x,15);
        break;
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.setState(indexA,STATE[aniA.id].HOME,aniA.x,15);
        break;
    }    
}

function moveHome(aniA,indexA){
    var posX = aniA.value.x + _enemy_move_ani.x;
    var posY = aniA.value.y;
 
    if(aniA.x< posX)aniA.x +=1;
    else if(aniA.x > posX)aniA.x -=1;
  
    if(aniA.y < posY)aniA.y +=1;
    else if(aniA.y > posY)aniA.y -=1;
    
    if(aniA.x == posX && aniA.y == posY){
        _aniCon.setState(indexA,STATE[aniA.id].NEW,posX,posY);
        return;
    }
}