var _engine;
var _aniCon;
var _audio;

var _bg_obj;
var _bg_data;
var _W;
var _H;

var _player_idx;
var _player_ani;

window.onload = function(){
    _audio = new GAudio();
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGTH,60);
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
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGTH;

    _aniCon = new AnimateContainer();
    _aniCon.setGravityArray(_bg_data,_W,_H);

    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
    _aniCon.setScale(2);
    _engine.setScale(2);

    _player_idx = _aniCon.newAnimate(ID.PLAYER,STATE[ID.PLAYER].NEW,160,100,1,callbackPlayer);
    _player_ani = _aniCon.getAnimate(_player_idx);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(-1);
                break;
            case GEngine.KEY_RIGHT:
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(1);
                break;
            case GEngine.KEY_DOWN:
            break;
            case GEngine.KEY_UP:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].UP,_player_ani.x,_player_ani.y);
            break;
            case GEngine.KEY_SHIFT:
            case GEngine.KEY_A:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].PUNCH,_player_ani.x,_player_ani.y);
                break;
            case GEngine.KEY_SPACE:
            case GEngine.KEY_S:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].KICK,_player_ani.x,_player_ani.y);

                else if(_player_ani.state == STATE[ID.PLAYER].UP)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].UP_KICK,_player_ani.x,_player_ani.y);
            break;
        }
        e.preventDefault();
    });
}