class Animate{
    static callbackSound;
    constructor(id,object,state,x,y,value,callback){
        this.id = id;
        this.object = object;
        this.state = state;
        this.x = x;
        this.y = y;
        this.value = value;

        this.objectState = Object.values(object)[state];
        this.glint = 0;
        this.w = 0;
        this.h = 0;
        this.index =0;
        this.reverseX = 1;
        this.reverseY = 1;
        this.reverseImg = 1;
        this.isAniLoop = true;

        if(!isEmpty(callback))this.callback = callback;
        else this.callback = function(){};
    }

    nextFrame(ani_index){
        if(isEmpty(this.objectState))return;
        if(this.index < this.objectState[0].length-1){
            this.index++;
        }else{
            this.index=0;
            if(!isEmpty(this.callback))this.callback(AnimateContainer.END_FRAME,ani_index);
        }
        if(!isEmpty(this.callback))this.callback(AnimateContainer.NEXT_FRAME,ani_index);
        if(this.glint > 0){
            this.glint--;
        }
    }
    
    setValue(value){
        this.value = value;
        return this;
    }

    setAniLoop(bool){
        this.isAniLoop = bool;
        return this;
    }

    setState(state,x,y){
        this.x = x;
        this.y = y;
        this.state = state;
        this.index = 0;
        this.objectState = Object.values(this.object)[state];
        return this;
    }

    setGlint(glint){
        this.glint = glint;
        return this;
    }

    setReverseX(reverse){
        this.reverseX = reverse;
        this.reverseImg = reverse;
        return this;
    }

    setCallback(callback){
        this.callback = callback;
        return this;
    }
}

class AnimateContainer{
    static END_FRAME = 0;
    static NEXT_FRAME = 1;
    static COLLISION = 2;
    static COLLISION_LEFT = 3;
    static COLLISION_RIGHT = 4;
    static COLLISION_UP = 5;
    static COLLISION_DOWN = 5;
    static SOUND_ENDED = 6;
    constructor(){
        this.collision = new GCollision();
        this.objectArray = new Array(0);
        this.newObjectArray = new Array(0);
        
        this._W = 0;
        this._H = 0;
        this.scale = 1;

        this.collisionArray = null;
        this.indexStartXGravityArray = 0;

        this.canvas;
        this.context;
        this.bufferCanvas;
        this.bufferContext;

        this.engine;
    }

    checkCollision(){
        for (var i = 0; i < this.objectArray.length; i++) {
            for (var j = 0; j < this.objectArray.length; j++) {
                if(i == j)continue;
                if(isEmpty(this.objectArray[i]))continue;
                if(isEmpty(this.objectArray[j]))continue;
                if(this.collision.hitRectangle(this.objectArray[i],this.objectArray[j])){
                    this.objectArray[i].callback(AnimateContainer.COLLISION,i,j); 
                }
            }  
        }
    }

    drawNextFrame(){
        this.context.drawImage(this.bufferCanvas, 0, 0);
        for (var index = 0; index < this.objectArray.length; index++) {
            this.objectArray[index].nextFrame(index);
            if(this.objectArray[index].index == 0 & this.objectArray[index].isAniLoop == false){
                this.deleteAnimate(index);
                continue;
            }

            var element = this.objectArray[index];
            if(isEmpty(element))continue;
            var image = IMAGE[element.id][Math.abs(element.objectState[0][element.index])];
            if(isEmpty(image))continue;
            element.w = image.width;
            element.h = image.height;
            var tmpx= element.x;
            element.x += element.objectState[2][element.index] * element.reverseX;
            element.y += element.objectState[3][element.index] * element.reverseY;

            var idx_X_1=parseInt((element.x) /this._W) + this.indexStartXGravityArray;
            var idx_X_2=parseInt((element.x+element.w) /this._W) + this.indexStartXGravityArray;
            var idx_Y=parseInt(element.y /this._H);

            if( idx_Y > 1 & !isEmpty(element.objectState[4]))
            if(this.collisionArray[idx_Y][idx_X_1] != 0 ){
                if(element.objectState[4][element.index] !=0)
                if(tmpx >= element.x)
                element.x = tmpx;

                this.objectArray[index].callback(AnimateContainer.COLLISION_LEFT,index); 
            }
            if( idx_Y > 1 & !isEmpty(element.objectState[4]))
            if(this.collisionArray[idx_Y][idx_X_2] != 0 ){
                if(element.objectState[4][element.index] !=0)
                element.x = tmpx;
              
                this.objectArray[index].callback(AnimateContainer.COLLISION_RIGHT,index); 
            }

            var idx_X_1_10=parseInt((element.x+10) /this._W) + this.indexStartXGravityArray;
            var idx_X_2_10=parseInt((element.x+element.w-10) /this._W) + this.indexStartXGravityArray;
            if(!isEmpty(element.objectState[4])){
                element.y += element.objectState[4][element.index];
                if(!isEmpty(this.collisionArray)){
                    if(this.collisionArray[idx_Y+1][idx_X_1_10] != 0 |
                        this.collisionArray[idx_Y+1][idx_X_2_10] != 0){
                            
                        element.y = idx_Y * this._H;
                        this.objectArray[index].callback(AnimateContainer.COLLISION_DOWN,index); 
                    }
                }
            }

            if(element.y < 0){
                element.y = idx_Y * this._H;
                this.objectArray[index].callback(AnimateContainer.COLLISION_UP,index);
            }

            this.context.save();
            this.context.scale(this.scale, this.scale);  
            
            if(element.glint != 0){
                if((element.glint % 2)==0)
                this.context.globalAlpha = 0.1;
                else this.context.globalAlpha = 1.0;
            }

            var gapX = element.w/2;
            gapX = 0;
            if(element.objectState[0][element.index] * element.reverseImg >= 0)
                this.context.drawImage(image, element.x - gapX , element.y);
            else
                this.flipHorizontally(image, element.x - element.w + gapX  , element.y);
            
            this.context.restore();
        }
        this.checkCollision();
    }
   
    newAnimate(id,state,x,y,reverseX,value,callback){
        var index =this.objectArray.push(new Animate(id,OBJECT[id],state,x,y,value,callback))-1;
        var ani = this.getAnimate(index);
        ani.setReverseX(reverseX);
        if(this.objectArray[index].objectState[1][0] != NO_SOUND){
            var sound = SOUND[id][this.objectArray[index].objectState[1][0]];
            if(!isEmpty(sound)){
                sound.currentTime = 0;
                sound.play();
            }
        }
        return index;
    }

    newObject(id,state,x,y){
        var index =this.objectArray.push(new Animate(id,OBJECT[id],state,x,y))-1;
        if(this.objectArray[index].objectState[1][0] != NO_SOUND){
            var sound = SOUND[id][this.objectArray[index].objectState[1][0]];
            if(!isEmpty(sound)){
                sound.currentTime = 0;
                sound.play();
            }
        }
        return this.getAnimate(index);
    }
    
    // newAnimate(id,state,x,y,reverseX,value,callback){
    //     var index =this.objectArray.push(new Animate(id,OBJECT[id],state,x,y,value,callback))-1;
    //     var ani = this.getAnimate(index);
    //     ani.setReverseX(reverseX);
    //     if(this.objectArray[index].objectState[1][0] != NO_SOUND){
    //         var sound = SOUND[id][this.objectArray[index].objectState[1][0]];
    //         if(!isEmpty(sound)){
    //             sound.currentTime = 0;
    //             sound.play();
    //         }
    //     }
    //     return index;
    // }

    deleteAnimate(index){
        this.objectArray[index].callback = function(){};
        this.objectArray.splice(index,1);
        return this;
    }

    deleteAllAnimate(id){
        var count = -1;
        for (var index = 0; index < this.objectArray.length; index++) {
            if(this.objectArray[index].id == id)this.deleteAnimate(index);
            count++;
        }
        return count;
    }

    setScale(scale){
        this.scale = scale;
        return this;
    }

    setState(index,state,x,y){
        this.objectArray[index].setState(state,x,y);

        if(this.objectArray[index].objectState[1][0] != NO_SOUND){
            var sound = SOUND[this.objectArray[index].id][this.objectArray[index].objectState[1][0]];
    
            if(!isEmpty(sound)){
                sound.play();
            }
        }
    }
    
    getAnimate(index){
        return this.objectArray[index];
    }
    
    setGlint(index,glint){
        this.objectArray[index].setGlint(glint);
        return this;
    }

    getIndex(id){
        for (var index = 0; index < this.objectArray.length; index++) {
            var element = this.objectArray[index];
            if(id == element.id)return index;
        }
    }

    getCount(id){
        var count = 0;
        for (var index = 0; index < this.objectArray.length; index++) {
            if(id == this.objectArray[index].id)count++;
        }
        return count;
    }

    flipHorizontally(img,x,y){     
        this.context.translate(x,y);
        this.context.scale(-1,1);
        this.context.drawImage(img,-(img.width*2),0);
    }

    flipVertically(img,x,y){
        this.context.translate(x+img.width,y);
        this.context.scale(1,-1);
        this.context.drawImage(img,(img.height*2),0);
    }
    
    setCollisonArray(collisionArray){
        this.collisionArray = collisionArray;
        this._W = this.getUnitWidth();
        this._H = this.getUnitHeight();
        this.setScale(this.engine.getScale());
        return this;
    }

    getUnitWidth(){
        return (this.engine.canvas.width / this.collisionArray[0].length)/this.engine.scale;
    }

    getUnitHeight(){
        return (this.engine.canvas.height / this.collisionArray.length)/this.engine.scale;
    }

    setIndexStartXCollisonArray(index){
        this.indexStartXGravityArray = index;
        return this;
    }

    allAddXY(x,y){
        for (var index = 0; index < this.objectArray.length; index++) {
            var element = this.objectArray[index];
            element.x +=x;
            element.y +=y;
        }
        return this;
    }

    setCanvas(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        return this;
    }

    setBufferCanvas(canvas){
        this.bufferCanvas = canvas;
        this.bufferContext = canvas.getContext('2d');
        return this;
    }

    setEngine(engine){
        this.engine = engine;
        this.setCanvas(engine.getCanvas());
        this.setBufferCanvas(engine.getBufferCanvas());
        return this;
    }
  
    drawMap(map,image,sizeW,sizeH){
        for(var x=0; x<map[0].length; x++) {
            for(var y=0; y<map.length; y++) {
                this.bufferContext.drawImage(image[map[y][x]] , x * sizeW, y * sizeH, sizeW, sizeH);
            }
        }
        return this;
    }

    drawGrid(map,sizeW,sizeH){
        for(var x=0; x<map[0].length; x++) {
            for(var y=0; y<map.length; y++) {
                this.bufferContext.strokeRect(x * sizeW, y * sizeH, sizeW, sizeH);
                this.bufferContext.fillText("" + map[y][x], (x * sizeW)+sizeW/2, (y * sizeH)+sizeH/2, 10);
           }
        }
        return this;
    }

    drawCollisionArray(map,image,isGrid){
        var W =this.canvas.width / map[0].length;
        var H = this.canvas.height / map.length;
        this.drawMap(map,image,W,H);
        if(isGrid)
        this.drawGrid(map,W,H);
        return this;
    }
}