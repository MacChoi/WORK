var _engine;
var _aniCon;
var _audio;

var _bg_obj;
var _bg_data;
var _W;
var _H;

var _player_idx;
var _player_ani;

var _indexMoveMap=39;
var _prePlayerX =0;
var _tmpMoveTile = 0;

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

    _aniCon.setIndexStartXGravityArray(_indexMoveMap);

    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });
    //_engine.drawMap(_bg_data2,IMAGE[ID.BG],_W,_H);

    _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H, // map,image,sizeW,sizeH
        _indexMoveMap,0, //startX,startY
        10,6,//sizeX,sizeY
        0,0);//mX,mY

    // _aniCon.setScale(2);
    // _engine.setScale(2);

    _player_idx = _aniCon.newAnimate(ID.PLAYER,STATE[ID.PLAYER].NEW,170,100,callbackPlayer);
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
            case GEngine.KEY_DOWN:
            break;
            case GEngine.KEY_UP:
                if(_player_ani.state == STATE[ID.PLAYER].NEW)
                _aniCon.setState(_player_idx,STATE[ID.PLAYER].UP,_player_ani.x,_player_ani.y);
            break;
            case GEngine.KEY_SPACE:
                var index= _aniCon.newAnimate(ID.BG,STATE[ID.BG].NEW,0,0,function(type,indexA,indexB){    
                    switch (type) {
                        case AnimateContainer.END_FRAME:
                            
                        break;
                        case AnimateContainer.SOUND_ENDED:
                            break;
                    }

                });
            break;
        }
        e.preventDefault();
    });
}

function callbackPlayer(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[ID.PLAYER].DIE){
                _aniCon.setState(indexA,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
                aniA.setGlint(100);
            }else{
                _aniCon.setState(indexA,STATE[ID.PLAYER].NEW,_player_ani.x,_player_ani.y);
            }

        break;
        case AnimateContainer.NEXT_FRAME:
            var gapX = (_prePlayerX -aniA.x);
            if(gapX == -5){
                log(_tmpMoveTile)
                if(_tmpMoveTile < 0){
                    _indexMoveMap++;
                    _tmpMoveTile = 35 + _tmpMoveTile;
                }else{
                    _tmpMoveTile -=5;
                }
            }else if(gapX == 5){
                if(_tmpMoveTile > 35){
                    _indexMoveMap--;
                    _tmpMoveTile = 45 - _tmpMoveTile;
                }else{
                    _tmpMoveTile +=5;
                }
            }
            
            _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H, // map,image,sizeW,sizeH
            _indexMoveMap,0, //startX,startY
            11,6,//sizeX,sizeY
            _tmpMoveTile - _W,0);//mX,mY
                //log(_prePlayerX -aniA.x)
            _prePlayerX = aniA.x;
        break;
        case AnimateContainer.COLLISION:

        break;
    }    
}