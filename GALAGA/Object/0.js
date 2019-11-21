OBJECT[ID.BG] = {
    IMG:7,
    SOUND:1,
    BG_WIDTH:255 * 2, BG_HEIGTH:270 * 2,
    TILE_WIDTH:15,TILE_HEIGTH:15,
    DATA:[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    DATA2:[
        [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0],
        [0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0],
        [0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0],
        [0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0],
    ],
    MOVE:[
        [0,0,0,0,0],//image
        [NO_SOUND],//sound
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//x
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//y
    ],
    DIE:[
        [0,0],//image
        [NO_SOUND],//sound
        [0,0],//x
        [0,0],//y
        [5,5]//gravity power
    ],
    STAR1:[
        [2],//image
        [NO_SOUND],//sound
        [0],//x
        [5],//y
        [5]//gravity power
    ],
    STAR2:[
        [3],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [5]//gravity power
    ],
    STAR3:[
        [4],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [5]//gravity power
    ],
    STAR4:[
        [5],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [5]//gravity power
    ],
    STAR5:[
        [6],//image
        [NO_SOUND],//sound
        [0],//x
        [0],//y
        [5]//gravity power
    ],
};

function callbackBg(type,indexA,indexB){
    var aniA = _aniCon.getAnimate(indexA);
    var aniB = _aniCon.getAnimate(indexB);
    switch (type) {
        case AnimateContainer.END_FRAME:
            if(aniA.state == STATE[ID.BG].MOVE)
            aniA.setReverseX(aniA.reverseX * -1);
        break;
        case AnimateContainer.NEXT_FRAME:
            if(_aniCon.getCount(ID.BG)<0){
                var randomTable = [STATE[ID.BG].STAR1,STATE[ID.BG].STAR2,STATE[ID.BG].STAR3,STATE[ID.BG].STAR4,STATE[ID.BG].STAR5];
                var randomTable2 = [1,-1];
                _aniCon.newAnimate(ID.BG,randomTable[getRandom(0,randomTable.length)],getRandom(0,250),getRandom(0,100),randomTable2[getRandom(0,randomTable2.length)],callbackBg);
            }

            if(aniA.state == STATE[ID.BG].MOVE)
            
            //_aniCon.allAddXY(aniA.x,aniA.y);

        break;
        case AnimateContainer.COLLISION_DOWN:
            _aniCon.deleteAnimate(indexA);
        break;
    }    
}