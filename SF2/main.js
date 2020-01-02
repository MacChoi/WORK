var _GAME_ENGINE;
var _ANIMATE_CONTAINER;
var _BG,_VIEW;
var _RYU;

var _INPUT_KEY_QUEUE;

GEngine.loadObjectFile(["BG","RYU"]);
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
    _INPUT_KEY_QUEUE = new KeyQueue();
    _BG = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_BG,0,0);
    _VIEW = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_VIEW,250,360).setCallback(callbackView);
    _RYU = _ANIMATE_CONTAINER.newObject(ID.RYU,STATE[ID.RYU].NEW,130,270).setCallback(callbackRyu);

    //_ANIMATE_CONTAINER.newObject(ID.RYU,STATE[ID.RYU].NEW,350,270).setReverseX(-1).setCallback(callbackRyu);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        if(isComboKey(e) == true){
            _INPUT_KEY_QUEUE.clear();
            return;
        }

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
                _INPUT_KEY_QUEUE.clear();
                break;
            case GEngine.KEY_S:
                _RYU.setState(STATE[ID.RYU].KICK,_RYU.x,_RYU.y);
                _INPUT_KEY_QUEUE.clear();
                break; 
        }
        e.preventDefault();
    });
}

function isComboKey(e){
    if(_INPUT_KEY_QUEUE.getBeforValues() != e.keyCode){
        _INPUT_KEY_QUEUE.append(e.keyCode);
    }
    //log("_INPUT_KEY_QUEUE.get() " +_INPUT_KEY_QUEUE.get());

    switch (_INPUT_KEY_QUEUE.get()){
        case GEngine.KEY_UP + GEngine.KEY_LEFT :
            if(_RYU.state != STATE[ID.RYU].JUMP & _RYU.state != STATE[ID.RYU].JUMP_LEFT & _RYU.state != STATE[ID.RYU].JUMP_RIGHT){
                _RYU.setState(STATE[ID.RYU].JUMP_LEFT,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN); 
                return true;
            }
        break;
        case GEngine.KEY_UP + GEngine.KEY_RIGHT :
            if(_RYU.state != STATE[ID.RYU].JUMP & _RYU.state != STATE[ID.RYU].JUMP_LEFT & _RYU.state != STATE[ID.RYU].JUMP_RIGHT){
                _RYU.setState(STATE[ID.RYU].JUMP_RIGHT,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
                return true;
            }
        break;
        case GEngine.KEY_RIGHT + GEngine.KEY_DOWN + GEngine.KEY_A + GEngine.KEY_RIGHT:
            if(_RYU.state != STATE[ID.RYU].JUMP & _RYU.state != STATE[ID.RYU].JUMP_LEFT & _RYU.state != STATE[ID.RYU].JUMP_RIGHT){
                _RYU.setState(STATE[ID.RYU].JUMP_RIGHT,_RYU.x,_RYU.y).setNextState(STATE[ID.RYU].JUMP_DOWN);
                return true;
            }
        break;
    }
    return false;
}