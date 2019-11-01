OBJECT[ID.BALL1] = {
    IMG:5,
    NEW_1:[
    [0],//image
    [10],//x
    [5],//y
    ],
    NEW_2:[
    [1],//image
    [10],//x
    [5],//y
    ],
    NEW_3:[
    [2],//image
    [10],//x
    [5],//y
    ],
    NEW_4:[
    [3],//image
    [10],//x
    [5],//y
    ],
    NEW_5:[
    [4],//image
    [10],//x
    [5],//y
    ],
    MOVE_1:[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//image
    [1,2,3,4,5,5,6,7,8,9,9,10,10,11,11,11,11,12,11,11,11,11,10,10,9,9,8,7,6,5,5,4,3,2,1],//x
    [-11,-11,-11,-11,-10,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,6,7,8,9,9,10,10,11,11,11,11],//y
    ],
    MOVE_2:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//image
    [1,2,3,4,5,5,6,7,8,9,9,10,10,10,10,9,9,8,7,6,5,5,4,3,2,1],//x
    [-10,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,6,7,8,9,9,10,10],//y
    ],
    MOVE_3:[
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],//image
    [1,2,3,4,5,5,6,7,8,9,9,9,9,8,7,6,5,5,4,3,2,1],//x
    [-9,-9,-8,-7,-6,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,6,7,8,9,9],//y
    ],
    MOVE_4:[
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],//image
    [1,2,3,4,5,5,6,7,8,8,7,6,5,5,4,3,2,1],//x
    [-8,-7,-6,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,6,7,8],//y
    ],
    MOVE_5:[
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4],//image
    [1,2,3,4,5,5,6,6,5,5,4,3,2,1],//x
    [-6,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,6],//y
    ]
};

function checkBallMove(index){
    var ball_state = _aniContainer.getAnimate(index);
    var move_type;
    switch(ball_state.state){
        case STATE[ID.BALL1].MOVE_1:
        case STATE[ID.BALL1].MOVE_2:
        case STATE[ID.BALL1].MOVE_3:
        case STATE[ID.BALL1].MOVE_4:
        case STATE[ID.BALL1].MOVE_5:
            var ball_idx_Y = parseInt((ball_state.y /_H));
            if(ball_state.reverseX == 1){
                var ball_idx_X = parseInt(((ball_state.x + ball_state.w)/_W));
                if(_bg_data[ball_idx_Y][ball_idx_X+1] != 0)ball_state.reverseX = -1;
            }else{
                var ball_idx_X = parseInt((ball_state.x/_W));
                if(_bg_data[ball_idx_Y][ball_idx_X-1] != 0)ball_state.reverseX = 1;
            }
        break;
    }

    switch(ball_state.state){
        case STATE[ID.BALL1].NEW_1:move_type = STATE[ID.BALL1].MOVE_1;break;
        case STATE[ID.BALL1].NEW_2:move_type = STATE[ID.BALL1].MOVE_2;break;
        case STATE[ID.BALL1].NEW_3:move_type = STATE[ID.BALL1].MOVE_3;break;
        case STATE[ID.BALL1].NEW_4:move_type = STATE[ID.BALL1].MOVE_4;break;
        case STATE[ID.BALL1].NEW_5:move_type = STATE[ID.BALL1].MOVE_5;break;
    }

    switch(ball_state.state){
        case STATE[ID.BALL1].NEW_1:
        case STATE[ID.BALL1].NEW_2:
        case STATE[ID.BALL1].NEW_3:
        case STATE[ID.BALL1].NEW_4:
        case STATE[ID.BALL1].NEW_5:
            var ball_idx_X = parseInt((ball_state.x/_W));
            var ball_idx_Y = parseInt(((ball_state.y + ball_state.h) /_H));
            if(ball_idx_Y > 20)ball_idx_Y-=1;
            if( _bg_data[ball_idx_Y][ball_idx_X] != 0)
            _aniContainer.setState(index,move_type,ball_state.x,ball_state.y);
        break;
    }
}