var _engine;
var _aniCon;
var _obj_bg,_W,_H;
var _obj_player;

GEngine.loadObjectFile(["BG","MY_CAR","CAR_FX","TREE","CARS"]);
window.addEventListener('resize', function(event){
    _engine.setRatioCanvas(4,3);

    _W = ((_engine.getCanvas().width)/ _obj_bg.COLLISION_DATA[0].length);
    _H = ((_engine.getCanvas().height)/ _obj_bg.COLLISION_DATA.length);
    
    _aniCon.setCollisonArray(_obj_bg.COLLISION_DATA,20,20);
    _aniCon.setScale(_engine.getScale());

    _engine.drawMap(_obj_bg.COLLISION_DATA,IMAGE[ID.BG],_W,_H);
});

window.onload = function(){
    _obj_bg = OBJECT[ID.BG];
    _engine = new GEngine().appendBodyChild();
    
    _engine.loadImageFile(function (type,count) {
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();
            window.dispatchEvent(new Event('resize'));
        }
    });

    _aniCon = new AnimateContainer();
    _engine.startLoop(30,function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
}

function initGame(){
    //_aniCon.newObject(ID.BG,STATE[ID.BG].ROAD,0,0).setReverseX(1);
   _obj_player = _aniCon.newObject(ID.MY_CAR,STATE[ID.MY_CAR].NEW,150,100).setCallback(callbackCar); 
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _obj_player.setState(STATE[ID.MY_CAR].LEFT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30).setAniLoop(false);
                break;
            case GEngine.KEY_RIGHT:
                _obj_player.setState(STATE[ID.MY_CAR].RIGHT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30).setReverseX(-1).setAniLoop(false);
                break;
        }
        e.preventDefault();
    });
}