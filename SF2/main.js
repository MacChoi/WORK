var _GAME_ENGINE;
var _ANIMATE_CONTAINER;
var _BG,_VIEW;
var _RYU;

GEngine.loadObjectFile(["BG","RYU","FX"]);
window.onload = function(){
    _GAME_ENGINE = new GEngine().appendBodyChild();
    _ANIMATE_CONTAINER = new AnimateContainer(_GAME_ENGINE);
    _GAME_ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _GAME_ENGINE.setResizeCallback(function(event){
                _GAME_ENGINE.setRatioCanvas(4,3);
                var COLLISION_DATA = OBJECT[ID.BG].COLLISION_DATA;
                _ANIMATE_CONTAINER.setCollisonArray(OBJECT[ID.BG].COLLISION_DATA);
                //_ANIMATE_CONTAINER.drawMap(COLLISION_DATA,IMAGE[ID.BG],_ANIMATE_CONTAINER.getUnitWidth(),_ANIMATE_CONTAINER.getUnitHeight());
                //_ANIMATE_CONTAINER.drawCollisionArray(COLLISION_DATA,IMAGE[ID.BG],_ANIMATE_CONTAINER.getUnitWidth(),_ANIMATE_CONTAINER.getUnitHeight());
            });

            initGame(); 
            initInput();
        }
    }).startTimeLoop(60,function(){
        _ANIMATE_CONTAINER.drawNextFrame();
    });
}

function initGame(){
    //GAudio.isOn=false;
    
    _BG = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_BG,0,0);
    _VIEW = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_VIEW,250,360).setCallback(callbackView);
    _RYU = _ANIMATE_CONTAINER.newObject(ID.RYU,STATE[ID.RYU].NEW,130,270).setCallback(callbackRyu);

    _ANIMATE_CONTAINER.newObject(ID.RYU,STATE[ID.RYU].NEW,350,270).setReverseX(-1).setCallback(callbackRyu);
}

var _KEY_MAP = new Map();
function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        if(isComboKey(e.keyCode))return;
        if(_RYU.state != STATE[ID.RYU].NEW)return;
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _RYU.setState(STATE[ID.RYU].LEFT,_RYU.x,_RYU.y);
                _VIEW.setState(STATE[ID.BG].VIEW_RIGHT,_VIEW.x,_VIEW.y);
                break;
            case GEngine.KEY_RIGHT:
                _RYU.setState(STATE[ID.RYU].RIGHT,_RYU.x,_RYU.y);
                _VIEW.setState(STATE[ID.BG].VIEW_LEFT,_VIEW.x,_VIEW.y);
                break;
            case GEngine.KEY_UP:
                _RYU.setState(STATE[ID.RYU].JUMP,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
                break;
            case GEngine.KEY_A:
                _RYU.setState(STATE[ID.RYU].PUNCH,_RYU.x,_RYU.y);
                break;
            case GEngine.KEY_S:
                _RYU.setState(STATE[ID.RYU].KICK,_RYU.x,_RYU.y);
                break;
            case GEngine.KEY_1:
                _RYU.setState(STATE[ID.RYU].SKILL_1,_RYU.x,_RYU.y);
                _ANIMATE_CONTAINER.newObject(ID.FX,STATE[ID.FX].NEW,_RYU.x,_RYU.y+15).setCallback(callbackFX);
                break;
            case GEngine.KEY_2:
                _RYU.setState(STATE[ID.RYU].SKILL_2,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
                break;
            case GEngine.KEY_3:
                _RYU.setState(STATE[ID.RYU].SKILL_3,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
                break;
        }
        e.preventDefault();
    });

    window.addEventListener( 'keyup', function(e) {
        _KEY_MAP.clear();
    });
}

function isComboKey(keyCode){
    _KEY_MAP.set(keyCode, true);
    if(_RYU.state == STATE[ID.RYU].JUMP 
        || _RYU.state == STATE[ID.RYU].JUMP_DOWN 
        || _RYU.state == STATE[ID.RYU].JUMP_LEFT 
        || _RYU.state == STATE[ID.RYU].JUMP_RIGHT
        || _RYU.state == STATE[ID.RYU].SKILL_1
        || _RYU.state == STATE[ID.RYU].SKILL_2
        || _RYU.state == STATE[ID.RYU].SKILL_3
        )return false;

    if (_KEY_MAP.has(GEngine.KEY_UP) && _KEY_MAP.has(GEngine.KEY_LEFT)) {
        _RYU.setState(STATE[ID.RYU].JUMP_LEFT,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
        return true;
    }else if (_KEY_MAP.has(GEngine.KEY_UP) && _KEY_MAP.has(GEngine.KEY_RIGHT)) {
        _RYU.setState(STATE[ID.RYU].JUMP_RIGHT,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
        return true;
    }else if (_KEY_MAP.has(GEngine.KEY_DOWN)  && _KEY_MAP.has(GEngine.KEY_LEFT) && _KEY_MAP.has(GEngine.KEY_RIGHT) && _KEY_MAP.has(GEngine.KEY_A)) {
        _RYU.setState(STATE[ID.RYU].SKILL_3,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
        return true;
    }else if (_KEY_MAP.has(GEngine.KEY_DOWN)  && _KEY_MAP.has(GEngine.KEY_RIGHT) && _KEY_MAP.has(GEngine.KEY_A)) {
        var uniId = _RYU.setState(STATE[ID.RYU].SKILL_1,_RYU.x,_RYU.y).getUniqueID();
        _ANIMATE_CONTAINER.newObject(ID.FX,STATE[ID.FX].NEW,_RYU.x,_RYU.y+15).setCallback(callbackFX).setValue(uniId);
        return true;
    }else if (_KEY_MAP.has(GEngine.KEY_DOWN)  && _KEY_MAP.has(GEngine.KEY_LEFT) && _KEY_MAP.has(GEngine.KEY_S)) {
        _RYU.setState(STATE[ID.RYU].SKILL_2,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
        return true;
    }
    return false;
}