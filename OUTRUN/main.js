var _engine,_engine2;
var _aniCon,_aniCon2;
var _bg_obj,_bg_data,_W,_H;
var _obj_player;
var _sky_idx,_hills_idx,_trees_idx;

GEngine.loadObjectFile(["BG","MY_CAR","CAR_FX","TREE","CARS"]);
window.onload = function(){
    _bg_obj = OBJECT[ID.BG];
    _bg_data = _bg_obj.DATA;
    _bg_data2 = _bg_obj.DATA2;
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGHT;
    
    _engine= new GEngine().setCanvas(_bg_obj.BG_WIDTH,_bg_obj.BG_HEIGHT-50);//.appendBodyChild();
    _engine.loadImageFile(function (type,count) {
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();  
        }
    });
    _engine2= new GEngine().setCanvas(_bg_obj.BG_WIDTH,_bg_obj.BG_HEIGHT);//.appendBodyChild();
    _aniCon = new AnimateContainer().setCollisonArray(_bg_data,_W,_H);
    _aniCon2 = new AnimateContainer().setCollisonArray(_bg_data,_W,_H);

    _engine.appendDivChild("canvas2");
    _engine2.appendDivChild("canvas1");

    _engine.startLoop(30,function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());

        _engine2.draw();
        _aniCon2.nextFrame(_engine2.getContext());
    });
}

function initGame(){
    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine2.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);

    _aniCon.newObject(ID.BG,STATE[ID.BG].ROAD,0,-130).setReverseX(1).setCallback(callbackRoad);
    _obj_player = _aniCon.newObject(ID.MY_CAR,STATE[ID.MY_CAR].NEW,240,250).setCallback(callbackCar);
    
    _sky_idx= _aniCon2.newAnimate(ID.BG,STATE[ID.BG].SKY,-150,0,1,null,callbackSky);
    _hills_idx=_aniCon2.newAnimate(ID.BG,STATE[ID.BG].HILLS,-300,0,1,null,callbackHills);

    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,150,110,-1,null,callbackTree);
    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,300,110,1,null,callbackTree);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _obj_player.setState(STATE[ID.MY_CAR].LEFT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30)
                .setReverseX(1).setCallback(callbackCarFx).setAniLoop(false);
          
                drawSkyHillsTrees(STATE[ID.BG].SKY_RIGHT,STATE[ID.BG].HILLS_RIGHT,STATE[ID.BG].TREES_RIGHT);
                break;
            case GEngine.KEY_RIGHT:
                _obj_player.setState(STATE[ID.MY_CAR].RIGHT,_obj_player.x,_obj_player.y);
                _aniCon.newObject(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_obj_player.x,_obj_player.y+30)
                .setReverseX(-1).setCallback(callbackCarFx).setAniLoop(false);
          
                drawSkyHillsTrees(STATE[ID.BG].SKY_LEFT,STATE[ID.BG].HILLS_LEFT,STATE[ID.BG].TREES_LEFT);
                break;
            case GEngine.KEY_DOWN:
                if(GEngine.LOOP_TIME < 200)GEngine.LOOP_TIME +=10;
            break;
            case GEngine.KEY_UP:
                if(GEngine.LOOP_TIME > 30)GEngine.LOOP_TIME -=10;
            break;
            case GEngine.KEY_SPACE:
            break;
        }
        e.preventDefault();
    });
}

function drawSkyHillsTrees(sky_state,hills_state){
    var _sky_ani = _aniCon2.getAnimate(_sky_idx);
    var _hills_ani = _aniCon2.getAnimate(_hills_idx);
    _aniCon2.setState(_sky_idx,sky_state,_sky_ani.x,_sky_ani.y);
    _aniCon2.setState(_hills_idx,hills_state,_hills_ani.x,_hills_ani.y);
}