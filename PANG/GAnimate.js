class Animate{
    constructor(id,object,state,x,y,callback){
        this.id = id;
        this.object = object;
        this.state = state;
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.objectState = Object.values(object)[state];
        this.glint = 0;
    }

    nextFrame(ani_index){
        if(this.index < this.objectState[0].length-1){
            this.index++;
        }else{
            this.index=0;
            this.callback(ani_index);
        }

        if(this.glint > 0){
            this.glint--;
        }
    }
    
    setState(state,x,y){
        this.x = x;
        this.y = y;
        this.state = state;
        this.index = 0;
        this.objectState = Object.values(this.object)[state];
    }

    setGlint(glint){
        this.glint = glint;
    }
}

class AnimateContainer{
    scale = 1;
    animateCount = 0;
    constructor(){
        this.objectArray = new Array(0);
        this.newObjectArray = new Array(0);
        this.deleteArrayIndex = new Array(0);
    }

    setScale(scale){
        this.scale = scale;
    }
    
    nextFrame(context){
         //deleteAnimate,deleteAllAnimate
        for (var index = 0; index < this.deleteArrayIndex.length; index++) {
            this.objectArray.splice(this.deleteArrayIndex[index],1);
            this.deleteArrayIndex.splice(index,1);
        } 
        //newAnimate
        for (var index = 0; index < this.newObjectArray.length; index++) {
            this.objectArray.push(this.newObjectArray[index]);
            this.newObjectArray.splice(index,1);
        }
        //log("deleteAnimate,deleteAllAnimate objectArray length : " + this.objectArray.length);
        
        animateCount = this.objectArray.length;
        for (var index = 0; index < this.objectArray.length; index++) {
            this.objectArray[index].nextFrame(index);
            var element = this.objectArray[index];
            //if(element == null)continue;
            var image = IMAGE[element.id][Math.abs(element.objectState[0][element.index])];
            element.x += element.objectState[1][element.index];
            element.y += element.objectState[2][element.index];
            
            context.save();
            if(this.scale > 1){   
                context.scale(this.scale, this.scale);  
            }
            
            if(element.glint != 0){
                if((element.glint % 2)==0)
                context.globalAlpha = 0.1;
                else context.globalAlpha = 1.0;
            }
            
            if(element.objectState[0][element.index]>0)
                context.drawImage(image, element.x , element.y);
            else
                this.flipHorizontally(context,image, element.x , element.y);
            
            context.restore();
        }
    }

    newAnimate(animate){
        this.newObjectArray.push(animate);
        return this.objectArray.length - this.deleteArrayIndex.length;
    }

    deleteAnimate(index){
       this.deleteArrayIndex.push(index);
    }

    deleteAllAnimate(id){
        for (var index = 0; index < this.objectArray.length; index++) {
            if(this.objectArray[index].id == id)this.deleteAnimate(index);
        }
    }

    setState(index,state,x,y){
        this.objectArray[index].setState(state,x,y);
    }
    
    getState(index){
        return this.objectArray[index];
    }
    
    setGlint(index,glint){
        this.objectArray[index].setGlint(glint);
    }

    getIndex(id){
        for (var index = 0; index < this.objectArray.length; index++) {
            if(id == this.objectArray[index].id)return index;
        }
        return -1;
    }

    getCount(id){
        var count = 0;
        for (var index = 0; index < this.objectArray.length; index++) {
            if(id == this.objectArray[index].id)count++;
        }
        return count;
    }

    flipHorizontally(context,img,x,y){
        context.translate(x+img.width,y);
        context.scale(-1,1);
        context.drawImage(img,0,0);
        context.setTransform(1,0,0,1,0,0);
    }
}
