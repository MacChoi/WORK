class Animate{
    constructor(id,object,state,x,y,callback){
        this.id = id;
        this.object = object;
        this.state = state;
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.objectState = Object.values(object)[state];
    }

    nextFrame(index){
        if(this.index < this.objectState[0].length-1){
            this.index++;
        }else{
            this.index=0;
            this.callback(index);
        }
    }
    
    setState(state,x,y){
        this.x = x;
        this.y = y;
        this.state = state;
        this.index = 0;
        this.objectState = Object.values(this.object)[state];
    }
}

class AnimateContainer{
    scale = 1;
    constructor(){
        this.objectArray = new Array(0);
    }

    setScale(scale){
        this.scale = scale;
    }
    
    nextFrame(context){
        for (var index = 0; index < this.objectArray.length; index++) {
            this.objectArray[index].nextFrame(index);
            var element = this.objectArray[index];
            var image = IMAGE[element.id][Math.abs(element.objectState[0][element.index])];
            element.x += element.objectState[1][element.index];
            element.y += element.objectState[2][element.index];
            
            if(this.scale > 1){
                context.save();
                context.scale(this.scale, this.scale);  
            }
            
            if(element.objectState[0][element.index]>0)
                context.drawImage(image, element.x , element.y);
            else
                this.flipHorizontally(context,image, element.x , element.y);
            
            context.restore();
        }
    }

    flipHorizontally(context,img,x,y){
        // move to x + img's width
        context.translate(x+img.width,y);
    
        // scaleX by -1; this "trick" flips horizontally
        context.scale(-1,1);
        
        // draw the img
        // no need for x,y since we've already translated
        context.drawImage(img,0,0);
        
        // always clean up -- reset transformations to default
        context.setTransform(1,0,0,1,0,0);
    }
    newAnimate(animate){
        this.objectArray.push(animate);
        return this.getIndex(animate.id);
        //log("newAnimate() objectArray length : " + this.objectArray.length);
    }

    deleteAnimate(index){
       this.objectArray.splice(index,1);
       //log("deleteAnimate() objectArray length : " + this.objectArray.length);
    }

    setState(index,state,x,y){
        this.objectArray[index].setState(state,x,y);
        //log("setState() objectArray length : " + this.objectArray.length);
    }
    
    getState(index){
        return this.objectArray[index];
    }

    getIndex(id){
        for (var index = 0; index < this.objectArray.length; index++) {
            var element = this.objectArray[index];
            if(id == element.id)return index;
        }
    }
}
