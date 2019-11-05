var _engine;
var _ani;

var _bg_obj;
var _bg_data;
var _W;
var _H;

var _player_idx;
var _player_ani;
window.onload = function(){
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGTH);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            initGame(); 
            initInput();
            loop();
        }else{
            //이미지 로딩중
        }
    });
    _ani = new AnimateContainer();
}

function initGame(){
    _bg_obj = OBJECT[ID.BG];
    _bg_data = _bg_obj.DATA;
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGTH;

    //_engine.getBufferContext().drawImage(IMAGE[ID.BG][2], 0, 0);
    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _player_idx = _ani.newAnimate(ID.PLAYER,STATE[ID.PLAYER].NEW,100,117,
        function(index){
            _ani.setState(_player_idx,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
        });
    _player_ani = _ani.getAnimate(_player_idx);
}

function loop(){
    var start = new Date().getTime();
    _engine.draw();
    _ani.nextFrame(_engine.getContext());
    var delay = new Date().getTime() - start ;
    _loopTimmer = setTimeout(this.loop, LOOP_TIME - delay);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _ani.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(-1);
                break;
            case GEngine.KEY_RIGHT:
                _ani.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(1);
                break;
            case GEngine.KEY_DOWN:
            break;
            case GEngine.KEY_UP:
                if(_player_ani.state != STATE[ID.PLAYER].UP)
                _ani.setState(_player_idx,STATE[ID.PLAYER].UP,_player_ani.x,_player_ani.y);
            break;
            case GEngine.KEY_SPACE:
                _ani.setState(_player_idx,STATE[ID.PLAYER].FIRE,_player_ani.x,_player_ani.y);
            break;
        }
        e.preventDefault();
    });
}