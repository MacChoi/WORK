var _CURSOR;
var _ENGINE = GEngine.loadObjectFile(["COMMON","BG","CURSOR","OVERLOAD","MARINE","STRUCTURE"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,0,0);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,100);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,0,140);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,140);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,180);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,220);

            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,300,100).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,300,150).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,300,200).setCallback(callbackMarine).setSelectEnable(true);
            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,300,250).setCallback(callbackMarine).setSelectEnable(true);

            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].COMMAND_CENTER,150,150).setCallback(callbackCommandCenter).setNextState(STATE[ID.STRUCTURE].COMMAND_CENTER_PRODUCTION);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].BARRACK,200,0).setCallback(callbackCommandCenter).setNextState(STATE[ID.STRUCTURE].BARRACK_PRODUCTION);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].SUPPLY,50,0).setCallback(callbackCommandCenter).setAniLoop(false);
            _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].SUPPLY,100,50).setCallback(callbackCommandCenter).setAniLoop(false);

            _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,400,300).setCallback(callbackOverload).setSelectEnable(true);
            
            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,150,50).setCallback(callbackCursor);
        }
    });
});

//ZERG
//SCV