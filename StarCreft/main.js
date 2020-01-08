var _BG,_VIEW;
var _RYU,_RYU2;
var _ENGINE = GEngine.loadObjectFile(["BG","RYU","FX"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _BG = _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW_BG,0,0);
            _VIEW = _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW_VIEW,250,360).setCallback(callbackView);
            _RYU = _ENGINE.newObject(ID.RYU,STATE[ID.RYU].NEW,150,270).setCallback(callbackRyu);
            _RYU2 =_ENGINE.newObject(ID.RYU,STATE[ID.RYU].NEW,350,270).setReverseX(-1).setCallback(callbackRyu);
        }
    }).addEventListener(function(e) {
        //log("e.keyCode: " + e.keyCode);
        if(_RYU.state == STATE[ID.RYU].NEW)_ENGINE.pressKey(e.keyCode);
    });
});