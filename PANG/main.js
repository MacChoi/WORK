var _engine;
var _aniContainer;

window.onload = function(){
    _engine= new GEngine(770,420);
    _engine.setScale(1);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            initGame();
            initInput();
            loop();
        }
    });

    _aniContainer = new AnimateContainer();
    _aniContainer.setScale(1);
}

function initGame(){
    _engine.getBufferContext().drawImage(IMAGE[ID.BG][0], 0, 0);
    _player_obj = OBJECT[ID.PLAYER];
        
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
    var delay = new Date().getTime() - start ;
    _loopTimmer = setTimeout(this.loop, LOOP_TIME - delay);
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
                _aniContainer.setState(_player_idx,STATE[ID.PLAYER].FIRE,_player_state.x,_player_state.y);
            break;
        }
        e.preventDefault();
   });
}