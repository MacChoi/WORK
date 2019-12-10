class Enum{
    constructor(constantsList){
        for (let index = 0; index < constantsList.length; index++) {
            this[constantsList[index]] = index;   
            this.length = index + 1;
        }
    }
}

class Debug{
    static hide = false;
}

function log(text){
    if(Debug.hide == true)return;
    console.log(text);   
}

function sleep(delay){
    var start =new Date().getTime();
    while(new Date().getTime()< start + delay);
}

function objToString(obj){
    JSON.stringify(obj);
}

function getRandom(a,b){
    return Math.floor(Math.random() * b) + a;
}

function isEmpty(str){
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}

function getCircleXY(radius,angle,angleGap){
    var arrayPosX = new Array(0);
    var arrayPosY = new Array(0);
    for (let index = angle; index > 0; index-=angleGap) {
        var posX = radius * Math.sin(index * Math.PI/180);
        var posY = radius * Math.cos(index * Math.PI/180);
        
        arrayPosX.push(parseInt(posX));
        arrayPosY.push(parseInt(posY));
    }
    log("arrayPosX [" + arrayPosX.length +"] :" +  arrayPosX);
    log("arrayPosY [" + arrayPosY.length +"] :" +  arrayPosY);
}

function appendDivChild(id,view){
    var div = document.getElementById(id); 
    div.appendChild(view);
}

function appendBodyChild(canvas){
    document.body.appendChild(canvas);
    return this;
}
