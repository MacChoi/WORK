var _engine;
var _aniCon;

var _bg_obj;
var _bg_data;
var _W;
var _H;

var _player_idx;
var _player_ani;

var _indexMoveMap=35;
window.onload = function(){
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGTH);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            initGame(); 
            initInput();
        }else{
            //이미지 로딩중
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
    
    //_engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);
    _engine.startLoop(function(){
        _engine.draw();
        _aniCon.nextFrame(_engine.getContext());
    });

    //50 x 6
//drawMoveMap(map,image,sizeW,sizeH,startX,startY,sizeX,sizeY,mX,mY){
    _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H,_indexMoveMap,0,10,6,-_W,0);
    // _aniCon.setScale(2);
    // _engine.setScale(2);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H,_indexMoveMap--,0,10,6,-_W,0);

                break;
            case GEngine.KEY_RIGHT:
                _engine.drawMoveMap(_bg_data,IMAGE[ID.BG],_W,_H,_indexMoveMap++,0,10,6,-_W,0);

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