var _GMAE_ENGINE;
var _ANIMATE_CONTAINER;
var _BG,_VIEW;
var _RYU;

GEngine.loadObjectFile(["BG","RYU"]);
window.onload = function(){
    _GMAE_ENGINE = new GEngine().appendBodyChild();
    _ANIMATE_CONTAINER = new AnimateContainer(_GMAE_ENGINE);
    _GMAE_ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();
        }
    });
    _GMAE_ENGINE.startTimeLoop(60,function(){
        _ANIMATE_CONTAINER.drawNextFrame();
    });
}

function initGame(){
    var _COLLISION_DATA = OBJECT[ID.BG].COLLISION_DATA;
    _GMAE_ENGINE.setResizeCallback(function(event){
        _GMAE_ENGINE.setRatioCanvas(4,3);
        _ANIMATE_CONTAINER.setCollisonArray(_COLLISION_DATA);
        _ANIMATE_CONTAINER.drawMap(_COLLISION_DATA,IMAGE[ID.BG],_ANIMATE_CONTAINER.getUnitWidth(),_ANIMATE_CONTAINER.getUnitHeight());
        _ANIMATE_CONTAINER.drawCollisionArray(_COLLISION_DATA,IMAGE[ID.BG],_ANIMATE_CONTAINER.getUnitWidth(),_ANIMATE_CONTAINER.getUnitHeight());
    });
    
    _BG = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_BG,0,0);
    _VIEW = _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].NEW_VIEW,250,360).setCallback(callbackView);
    _RYU = _ANIMATE_CONTAINER.newObject(ID.RYU,STATE[ID.RYU].NEW,150,270).setCallback(callbackRyu);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _RYU.setState(STATE[ID.RYU].LEFT,_RYU.x,_RYU.y);
                _VIEW.setState(STATE[ID.BG].VIEW_LEFT,_VIEW.x,_VIEW.y);
                break;
            case GEngine.KEY_RIGHT:
                _RYU.setState(STATE[ID.RYU].RIGHT,_RYU.x,_RYU.y);
                _VIEW.setState(STATE[ID.BG].VIEW_RIGHT,_VIEW.x,_VIEW.y);
                break;
        }
        e.preventDefault();
    });
}