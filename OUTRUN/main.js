var _GMAE_ENGINE;
var _ANIMATE_CONTAINER;
var _PLAYER;

GEngine.loadObjectFile(["BG","MY_CAR","CAR_FX"]);
window.onload = function(){
    _GMAE_ENGINE = new GEngine().appendBodyChild();
    _ANIMATE_CONTAINER = new AnimateContainer().setEngine(_GMAE_ENGINE);
    _GMAE_ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();
        }
    });
}

function initGame(){
    var _COLLISION_DATA = OBJECT[ID.BG].COLLISION_DATA;
    _GMAE_ENGINE.setResizeCallback(function(event){
        _GMAE_ENGINE.setRatioCanvas(4,3);
        _ANIMATE_CONTAINER.setCollisonArray(_COLLISION_DATA);
        //_ANIMATE_CONTAINER.drawMap(_COLLISION_DATA,IMAGE[ID.BG],_ANIMATE_CONTAINER.getUnitWidth(),_ANIMATE_CONTAINER.getUnitHeight());
        _ANIMATE_CONTAINER.drawCollisionArray(_COLLISION_DATA,IMAGE[ID.BG],true);
    });

    _GMAE_ENGINE.startTimeLoop(25,function(){
        _ANIMATE_CONTAINER.drawNextFrame();
    });   
    
    _ANIMATE_CONTAINER.newObject(ID.BG,STATE[ID.BG].ROAD,15,0).setReverseX(1);
    _PLAYER = _ANIMATE_CONTAINER.newObject(ID.MY_CAR,STATE[ID.MY_CAR].NEW,150,0).setCallback(callbackCar);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _PLAYER.setState(STATE[ID.MY_CAR].LEFT,_PLAYER.x,_PLAYER.y);
                _ANIMATE_CONTAINER.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_PLAYER.x,_PLAYER.y+30).setAniLoop(false);
                break;
            case GEngine.KEY_RIGHT:
                _PLAYER.setState(STATE[ID.MY_CAR].RIGHT,_PLAYER.x,_PLAYER.y);
                _ANIMATE_CONTAINER.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_PLAYER.x,_PLAYER.y+30).setReverseX(-1).setAniLoop(false);
                break;
        }
        e.preventDefault();
    });
}