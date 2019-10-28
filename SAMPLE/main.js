var _engine;
var _aniContainer;

window.onload = function(){
    _engine= new GEngine(510,630);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            initGame();
            initInput();
            loop();
        }
    });

    _aniContainer = new AnimateContainer();
}

function initGame(){
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
                
            break;
            case GEngine.KEY_RIGHT:
               
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