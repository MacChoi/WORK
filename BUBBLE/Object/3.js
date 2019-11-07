OBJECT[ID.MON] = {
    IMG:9,
    NEW:[
    [1,2],//image
    [0,0],//x
    [0,0],//y
    [5,5]//gravity power]
    ],
    RIGHT:[
    [-1,-2,-1,-2,-1,-2,-1,-2,-1,-2],//image
    [5,5,5,5,5,5,5,5,5,5],//x
    [0,0,0,0,0,0,0,0,0,0],//y
    [5,5,5,5,5,5,5,5,5,5]//gravity power
    ],
    UP:[
    [1,1,1,1,1,1,1,1],//image
    [0,0,0,0,0,0,0,0],//x
    [-10,-10,-10,-20,10,10,10,10],//y
    [5,5,5,5,5,5,5,5,5,5]//gravity power
    ],
    DIE:[
    [5,6,7,8,5,6,7,8],//image
    [-5,-5,-5,-5,5,5,5,5],//x
    [-5,-5,-5,-5,5,5,5,5],//y
    [0,0,0,0,5,5,5,5]//gravity power
    ],
    B_LEFT:[
    [3,4],//image
    [-5,-5],//x
    [0,0],//y
    ],
    B_RIGHT:[
    [3,4],//image
    [5,5],//x
    [0,0],//y
    ],
    B_UP:[
    [3,4],//image
    [0,0],//x
    [-5,-5],//y
    ],
    B_DOWN:[
    [3,4],//image
    [0,0],//x
    [5,5],//y
    ],
};

function callBackMon(type,indexA,indexB){
    var aniA = _ani.getAnimate(indexA);
    var aniB = _ani.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[ID.MON].DIE){
                _ani.deleteAnimate(indexA);
                break;
            }
            if(aniA.state == STATE[ID.MON].NEW)break;
            var idx_X=parseInt(aniA.x /_W);
            var idx_Y=parseInt(aniA.y /_H);
            if(_bg_data2[idx_Y][idx_X] == L){
                aniA.reverseX = 1;
                _ani.setState(indexA,STATE[ID.MON].B_LEFT,aniA.x,aniA.y);
            }
            else if(_bg_data2[idx_Y][idx_X] == R){
                aniA.reverseX = 1;
                _ani.setState(indexA,STATE[ID.MON].B_RIGHT,aniA.x,aniA.y);
            }
            else if(_bg_data2[idx_Y][idx_X] == U){
                _ani.setState(indexA,STATE[ID.MON].B_UP,aniA.x,aniA.y);
            }
            else if(_bg_data2[idx_Y][idx_X] == D){
                _ani.setState(indexA,STATE[ID.MON].B_DOWN,aniA.x,aniA.y);
            }
        break;
        case AnimateContainer.COLLISION:
            if(aniB.id == ID.BUBBLE){
                _ani.setState(indexA,STATE[ID.MON].B_LEFT,aniB.x,aniB.y);
                _ani.deleteAnimate(indexB);
            } 
            else if(aniB.id == ID.PLAYER){ 
                switch(aniA.state){
                    case STATE[ID.MON].B_LEFT:
                    case STATE[ID.MON].B_RIGHT:
                    case STATE[ID.MON].B_UP:
                    case STATE[ID.MON].B_DOWN:
                        _ani.setState(indexA,STATE[ID.MON].DIE,aniA.x,aniA.y);
                    break;
                }
            }
        break;
    }
}