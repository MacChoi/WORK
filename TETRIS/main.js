var _engine;
var _aniContainer;
var _map_obj;
var _map_data;
var _W;
var _H;
var _block_idx;
var _block_obj;
var _block_data;
var _block_state;
var _block_type = getRandom(1,7);

window.onload = function(){
    _engine= new GEngine(510,630);
    _engine.loadImageFile(function (index) { 
        if(_engine.getImageCount() == index + 1){
            _aniContainer = new AnimateContainer();

            initGame();
            initInput();
            loop();
        }
    });
}

function initGame(){
    _map_obj = OBJECT[ID.MAP];
    _map_data = _map_obj.DATA;
    _W = _map_obj.TILE_WIDTH;
    _H = _map_obj.TILE_HEIGTH;

    _block_obj = OBJECT[ID.BLOCK];
    _block_data = _block_obj.DATA[getRandom(0,7)];
            
    _engine.drawMap(_map_data,IMAGE[ID.MAP],_W,_H);

    _block_idx = _aniContainer.newAnimate(new Animate(ID.BLOCK,_block_obj,STATE[ID.BLOCK].NEW,_W *5,-_H,
        function(index){      
        }
    ));
    
    _block_state = _aniContainer.getState(_block_idx);
}

function drawBlock(x,y){
    var boolCheckBlock = false;

    if(checkGameOver()){
        location.reload();
        alert("GAME OVER");
    }

    if(checkBlock(_block_state.x,_block_state.y + _H) == true){
        _aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_W * 5,-_H);
        boolCheckBlock = true;
    }

    for (var i = 0; i < _block_data.length; i++) {
        const element = _block_data[i];
        
        _engine.getContext().drawImage(IMAGE[ID.MAP][_block_type],(element.x * _W) + x,(element.y * _H) + y);
        
        var idx_X = parseInt((x /_W)+ element.x);
        var idx_Y = parseInt((y /_H)+ element.y);
        drawBlockFX(idx_X,idx_Y);
        if(boolCheckBlock == true){
            _map_data[idx_Y][idx_X] = _block_type;
        }

        
    }

    if(boolCheckBlock == true){
        checkClearBlock();
        _engine.drawMap(_map_data,IMAGE[ID.MAP],_W,_H);
        _block_type = getRandom(1,7);
        _block_data = _block_obj.DATA[getRandom(0,6)];
    }
}

function drawBlockFX(ix,iy){
    _engine.getContext().drawImage(IMAGE[ID.FX][_block_type],(ix * _W),(iy * _H));
}

function checkBlock(x,y){
    for (var i = 0; i < _block_data.length; i++) {
        const element = _block_data[i];
        var idx_X = parseInt((x /_W)+ element.x);
        var idx_Y = parseInt((y /_H)+ element.y);
      
        if(_map_data[idx_Y][idx_X] != 0)return true; 
    }
    return false;
}

function checkClearBlock(){
    var k=_map_data.length-2;
    for (var i=_map_data.length-2 ;i>0;i--){ 
        var count=0;
        for (var j=0;j<_map_data[0].length;j++){
            if (_map_data[i][j] != 0) count++;  
            _map_data[k][j]=_map_data[i][j];
        }
        if (count < _map_data[0].length) k--;
    }
}

function checkGameOver(){
    for (var x = 1; x < _map_data[0].length-1; x++) {
        if(_map_data[0][x] != 0)return true;
    }
    return false;
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

function loop(){
    var start = new Date().getTime();
    _engine.draw();
    drawBlock(_block_state.x,_block_state.y);
    _aniContainer.nextFrame(_engine.getContext());
    var delay = new Date().getTime() - start ;
    _loopTimmer = setTimeout(this.loop, LOOP_TIME - delay);
}

function initInput(){
    window.addEventListener( 'keydown', function(e) {
        //log("e.keyCode: " + e.keyCode);

        switch (e.keyCode){
            case GEngine.KEY_LEFT:
                if(checkBlock(_block_state.x - _W,_block_state.y) != true ){
                    _aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x -_W,_block_state.y);
                }
            break;
            case GEngine.KEY_RIGHT:
                if(checkBlock(_block_state.x + _W,_block_state.y) != true ){
                    _aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x +_W,_block_state.y);
                }
            break;
            case GEngine.KEY_DOWN:
                if(checkBlock(_block_state.x,_block_state.y + _H) != true ){
                    _aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x,_block_state.y + _H);
                }
            break;
            case GEngine.KEY_UP:
                _block_data = rotaeBlock(_block_data);
            break;

            case GEngine.KEY_SPACE:
                while(checkBlock(_block_state.x,parseInt(_block_state.y /_H) *_H + _H) == false){ 
                    _aniContainer.setState(_block_idx,STATE[ID.BLOCK].NEW,_block_state.x,parseInt(_block_state.y /_H) *_H + _H);
                }
            break;
        }
        e.preventDefault();
   });
}