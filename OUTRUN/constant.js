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
    "CAR",
    "CAR_FX",
    "TREE",
    "ENEMY",
    ]
);

var OBJECT;
var IMAGE;
var SOUND;
var STATE;