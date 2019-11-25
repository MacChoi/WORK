var _engine;
var _aniCon;
var _audio;

var _bg_obj;
var _bg_data;
var _bg_data2;
var _W;
var _H;

var _player_idx;
var _player_ani;

var _enemy_move_idx;
var _enemy_move_ani;

const _ENEMY_X =20;
const _ENEMY_Y =30;

window.onload = function(){
    _audio = new GAudio();
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGHT,60);
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

    _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
    _aniCon.setScale(2);
    _engine.setScale(2);

    _player_idx = _aniCon.newAnimate(ID.PLAYER,STATE[ID.PLAYER].NEW,130,250,1,null,callbackPlayer);
    _player_ani = _aniCon.getAnimate(_player_idx);

    _enemy_move_idx = _aniCon.newAnimate(ID.BG,STATE[ID.BG].MOVE,0,0,1,null,callbackBg);
    _enemy_move_ani = _aniCon.getAnimate(_enemy_move_idx);

    initEnemy(_ENEMY_X,_ENEMY_Y);
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
            break;
            case GEngine.KEY_SPACE:
                if(_aniCon.getCount(ID.MY_MISSILE) < 5)
                _aniCon.newAnimate(ID.MY_MISSILE,STATE[ID.MY_MISSILE].NEW,_player_ani.x ,_player_ani.y,1,null,callbackMyMissile);
            break;
        }
        e.preventDefault();
    });
}

function initEnemy(sX,sY){
    for(var x=0; x<_bg_data2[0].length; x++) {
        for(var y=0; y<_bg_data2.length; y++) {
            var pX = sX+ (x*_W);
            var pY = sY+ (y*_H);
            var value = {x:pX,y:pY};
            switch (_bg_data2[y][x]){
                case 1:
                    _aniCon.newAnimate(ID.ENEMY_1,STATE[ID.ENEMY_1].NEW,pX,pY,1,value,callbackEnemy);
                break;
                case 2:
                    _aniCon.newAnimate(ID.ENEMY_2,STATE[ID.ENEMY_2].NEW,pX,pY,1,value,callbackEnemy);
                break;
                case 3:
                    _aniCon.newAnimate(ID.ENEMY_3,STATE[ID.ENEMY_3].NEW,pX,pY,1,value,callbackEnemy);
                break;  
            }
        }
    }
}