window.onload = function(){
    var ctx = appendBodyCanvas();
    ctx.fillText("게임코딩 - 시작하기 - 반복문",50,ln());
    ctx.fillText("=======================",50,ln());

    var value = 1;
    var sum = 0;
    // while (value <= 10) {
    //     ctx.fillText("value : "  + value ,50,ln());
    //     sum += value++;
    // }
    
    for (var value = 1; value <= 10; value++) {
        ctx.fillText("value : "  + value ,50,ln());
        sum += value;
    }

    ctx.fillText("sum : "  + sum ,50,ln());
}