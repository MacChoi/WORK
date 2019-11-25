class Enum{
    constructor(constantsList){
        for (let index = 0; index < constantsList.length; index++) {
            this[constantsList[index]] = index;   
            this.length = index + 1;
        }
    }
}

const ID = new Enum(
    ["BG",
    "PLAYER",
    "MY_MISSILE",
    "ENEMY_1",
    "ENEMY_2",
    "ENEMY_3",
    "ENEMY_MISSILE",
    "FX"]
);

var OBJECT;
var IMAGE;
var SOUND;
var STATE;