var _engine;
var _aniContainer;

var _bg_obj;
var _bg_data;
var _W;
var _H;
var _checkDeleteArrow = false;
window.onload = function(){
    _engine= new GEngine(770,420);
    _engine.setScale(2);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            initGame();
            initInput();
            loop();
        }
    });

    _aniContainer = new AnimateContainer();
    _aniContainer.setScale(2);
}

function initGame(){
    _bg_obj = OBJECT[ID.BG];
    _bg_data = _bg_obj.DATA;
    _W = _bg_obj.TILE_WIDTH;
    _H = _bg_obj.TILE_HEIGTH;

    _engine.getBufferContext().drawImage(IMAGE[ID.BG][2], 0, 0);
    _player_obj = OBJECT[ID.PLAYER];

    // _engine.drawMap(_bg_data,IMAGE[ID.BG],_W,_H);

    _player_idx = _aniContainer.newAnimate(new Animate(ID.PLAYER,_player_obj,STATE[ID.PLAYER].NEW,200,170,
        function(index){
            _aniContainer.setState(_player_idx,STATE[ID.PLAYER].NEW,_player_state.x,_player_state.y);
        }
    ));
    _player_state = _aniContainer.getState(_player_idx);
}

function loop(){
    var start = new Date().getTime();
    _engine.draw();
    _aniContainer.nextFrame(_engine.getContext());
    checkPlayerMoveKey = checkPlayerMove();
    var delay = new Date().getTime() - start ;
    _loopTimmer = setTimeout(this.loop, LOOP_TIME - delay);
}

function checkPlayerMove(){
    var player_idx_X = parseInt((_player_state.x /_W));
    var player_idx_Y = parseInt((_player_state.y /_H));

    var moveGap = 0;
    if(_bg_data[player_idx_Y][player_idx_X] != 0)
    _aniContainer.setState(_player_idx,STATE[ID.PLAYER].NEW,_player_state.x+5,_player_state.y);
    else if(_bg_data[player_idx_Y][player_idx_X+2] != 0)
    _aniContainer.setState(_player_idx,STATE[ID.PLAYER].NEW,_player_state.x-5,_player_state.y);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                _aniContainer.setState(_player_idx,STATE[ID.PLAYER].LEFT,_player_state.x,_player_state.y);
            break;
            case GEngine.KEY_RIGHT:
                _aniContainer.setState(_player_idx,STATE[ID.PLAYER].RIGHT,_player_state.x,_player_state.y);
            break;
            case GEngine.KEY_DOWN:
               
            break;
            case GEngine.KEY_UP:
                _aniContainer.setGlint(_player_idx,100);
            break;

            case GEngine.KEY_SPACE:
                if(_aniContainer.getIndex(ID.ARROW) != 0){
                    return;
                }else _checkDeleteArrow = false;

                _aniContainer.setState(_player_idx,STATE[ID.PLAYER].FIRE,_player_state.x,_player_state.y);
                _aniContainer.newAnimate(new Animate(ID.ARROW,OBJECT[ID.ARROW],STATE[ID.ARROW].NEW,_player_state.x+10,_player_state.y-15,
                    function(index){
                        var arrow_state =_aniContainer.getState(index);

                        var idx_X = parseInt((arrow_state.x /_W));
                        var idx_Y = parseInt((arrow_state.y /_H));
                        if(_bg_data[idx_Y][idx_X] != 0){
                            _aniContainer.deleteAnimate(index);
                            _checkDeleteArrow = true;
                        }
                    
                        _aniContainer.newAnimate(new Animate(ID.ARROW,OBJECT[ID.ARROW],STATE[ID.ARROW].BODY,arrow_state.x,arrow_state.y,
                            function(index){
                                if(_checkDeleteArrow)
                                _aniContainer.deleteAnimate(index);
                            }
                        ));    
                    }
                ));
            break;
        }
        e.preventDefault();
   });
}