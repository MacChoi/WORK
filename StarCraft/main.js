var _CURSOR;
var _ENGINE = GEngine.loadObjectFile(["COMMON","BG","CURSOR","OVERLOAD"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,0,0).setCallback(callbackBG);
            _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,200,100).setCallback(callbackOverload).setSelectEnable(true);

            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,150,50).setCallback(callbackCursor);
        }
    });
});