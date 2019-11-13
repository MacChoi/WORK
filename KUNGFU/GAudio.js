class GAudio {
    constructor(){}
    callback = function(){};

    loadSoundFile(callback){
        this.setCallback(callback);

        this.soundCount = 0;
        for(var i = 0; i<SOUND.length; i++){
            SOUND[i] = new Array(OBJECT[i].SOUND);

            for(var j =0; j<SOUND[i].length; j++){
                this.soundCount++;
            }
        }
        //log("GAudio.loadSoundFile() ≈ : " + this.soundCount);
        var count = 0;
        var soundMaxCount = this.soundCount;
        for(var i = 0; i<SOUND.length; i++){
            for(var j =0; j<SOUND[i].length; j++){
                SOUND[i][j] = new Audio("./Sound/" + i + "/" + j + ".mp3");
                SOUND[i][j].loop = false;
                callback(GEngine.NEXT_FILE,count++);
                if(soundMaxCount == count)callback(GEngine.END_FILE,count);
                //log("SOUND[" + i + "][" + j + "] : " + SOUND[i][j].src);
            }
        } 
    }

    setCallback(callback){
        this.callback  = callback;
    }

    getSoundCount(){
        return this.soundCount;
    }
}