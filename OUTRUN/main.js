var _engine,_engine2;
var _aniCon,_aniCon2;
var _audio;

var _bg_obj,_bg_data,_W,_H;
var _player_idx,_player_ani;

var _sky_idx,_hills_idx,_trees_idx;

window.onload = function(){
    _audio = new GAudio();
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGHT,60,false);
    _engine.loadImageFile(function (type,index) {
        if(GEngine.END_FILE == type){
            _audio.loadSoundFile(function (type, index) {
                if(GEngine.END_FILE == type){
                    initGame(); 
                    initInput();
                }
            });
        }
    });
}

function initGame(){
    _bg_obj = OBJECT[ID.BG];
    _bg_data = _bg_obj.DATA;
    _bg_data2 = _bg_obj.DATA2;
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGHT;

    _aniCon = new AnimateContainer();
    _aniCon.setGravityArray(_bg_data,_W,_H);

    _engine2= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGHT,60,false);
    _aniCon2 = new AnimateContainer();
    _aniCon2.setGravityArray(_bg_data,_W,_H);

    var div = document.getElementById("canvas2"); 
    div.appendChild(_engine.canvas);

    var div2 = document.getElementById("canvas1"); 
    div2.appendChild(_engine2.canvas);

    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine2.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());

        _engine2.draw();
        _aniCon2.nextFrame(_engine2.getContext());
    });
    
   _aniCon.newAnimate(ID.BG,STATE[ID.BG].NEW,220,0,1,null,callbackBg);

    _player_idx = _aniCon.newAnimate(ID.CAR,STATE[ID.CAR].NEW,220,200,1,null,callbackCar);
    _player_ani = _aniCon.getAnimate(_player_idx);

    _sky_idx= _aniCon2.newAnimate(ID.BG,STATE[ID.BG].SKY,0,0,1,null,callbackSky);
    _hills_idx=_aniCon2.newAnimate(ID.BG,STATE[ID.BG].HILLS,0,0,1,null,callbackHills);
    _trees_idx=_aniCon2.newAnimate(ID.BG,STATE[ID.BG].TREES,0,0,1,null,callbackTrees);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _aniCon.setState(_player_idx,STATE[ID.CAR].LEFT,_player_ani.x,_player_ani.y);
                _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,1,null,callbackCarFx);
                drawSkyHillsTrees(STATE[ID.BG].SKY_LEFT,STATE[ID.BG].HILLS_LEFT,STATE[ID.BG].TREES_LEFT);
                break;
            case GEngine.KEY_RIGHT:
                _aniCon.setState(_player_idx,STATE[ID.CAR].RIGHT,_player_ani.x,_player_ani.y);
                _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,-1,null,callbackCarFx);
                drawSkyHillsTrees(STATE[ID.BG].SKY_RIGHT,STATE[ID.BG].HILLS_RIGHT,STATE[ID.BG].TREES_RIGHT);
                break;
            case GEngine.KEY_DOWN:
            break;
            case GEngine.KEY_UP:
            break;
            case GEngine.KEY_SPACE:
            break;
        }
        e.preventDefault();
    });
}

function drawSkyHillsTrees(sky_state,hills_state,trees_state){
    var _sky_ani = _aniCon2.getAnimate(_sky_idx);
    var _hills_ani = _aniCon2.getAnimate(_hills_idx);
    var _trees_ani = _aniCon2.getAnimate(_trees_idx);

    _aniCon2.setState(_sky_idx,sky_state,_sky_ani.x,_sky_ani.y);
    _aniCon2.setState(_hills_idx,hills_state,_hills_ani.x,_hills_ani.y);
    _aniCon2.setState(_trees_idx,trees_state,_trees_ani.x,_trees_ani.y);
}