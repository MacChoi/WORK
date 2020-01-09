var _BG,_CURSOR;
var _ENGINE = GEngine.loadObjectFile(["BG","CURSOR"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _BG = _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,50,50);
            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,50,50).setCallback(callbacCursor);
        }
    });
});