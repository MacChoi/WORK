var _BG,_CURSOR,_OVERLOAD;
var _ENGINE = GEngine.loadObjectFile(["COMMON","BG","CURSOR","OVERLOAD"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            //_BG = _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,50,50).setCallback(callbackBG);
            _OVERLOAD = _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,100,100).setCallback(callbackOverload).setSelectEnable(true);
            
            _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,200,100).setCallback(callbackOverload).setSelectEnable(true);
            
            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,150,50).setCallback(callbackCursor);
        }
    });
});