var _engine;
var _aniCon;
var _bg_obj,_bg_data,_W,_H;
var _obj_player;
GEngine.loadObjectFile(["BG","MY_CAR","CAR_FX","TREE","CARS"]);
window.onload = function(){
    _bg_obj = OBJECT[ID.BG];
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGHT;
    
    _engine = new GEngine().appendBodyChild();
    _engine.loadImageFile(function (type,count) {
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();
            window.dispatchEvent(new Event('resize'));
        }
    });

    _aniCon = new AnimateContainer().setCollisonArray(_bg_obj.COLLISION_DATA,_W,_H);
    _engine.startLoop(30,function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
}

window.addEventListener('resize', function(event){
    _engine.setRatioCanvas(4,3);
    _aniCon.setScale(_engine.getScale());
    _engine.drawMap(_bg_obj.DATA,IMAGE[ID.BG],_W,_H);
});

function initGame(){
    _aniCon.newObject(ID.BG,STATE[ID.BG].ROAD,0,0).setReverseX(1);
    _obj_player = _aniCon.newObject(ID.MY_CAR,STATE[ID.MY_CAR].NEW,150,250).setCallback(callbackCar); 
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _obj_player.setState(STATE[ID.MY_CAR].LEFT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30)
                .setReverseX(1).setCallback(callbackCarFx).setAniLoop(false);
          
                break;
            case GEngine.KEY_RIGHT:
                _obj_player.setState(STATE[ID.MY_CAR].RIGHT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30)
                .setReverseX(-1).setCallback(callbackCarFx).setAniLoop(false);
                break;
        }
        e.preventDefault();
    });
}