OBJECT[ID.OVERLOAD] = {
    IMG:20,
    SOUND:0,
    NEW:[
        [0],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        ],
};

function callbackOverload(type,indexA,indexB,angle){
    var objA = _ENGINE.getObject(indexA);
    var objB = _ENGINE.getObject(indexB)
    switch (type) {
        case AnimateContainer.NEXT_FRAME:
            if(objA.isSelect){
                var curser_angle = _ENGINE.animateContainer.collision.getAngle(objA.x,objA.y,objA.targetX,objA.targetY);
                this.angle = curser_angle;
                if(objA.isMove){
                    objA.objectState = getAngleToStateMOVE(curser_angle);
                    objA.x -= Math.sin(curser_angle);
                    objA.y -= Math.cos(curser_angle);
                }
                else if(objA.isHold)objA.objectState = getAngleToStateNEW(curser_angle);
                else if(objA.isAttack)objA.objectState = getAngleToStateNEW(curser_angle);
            }else{
                objA.objectState = getAngleToStateNEW(objA.angle);
            }
        break;
        case AnimateContainer.COLLISION_TOP:
        case AnimateContainer.COLLISION_BOTTOM:
        case AnimateContainer.COLLISION_LEFT:
        case AnimateContainer.COLLISION_RIGHT:
            objA.isMove =false;
            objA.objectState = getAngleToStateMOVE(objA.angle);
        break;
    }    
}