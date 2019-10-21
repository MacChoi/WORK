var engine;
var aniContainer;

var _idx_block;
var _map;
var _W;
var _H;

window.onload = function(){
    engine= new GEngine(510,630);
    engine.loadImageFile(function (index) { 
        if(engine.getImageCount() == index + 1){
            _map = OBJECT[ID.MAP];
            _W = _map.TILE_WIDTH;
            _H = _map.TILE_HEIGTH;

            aniContainer = new AnimateContainer();

            engine.drawMap(_map.DATA,IMAGE[ID.MAP],_map.TILE_WIDTH,_map.TILE_HEIGTH);
 
            aniContainer.newAnimate(new Animate(ID.BLOCK,OBJECT[ID.BLOCK],STATE[ID.BLOCK].NEW,30*5,20,
                function(index){
                    _idx_block = index;
                }
            ));

            loop();
            input();
        }
    });
}

function checkBlock(){      
    var state = aniContainer.getState(_idx_block);
    var idx_X = parseInt(state.x /_W);
    var idx_Y = parseInt(state.y /_H);
    var x = state.x;
    var y = state.y;

    if(idx_X < 1) x = _W;
    if(idx_X >10) x = state.x - _H;

    if(idx_Y > 19) y = 0;
    
    aniContainer.setState(_idx_block,STATE[ID.BLOCK].NEW,x,y);
    
    log("idx_X: "+ idx_X + " idx_Y : "+idx_Y );
    _map.DATA[idx_Y][idx_X] = 0;
    engine.drawMap(_map.DATA,IMAGE[ID.MAP],_W,_H);
}

function loop(){
    var start = new Date().getTime();
    
    engine.draw();
    aniContainer.nextFrame(engine.getContext());

    checkBlock();

    var delay = new Date().getTime() - start ;
    setTimeout(this.loop, LOOP_TIME - delay);
}

function input(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);
        var state = aniContainer.getState(_idx_block);
        var idx_X = parseInt(state.x /_W);
        var idx_Y = parseInt(state.y /_H);
        var x = state.x;
        var y = state.y;
    
        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                if(idx_X > 1) x = state.x - _W;;
            break;
            case GEngine.KEY_RIGHT:
                if(idx_X < 10) x = state.x + _W;
            break;
            case GEngine.KEY_SPACE:
            break;
        }
        aniContainer.setState(_idx_block,STATE[ID.BLOCK].NEW,x,y);
        
        e.preventDefault( );
   });
}