var _engine,_engine2;
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
    _engine= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGHT,60,true);
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

    // _engine2= new GEngine(OBJECT[ID.BG].BG_WIDTH,OBJECT[ID.BG].BG_HEIGHT,60,false);
    // _engine2.loadImageFile(function (type,index) {
    //     if(GEngine.END_FILE == type){
    //         _audio.loadSoundFile(function (type, index) {
    //             if(GEngine.END_FILE == type){
    //                 initGame(); 
    //                 initInput();
    //             }
    //         });
    //     }
    // });


    // var div = document.getElementById("canvas1"); 
    // div.appendChild(_engine.canvas);

    // var div2 = document.getElementById("canvas2"); 
    // div2.appendChild(_engine2.canvas);

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
    _aniCon.newAnimate(ID.BG,STATE[ID.BG].NEW,220,0,1,null,callbackBg);

    _player_idx = _aniCon.newAnimate(ID.CAR,STATE[ID.CAR].NEW,220,200,1,null,callbackCar);
    _player_ani = _aniCon.getAnimate(_player_idx);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _aniCon.setState(_player_idx,STATE[ID.CAR].LEFT,_player_ani.x,_player_ani.y);
                _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,1,null,callbackCarFx);
                break;
            case GEngine.KEY_RIGHT:
                _aniCon.setState(_player_idx,STATE[ID.CAR].RIGHT,_player_ani.x,_player_ani.y);
                _aniCon.newAnimate(ID.CAR_FX,STATE[ID.CAR_FX].LEFT,_player_ani.x,_player_ani.y+30,-1,null,callbackCarFx);
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