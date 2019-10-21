var engine;
var aniContainer;
window.onload = function(){
    engine= new GEngine(510,510);
    engine.loadImageFile(function (index) { 
        if(engine.getImageCount() == index + 1){
            var obj = OBJECT[ID.MAP];

            engine.drawMap(obj.DATA,IMAGE[ID.MAP],obj.TILE_WIDTH,obj.TILE_HEIGTH);
                aniContainer = new AnimateContainer();
                aniContainer.newAnimate(new Animate(ID.DOL,
                OBJECT[ID.DOL],
                STATE[ID.DOL].NEW,
                0,0,
                callbackAnimate
            ));

            loop();
            input();
        }
    });
}

function callbackAnimate(index){      
    var obj = OBJECT[ID.MAP];
    var w = obj.TILE_WIDTH;
    var h = obj.TILE_HEIGTH;
    var x = parseInt(mouseX / w) * w;
    var y = parseInt(mouseY / h) * h;
    aniContainer.setState(index,STATE[ID.DOL].NEW,x,y);
}

function loop(){
    var start = new Date().getTime();
    
    engine.draw();
    aniContainer.nextFrame(engine.getContext());

    var delay = new Date().getTime() - start ;
    setTimeout(this.loop, LOOP_TIME - delay);
}

var flagTurnPlayer = true;
function input(){
    engine.getCanvas().onclick = function(event){
        var obj = OBJECT[ID.MAP];
        var w = obj.TILE_WIDTH;
        var h = obj.TILE_HEIGTH;
        var x = parseInt(event.offsetX / w);
        var y = parseInt(event.offsetY / h);
        
        log("x : " + x + ", y : " + y);
        if(x < 0 | x > 16 | y < 0 | y > 16)return;

        log("map[y][x] : " + obj.DATA[y][x]);
        if(obj.DATA[y][x] != 1)return;

        if(flagTurnPlayer == true)obj.DATA[y][x] = 2; 
        else obj.DATA[y][x] = 3;
    
        var checkOK = checkOmok(x,y,
            obj.DATA[y][x],
            obj.CHECK);

        flagTurnPlayer =!flagTurnPlayer;
        engine.drawMap(obj.DATA,IMAGE[ID.MAP],w,h);

        if(checkOK == true){
            if( obj.DATA[y][x] == 2)alert("흑돌 승리!!!!");
            else alert("백돌 승리!!!!");
        }
    }

    engine.getCanvas().addEventListener("mousemove", onMouseMove, false);
    engine.getCanvas().addEventListener("mousedown", onMouseDown, false);
    engine.getCanvas().addEventListener("mouseup", onMouseUp, false);
}

var mouseDown = false;
function onMouseDown(e) {
    mouseDown = true;
    e.stopPropagation();
}
function onMouseUp(e) {
    mouseDown = false;
    e.stopPropagation();
}

var mouseX,mouseY;
function onMouseMove(e) {
    e.stopPropagation();
    //if (!mouseDown) return;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}