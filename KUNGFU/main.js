var _engine;
var _aniCon;
var _audio;

var _bg_obj;
var _bg_data;
var _W;
var _H;

var _player_idx;
var _player_ani;

const PLAYER_START_POSITION = 160;
var _indexStartDrawMap=39;
var _previousPlayerX =0;
var _gapXdrawMap = -PLAYER_START_POSITION;
window.onload = function(){
    _audio = new GAudio();
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGTH);
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
    _H = _bg_obj.TILE_HEIGTH;

    _aniCon = new AnimateContainer();
    _aniCon.setGravityArray(_bg_data2,_W,_H);
    _aniCon.setIndexStartXGravityArray(_indexStartDrawMap);

    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
    //_engine.drawMap(_bg_data2,IMAGE[ID.BG],_W,_H);
    _player_idx = _aniCon.newAnimate(ID.PLAYER,STATE[ID.PLAYER].NEW,160,100,1,callbackPlayer);
    _player_ani = _aniCon.getAnimate(_player_idx);

    _aniCon.newAnimate(ID.ENEMY,STATE[ID.ENEMY].RIGHT,-100,100,1,callbackEnemy);
    _aniCon.newAnimate(ID.ENEMY,STATE[ID.ENEMY].RIGHT,-50,100,1,callbackEnemy);

    _aniCon.newAnimate(ID.BG,STATE[ID.BG].NEW,0,0,1,function(){});
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(-1);
                break;
            case GEngine.KEY_RIGHT:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_ani.x,_player_ani.y);
                _player_ani.setReverseX(1);
                break;
            case GEngine.KEY_DOWN:
            break;
            case GEngine.KEY_UP:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].UP,_player_ani.x,_player_ani.y);
            break;
            case GEngine.KEY_ALT:
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

function moveDrawMap(aniA){
    var gapX = (_previousPlayerX - aniA.x);
    // log("gapX: " +gapX);
    // log("_previousPlayerX: " +_previousPlayerX);
    // log("aniA.x: " +aniA.x);
    if(gapX < 0){
        if(_gapXdrawMap < 0){
            _indexStartDrawMap++;
            _gapXdrawMap = 35 + _gapXdrawMap;
        }else{
            _gapXdrawMap +=gapX;
            _aniCon.allAddXY(gapX,0);
        }
        _previousPlayerX=PLAYER_START_POSITION;
        aniA.x=PLAYER_START_POSITION;
    }else if(gapX > 0){
        if(_gapXdrawMap > 35){
            _indexStartDrawMap--;
            _gapXdrawMap = 45 - _gapXdrawMap;
        }else{
            _gapXdrawMap +=gapX;
            _aniCon.allAddXY(gapX,0);
        }
        _previousPlayerX=PLAYER_START_POSITION;
        aniA.x=PLAYER_START_POSITION;
    }

    if(_indexStartDrawMap > 39){
        _indexStartDrawMap = 39;
        _gapXdrawMap = 0;        
    }else if(_indexStartDrawMap < 0){
        _indexStartDrawMap = 0;
        _gapXdrawMap = 35; 
    }

    _aniCon.setIndexStartXGravityArray(_indexStartDrawMap);
    _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H, // map,image,sizeW,sizeH
    _indexStartDrawMap,0, //startX,startY
    11,6,//sizeX,sizeY
    _gapXdrawMap - _W,0);//mX,mY
    
    _previousPlayerX = aniA.x;
}