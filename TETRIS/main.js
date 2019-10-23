var engine;
var aniContainer;

var _map_obj;
var _W;
var _H;

var _block_idx;
var _block_obj;
var _block_type;
var _block_state;

window.onload = function(){
    engine= new GEngine(510,630);
    engine.loadImageFile(function (index) { 
        if(engine.getImageCount() == index + 1){
            _map_obj = OBJECT[ID.MAP];
            _W = _map_obj.TILE_WIDTH;
            _H = _map_obj.TILE_HEIGTH;

            _block_obj = OBJECT[ID.BLOCK];
            _block_type = _block_obj.DATA[4];
            
            aniContainer = new AnimateContainer();
            engine.drawMap(_map_obj.DATA,IMAGE[ID.MAP],_W,_H);
 
            aniContainer.newAnimate(new Animate(ID.BLOCK,_block_obj,STATE[ID.BLOCK].NEW,_W *5,-_H,
                function(index){      
                }
            ));

            _block_idx = aniContainer.getIndex(ID.BLOCK);
            _block_state = aniContainer.getState(_block_idx);

            loop();
            initInput();
        }
    });
}

function rotaeBlock(array){
    var a = JSON.parse(JSON.stringify( array )); //참조없는 복사
 
    var p = a[1]; //center of rotation
    for (var i=0;i<array.length;i++){
        var x = a[i].y-p.y;
        var y = a[i].x-p.x;
        a[i].x = p.x - x;
        a[i].y = p.y + y;
    }
    return a;
}

function drawBlock(x,y){
    if(checkBlock(_block_state.x,_block_state.y + _H) == true){
        aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_W * 5,-_H);
    }

    for (var i = 0; i < _block_type.length; i++) {
        const element = _block_type[i];
        engine.getContext().drawImage(IMAGE[ID.BLOCK][0],(element.x * _W) + x,(element.y * _H) + y);
    }
}

function checkBlock(x,y){
    for (var i = 0; i < _block_type.length; i++) {
        const element = _block_type[i];
        var idx_X = parseInt((x /_W)+ element.x);
        var idx_Y = parseInt((y /_H)+ element.y);
      
        if(_map_obj.DATA[idx_Y][idx_X] != 1)return true;
    }
    return false;
}

function loop(){
    var start = new Date().getTime();
    
    engine.draw();
    aniContainer.nextFrame(engine.getContext());

    drawBlock(_block_state.x,_block_state.y);

    var delay = new Date().getTime() - start ;
    setTimeout(this.loop, LOOP_TIME - delay);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        log("e.keyCode: " + e.keyCode);

        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                if(checkBlock(_block_state.x - _W,_block_state.y) != true ){
                    aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x -_W,_block_state.y);
                }
            break;
            case GEngine.KEY_RIGHT:
                if(checkBlock(_block_state.x + _W,_block_state.y) != true ){
                    aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x +_W,_block_state.y);
                }
            break;
            case GEngine.KEY_DOWN:
                if(checkBlock(_block_state.x,_block_state.y + _H) != true ){
                    aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x,_block_state.y + _H);
                }
            break;
            case GEngine.KEY_UP:
                _block_type = rotaeBlock(_block_type);
            break;

            case GEngine.KEY_SPACE:
                while(checkBlock(_block_state.x,parseInt(_block_state.y /_H) *_H + _H) == false){ 
                    aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x,parseInt(_block_state.y /_H) *_H + _H);
                }
            break;
        }
        e.preventDefault( );
   });
}