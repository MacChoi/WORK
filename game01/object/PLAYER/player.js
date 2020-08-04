var image_player = new File().loadImages("./object/PLAYER/image",4);
var sound_player = new File().loadSounds("./object/PLAYER/sound",1,0.2);
class PLAYER extends Frame {
    constructor(id,x,y,flip){
        super(id,x,y,image_player);
        this.NEW = {
            image : [1,1,4,4,1,1,4,4],
            x : [0,0,0,0,0,0,0,0],
            y : [0,0,0,0,0,0,0,0],
            weight : [5,5,5,5,5,5,5,5],
            //rotate : [30,60,90,180,210,240,270,360],
        }
        this.RIGHT = {
            image : [1,1,4,4,1,1,4,4],
            x : [5,5,5,5,5,5,5,5],
            y : [0,0,0,0,0,0,0,0],
        }
        this.UP = {
            image : [1,1,2,2,1,1,2,2],
            x : [0,0,0,0,0,0,0,0],
            y : [-5,-5,-5,-5,0,0,0,0],
        }
        this.state = this.NEW;
        this.scale = 1;
        this.flip = flip;
        //this.lightup = 100;
    }
    onKey = function(e) {  
        //console.log("e.keyCode: ID.PLAYER " + e.keyCode);
        if(this.id != ID.PLAYER)return;
        switch (e.keyCode){
            case KEY.LEFT:
                this.setState(this.RIGHT,this.x,this.y,-1);
                break;
            case KEY.RIGHT:
                this.setState(this.RIGHT,this.x,this.y,1);
                break;
            case KEY.UP:
                this.setState(this.UP,this.x,this.y,this.flip);
            break;    
            case KEY.DOWN:
                sound_player[1].volume =0.1;
                sound_player[1].play();
                this.y +=1;
            break;          
        }
        //console.log("collision >>" + collision.isCheckRect(OBJECT[0],OBJECT[1])); 
    }
    endFrame  = function(e) {
        switch(e.state){
            case this.NEW:
            break;
            case this.LEFT:
                this.setState(this.NEW,this.x,this.y,this.flip);
            break;
            case this.RIGHT:
                this.setState(this.NEW,this.x,this.y,this.flip);
            break;
        }
        //console.log("e.endFrame: ID.PLAYER " + e);
    }
    onDraw  = function(e) {
    //console.log("e.onDraw: ID.PLAYER " + e);
        var rect = collision.getCheckRect(OBJECT[0],OBJECT[1]);
        console.log(rect);
        console.log("isCheckPixel >>" + collision.isCheckPixel(OBJECT[0],OBJECT[1],rect));
    }
    onMouse = function(e) {
        //console.log("e.onMouse: ID.PLAYER " + e.offsetX);
    }
    onDraw  = function(e) {
        //console.log("e.onDraw: ID.PLAYER " + e);
    }
    nextFrame  = function(e) {
        //console.log("e.nextFrame: ID.PLAYER " + e);
    }
    onCollision  = function(e) {
        //console.log("e.onCollision: ID.PLAYER " +e.objA.id +" " + e.objB.idx);
    }
}