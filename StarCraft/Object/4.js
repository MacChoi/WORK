OBJECT[ID.MARINE] = {
    IMG:20,
    SOUND:0,
    NEW:[
        [0],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [0],
        ],
};

function callbackMarine(type,indexA,indexB,angle){
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
                    var x=Math.sin(curser_angle);
                    var y=Math.cos(curser_angle);
                    var targetObj = {x:objA.targetX-5,y:objA.targetY-5,w:20,h:20};

                    if(_ENGINE.animateContainer.collision.hitRectangle(objA,targetObj)){
                        objA.isMove = false;
                        objA.objectState = getAngleToStateNEW(objA.angle);
                    }else{
                        objA.x -= x;
                        objA.y -= y;
                        objA.objectState = getAngleToStateMOVE(curser_angle);
                    }
                }
                else if(objA.isHold)objA.objectState = getAngleToStateNEW(curser_angle);
                else if(objA.isAttack)objA.objectState = getAngleToStateNEW(curser_angle);
            }else{
                objA.objectState = getAngleToStateNEW(objA.angle);
            }
        break;
        case AnimateContainer.COLLISION:

        break;
        case AnimateContainer.COLLISION_TOP:
        case AnimateContainer.COLLISION_BOTTOM:
        case AnimateContainer.COLLISION_LEFT:
        case AnimateContainer.COLLISION_RIGHT:
            objA.isMove =false;
            //objA.objectState = getAngleToStateNEW(objA.angle);
        break;
    }    
}