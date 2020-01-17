OBJECT[ID.COMMON] = {
    IMG:2,
    SOUND:0,
    NEW_0:[
        [8],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_45:[
        [4],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_90:[
        [0],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_135:[
        [-4],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_180:[
        [-8],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_225:[
        [-12],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_270:[
        [16],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],
    NEW_315:[
        [8],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0]//gravity
        ],


    MOVE_0:[
        [8,9,10,11],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_45:[
        [4,5,6,7],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_90:[
        [0,1,2,3],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_135:[
        [-4,-5,-6,-7],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_180:[
        [-8,-9,-10,-11],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_225:[
        [-12,-13,-14,-15],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_270:[
        [16,17,18,19],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
    MOVE_315:[
        [12,13,14,15],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        [0,0,0,0],//gravity
        ],
};

function getAngleToStateNEW(obj){
    obj.index =0;
    const angle = obj.angle;
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

function getAngleToStateMOVE(obj){
    const angle = obj.angle;
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

    var x=Math.sin(angle);
    var y=Math.cos(angle);
    var stateObj = Object.values(OBJECT[ID.COMMON])[state];

    for (let index = 0; index < stateObj[0].length; index++) {
        stateObj[2][index] = x;
        stateObj[3][index] = y;
    }
    return stateObj
}