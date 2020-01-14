OBJECT[ID.OVERLOAD] = {
    IMG:10,
    SOUND:0,
    NEW:[
        [0,0],//image
        [NO_SOUND],//sound
        [0,0,0,0],//x
        [0,0,0,0],//y
        ],
};

function callbackOverload(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.NEW_FRAME:
        break;
        case AnimateContainer.END_FRAME:
        break;
        case AnimateContainer.NEXT_FRAME:
            if(objA.isSelect){
                var curser_angle = _ENGINE.animateContainer.collision.getAngle(objA.x,objA.y,objA.targetX,objA.targetY);
                if(objA.isMove){
                    objA.objectState = getAngleToStateMOVE(curser_angle);
                    objA.x -= Math.sin(curser_angle);
                    objA.y -= Math.cos(curser_angle);
                }
                else if(objA.isHold)objA.objectState = getAngleToStateNEW(curser_angle);
                else if(objA.isAttack)objA.objectState = getAngleToStateNEW(curser_angle);
            }
        break;
        case AnimateContainer.COLLISION:
             
        break;
    }    
}