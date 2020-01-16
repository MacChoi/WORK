var _CURSOR;
var _ENGINE = GEngine.loadObjectFile(["COMMON","BG","CURSOR","OVERLOAD","MARINE","STRUCTURE","ZERG","SCV"],function(){
    _ENGINE.loadImageFile(function (type,count){
        if(GEngine.END_FILE == type){
            // _ENGINE.newObject(ID.BG,STATE[ID.BG].NEW,0,0);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,100);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,0,140);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,140);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,180);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].MINERAL,50,220);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].COMMAND_CENTER,150,150).setNextState(STATE[ID.STRUCTURE].COMMAND_CENTER_PRODUCTION);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].BARRACK,200,0).setNextState(STATE[ID.STRUCTURE].BARRACK_PRODUCTION);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].SUPPLY,50,0).setAniLoop(false);
            // _ENGINE.newObject(ID.STRUCTURE,STATE[ID.STRUCTURE].SUPPLY,100,50).setAniLoop(false);

            _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,200,250).setCallback(callbackMarine).setSelectEnable(true);
            // _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,220,100).setCallback(callbackMarine).setSelectEnable(true);
            // _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,240,100).setCallback(callbackMarine).setSelectEnable(true);
            // _ENGINE.newObject(ID.MARINE,STATE[ID.MARINE].NEW,260,100).setCallback(callbackMarine).setSelectEnable(true);

            // _ENGINE.newObject(ID.SCV,STATE[ID.SCV].NEW,120,150).setCallback(callbackScv).setSelectEnable(true);
            // _ENGINE.newObject(ID.SCV,STATE[ID.SCV].NEW,110,170).setCallback(callbackScv).setSelectEnable(true);
            // _ENGINE.newObject(ID.SCV,STATE[ID.SCV].NEW,100,190).setCallback(callbackScv).setSelectEnable(true);
            // _ENGINE.newObject(ID.SCV,STATE[ID.SCV].NEW,110,210).setCallback(callbackScv).setSelectEnable(true);

            // _ENGINE.newObject(ID.OVERLOAD,STATE[ID.OVERLOAD].NEW,400,300).setCallback(callbackOverload).setSelectEnable(true);
            // _ENGINE.newObject(ID.ZERG,STATE[ID.ZERG].NEW,320,220).setCallback(callbackZerg).setSelectEnable(true);
            // _ENGINE.newObject(ID.ZERG,STATE[ID.ZERG].NEW,340,230).setCallback(callbackZerg).setSelectEnable(true);
            // _ENGINE.newObject(ID.ZERG,STATE[ID.ZERG].NEW,350,240).setCallback(callbackZerg).setSelectEnable(true);
            // _ENGINE.newObject(ID.ZERG,STATE[ID.ZERG].NEW,360,250).setCallback(callbackZerg).setSelectEnable(true);
            
            _CURSOR = _ENGINE.newObject(ID.CURSOR,STATE[ID.CURSOR].NEW,150,50).setCallback(callbackCursor);
        }
    });
});