var ID;
var OBJECT;
var IMAGE;
var SOUND;
var STATE;

class GEngine {
    static END_FILE = 0;
    static NEXT_FILE = 1;

    static KEY_LEFT = 37;
    static KEY_UP = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN = 40;
    static KEY_SPACE = 32;
    static KEY_ALT = 18;
    static KEY_A = 65;
    static KEY_S = 83;

    static loopCallback = null;
    static callback = null;
    static LOOP_TIME = 1000;

    static loadObjectFile(IDArray){
        ID = new Enum(IDArray);
        OBJECT = new Array(ID.length);
        IMAGE = new Array(ID.length);
        SOUND = new Array(ID.length);
        STATE = new Array(ID.length);

        log("GEngine.loadObjectFile() OBJECT : " + ID.length);
        for(var i =0; i<ID.length; i++){
            var jscript = document.createElement('script');
            jscript.type = 'text/javascript';
            jscript.src = "./Object/" + i + ".js";
            document.head.appendChild( jscript );
            log("OBJECT [" + i +"] : " +jscript.src);
        }
    }
    
    constructor(width,height) {
        this.scale = 1;
        this.canvas = document.createElement( 'Canvas' );
        this.context= this.canvas.getContext('2d');

        this.bufferCanvas = document.createElement( 'Canvas' );
        this.bufferContext= this.bufferCanvas.getContext('2d');
   
        for(var i =0; i<OBJECT.length; i++){
            STATE[i] = new Enum(Object.keys(OBJECT[i]));
        }
    }

    setCanvas(width,height){
        this.canvas.width=width;
        this.canvas.height=height;

        this.bufferCanvas.width=width;
        this.bufferCanvas.height=height;
        return this;
    }
 
    getCanvas(){
        return this.canvas;
    }

    getContext(){
        return this.context;
    }

    getBufferContext(){
        return this.bufferContext;
    }

    getImageCount(){
        return this.imageCount;
    }

    setScale(scaleX){
        this.scale = scaleX;
        return this;
    }

    loadImageFile(callback){
        this.imageCount = 0;
        for(var i = 0; i<IMAGE.length; i++){
            IMAGE[i] = new Array(OBJECT[i].IMG);

            for(var j =0; j<IMAGE[i].length; j++){
                this.imageCount++;
            }
        }
        log("GEngine.loadImageFile() IMAGE : " + this.imageCount);
        var count = 0;
        var imgMaxCount = this.imageCount;
        for(var i = 0; i<IMAGE.length; i++){
            for(var j =0; j<IMAGE[i].length; j++){
                IMAGE[i][j] = new Image();
                IMAGE[i][j].src =  "./Image/" + i + "/" + j + ".png";
                IMAGE[i][j].onload = function () {
                    callback(GEngine.NEXT_FILE,count++);   
                    if(imgMaxCount == count+1){
                        GAudio.loadSoundFile(function (type, index) {
                            callback(GEngine.NEXT_FILE,count++);
                            if(GEngine.END_FILE == type){
                                callback(GEngine.END_FILE,count);
                            }
                        });
                    }
                }
                log("IMAGE[" + i + "][" + j + "] : " + IMAGE[i][j].src);
            }
        }
    }

    draw(){
        if(this.scale > 1.0){
            this.context.save();
            this.context.scale(this.scale, this.scale);
        }
        this.context.drawImage(this.bufferCanvas, 0, 0);
        this.context.restore();
    }

    drawMap(map,image,sizeW,sizeH){
        for(var x=0; x<map[0].length; x++) {
            for(var y=0; y<map.length; y++) {
                this.bufferContext.drawImage(image[map[y][x]] , x * sizeW, y * sizeH);   
            }
        } 
    }

    drawMoveMap(map,image,sizeW,sizeH,startX,startY,sizeX,sizeY,dX,dY){
        var mX = -(startX * sizeW);
        var mY = -(startY * sizeH);
        for(var x=startX; x<sizeX +startX ; x++) {
            for(var y=startY; y<sizeY +startY; y++) {
                this.bufferContext.drawImage(image[map[y][x]] ,dX + mX + x * sizeW,dY + mY + y * sizeH);   
            }
        } 
    }

    startLoop(loop_time,callback){
        GEngine.LOOP_TIME = loop_time;
        GEngine.loopCallback = callback;
        GEngine.loop();
    }

    static loop(){
        var start = new Date().getTime();
        GEngine.loopCallback();
        var delay = new Date().getTime() - start ;
        setTimeout(GEngine.loop, GEngine.LOOP_TIME - delay);
    }
}