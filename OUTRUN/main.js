var _engine,_engine2;
var _aniCon,_aniCon2;
var _bg_obj,_bg_data,_W,_H;
var _player_idx,_player_ani;
var _sky_idx,_hills_idx,_trees_idx;

GEngine.loadObjectFile(["BG","MY_CAR","CAR_FX","TREE","CARS"]);

window.onload = function(){
    _bg_obj = OBJECT[ID.BG];
    _bg_data = _bg_obj.DATA;
    _bg_data2 = _bg_obj.DATA2;
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGHT;
    
    _engine= new GEngine().setCanvas(_bg_obj.BG_WIDTH,_bg_obj.BG_HEIGHT-50);
    _engine.loadImageFile(function (type,count) {
        if(GEngine.END_FILE == type){
            initGame(); 
            initInput();  
        }
    });
    _engine2= new GEngine().setCanvas(_bg_obj.BG_WIDTH,_bg_obj.BG_HEIGHT);

    _aniCon = new AnimateContainer().setGravityArray(_bg_data,_W,_H);
    _aniCon2 = new AnimateContainer().setGravityArray(_bg_data,_W,_H);

    appendDivChild("canvas2",_engine.canvas);
    //appendDivChild("canvas1",_engine2.canvas);

    _engine.startLoop(30,function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());

        _engine2.draw();
        _aniCon2.nextFrame(_engine2.getContext());
    });
}

function initGame(){
    //_aniCon.newAnimate(ID.BG,STATE[ID.BG].ROAD,220,-150,1,null,callbackRoad);
    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine2.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    
    _aniCon.newObject(ID.BG,STATE[ID.BG].ROAD,220,-150)
    .setReverseX(1)
    .setValue(1)
    .setCallback(callbackRoad);

    _sky_idx= _aniCon2.newAnimate(ID.BG,STATE[ID.BG].SKY,300,0,1,null,callbackSky);
    _hills_idx=_aniCon2.newAnimate(ID.BG,STATE[ID.BG].HILLS,0,0,1,null,callbackHills);

    _player_idx = _aniCon.newAnimate(ID.MY_CAR,STATE[ID.MY_CAR].NEW,240,250,1,null,callbackCar);
    _player_ani = _aniCon.getAnimate(_player_idx);
 
    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,150,110,-1,null,callbackTree);
    _aniCon2.newAnimate(ID.TREE,STATE[ID.TREE].NEW,300,110,1,null,callbackTree);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _aniCon.setState(_player_idx,STATE[ID.MY_CAR].LEFT,_player_ani.x,_player_ani.y);
                var idx = _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,1,null,callbackCarFx);
                var ani = _aniCon.getAnimate(idx);
                ani.setAniLoop(false);
                
                drawSkyHillsTrees(STATE[ID.BG].SKY_RIGHT,STATE[ID.BG].HILLS_RIGHT,STATE[ID.BG].TREES_RIGHT);
                break;
            case GEngine.KEY_RIGHT:
                _aniCon.setState(_player_idx,STATE[ID.MY_CAR].RIGHT,_player_ani.x,_player_ani.y);
                var idx = _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,-1,null,callbackCarFx);
                var ani = _aniCon.getAnimate(idx);
                ani.setAniLoop(false);

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