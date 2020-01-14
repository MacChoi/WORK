var _CURSOR;
var _ENGINE = GEngine.loadObjectFile(["COMMON","BG","CURSOR","OVERLOAD","MARINE","STRUCTURE"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,0,0);
            
            _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,100,100).setCallback(callbackOverload).setSelectEnable(true);
            
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,200,100).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,200,150).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,200,200).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,200,250).setCallback(callbackMarine).setSelectEnable(true);

            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].COMMAND_CENTER,200,250).setCallback(callbackCommandCenter).setNextState(STATE[ID.STRUCTURE].NEW_SCV);

            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,150,50).setCallback(callbackCursor);
        }
    });
});