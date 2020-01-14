OBJECT[ID.COMMON] = {
    IMG:0,
    SOUND:0,
    NEW_0:[
        [4],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        ],
    NEW_45:[
        [2],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_90:[
        [0],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_135:[
        [-2],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_180:[
        [-4],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_225:[
        [-6],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_270:[
        [8],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    NEW_315:[
        [6],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],


    MOVE_0:[
        [4,5],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_45:[
        [2,3],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_90:[
        [0,1],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_135:[
        [-2,-3],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_180:[
        [-4,-5],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_225:[
        [-6,-7],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_270:[
        [8,9],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
    MOVE_315:[
        [6,7],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        ],
};

function getAngleToStateNEW(angle){
    var state = STATE[ID.COMMON].NEW_0;
    if(angle >= 0 && angle < 22.5){
        state = STATE[ID.COMMON].NEW_0;
    }else if(angle >= 22.5 && angle < 67.5){
        state = STATE[ID.COMMON].NEW_45;
    }else if(angle >= 67.5 && angle < 112.5){
        state = STATE[ID.COMMON].NEW_90;
    }else if(angle >= 112.5 && angle < 157.5){
        state = STATE[ID.COMMON].NEW_135;
    }else if(angle >= 157.5 && angle < 200.5){
        state = STATE[ID.COMMON].NEW_180;
    }else if(angle >= 200.5 && angle < 247.5){
        state = STATE[ID.COMMON].NEW_225;
    }else if(angle >= 247.5 && angle < 292.5){
        state = STATE[ID.COMMON].NEW_270;
    }else if(angle >= 292.5 && angle < 337.5){
        state = STATE[ID.COMMON].NEW_315;
    }else if(angle >= 337.5 && angle < 360){
        state = STATE[ID.COMMON].NEW_0;
    }
    return Object.values(OBJECT[ID.COMMON])[state];
}

function getAngleToStateMOVE(angle){
    var state = STATE[ID.COMMON].MOVE_0;
    if(angle >= 0 && angle < 22.5){
        state = STATE[ID.COMMON].MOVE_0;
    }else if(angle >= 22.5 && angle < 67.5){
        state = STATE[ID.COMMON].MOVE_45;
    }else if(angle >= 67.5 && angle < 112.5){
        state = STATE[ID.COMMON].MOVE_90;
    }else if(angle >= 112.5 && angle < 157.5){
        state = STATE[ID.COMMON].MOVE_135;
    }else if(angle >= 157.5 && angle < 200.5){
        state = STATE[ID.COMMON].MOVE_180;
    }else if(angle >= 200.5 && angle < 247.5){
        state = STATE[ID.COMMON].MOVE_225;
    }else if(angle >= 247.5 && angle < 292.5){
        state = STATE[ID.COMMON].MOVE_270;
    }else if(angle >= 292.5 && angle < 337.5){
        state = STATE[ID.COMMON].MOVE_315;
    }else if(angle >= 337.5 && angle < 360){
        state = STATE[ID.COMMON].MOVE_0;
    }
    return Object.values(OBJECT[ID.COMMON])[state];
}