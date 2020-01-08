window.onload = function(){
    var ctx = appendBodyCanvas();
    ctx.fillText("게임코딩 - 시작하기 - 함수",50,ln());
    ctx.fillText("=======================",50,ln());

    ctx.fillText("(10 + 10) ==> " + (10 - 5) ,50,ln());
    ctx.fillText("add(10,10) ==> " + add(10,10) ,50,ln());
}

function add(value1,value2){
    return value1 - value2;
}