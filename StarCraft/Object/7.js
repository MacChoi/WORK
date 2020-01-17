OBJECT[ID.SCV] = {
    IMG:20,
    SOUND:0,
    NEW:[
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
        -8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8],//image
        [NO_SOUND],//sound
        [0,0,0,0,1,0,0,0,0,2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,-1,0,0,0,0,-2,0,0,0,0,-3,0,0,0,0,-4],//x
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//y
        ],
};

function callbackScv(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB);

    switch (type) {
        case AnimateContainer.END_FRAME:
            break;
        case AnimateContainer.NEXT_FRAME:
            if(objA.isSelect){
                var curser_angle = _ENGINE.animateContainer.collision.getAngle(objA.x,objA.y,objA.targetX,objA.targetY);
                objA.angle = curser_angle;
                if(objA.isMove){
                    var targetObj = {x:objA.targetX-5,y:objA.targetY-5,w:objA.w,h:objA.h};
                    if(_ENGINE.animateContainer.collision.hitRectangle(objA,targetObj)){
                        objA.objectState = getAngleToStateNEW(objA);
                    }else{
                        objA.objectState = getAngleToStateMOVE(objA);
                    }
                }
                else if(objA.isHold)objA.objectState = getAngleToStateNEW(objA);
                else if(objA.isAttack)objA.objectState = getAngleToStateNEW(objA);
            }else{
                objA.objectState = getAngleToStateNEW(objA);
            }
        break;
        case AnimateContainer.COLLISION:

        break;
        case AnimateContainer.COLLISION_TOP:
        case AnimateContainer.COLLISION_BOTTOM:
        case AnimateContainer.COLLISION_LEFT:
        case AnimateContainer.COLLISION_RIGHT:
            objA.isMove =false;
            objA.objectState = getAngleToStateNEW(objA);
        break;
    }    
}