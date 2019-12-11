let ID;
let OBJECT;
let IMAGE;
let SOUND;
let STATE;

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

    constructor() {
        this.canvas = document.createElement( 'Canvas' );
        this.bufferCanvas = document.createElement( 'Canvas' );

        this.context= this.canvas.getContext('2d');
        this.bufferContext= this.bufferCanvas.getContext('2d');
   
        for(var i =0; i<OBJECT.length; i++){
            STATE[i] = new Enum(Object.keys(OBJECT[i]));
        }
        document.body.style.overflow = 'hidden';
        document.body.style.margin  = '0 auto';
        document.body.style.backgroundColor='black';
    }

    setCanvas(x,y,width,height){
        this.canvas.width=width;
        this.canvas.height=height;
        this.bufferCanvas.width=width;
        this.bufferCanvas.height=height;

        this.canvas.style.position = 'absolute';
        this.canvas.style.left = x;
        this.canvas.style.top = y;
        this.canvas.style.backgroundColor='white';
        this.canvas.style.margin  = '0 auto';
        
        this.setScale(width * 0.00196);
        return this;
    }

    setRatioCanvas(rH,rV){
        var w = 0;
        var h = 0;
        while (w <= window.innerWidth && h <=window.innerHeight){
            w+=rH;
            h+=rV;
        }
        var x= (window.innerWidth - w)/2;
        var y= (window.innerHeight - h)/2;
        this.setCanvas(x,y,w,h);
        return this;
    }
    
    appendBodyChild(){
        document.body.appendChild(this.canvas);
        return this;
    }

    appendDivChild(id){
        var div = document.getElementById(id); 
        div.appendChild(this.canvas);
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

    setScale(scale){
        this.scale = scale;
        return this;
    }

    getScale(){
        return this.scale;
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
       // if(this.scale > 1){
            //this.context.save();
            //this.context.scale(this.scale, this.scale);
            this.context.drawImage(this.bufferCanvas, 0, 0);
            //this.context.restore();
        //}else this.context.drawImage(this.bufferCanvas, 0, 0);
    }

    drawMap(map,image,sizeW,sizeH){
        for(var x=0; x<map[0].length; x++) {
            for(var y=0; y<map.length; y++) {
                this.bufferContext.drawImage(image[map[y][x]] , x * sizeW, y * sizeH, sizeW, sizeH);
                this.bufferContext.strokeRect(x * sizeW, y * sizeH, sizeW, sizeH);
                this.bufferContext.fillText("" + map[y][x], x * sizeW, y * sizeH, 10);
           }
        }
        return this;
    }

    drawMoveMap(map,image,sizeW,sizeH,startX,startY,sizeX,sizeY,dX,dY){
        var mX = -(startX * sizeW);
        var mY = -(startY * sizeH);
        for(var x=startX; x<sizeX +startX ; x++) {
            for(var y=startY; y<sizeY +startY; y++) {
                this.bufferContext.drawImage(image[map[y][x]] ,dX + mX + x * sizeW,dY + mY + y * sizeH);    
            }
        } 
        return this;
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