var U=50;
var L=51;
var R=52;
var D=53;

OBJECT[ID.BG] = {
    IMG:3,
    BG_WIDTH:480
    ,BG_HEIGTH:540,
    TILE_WIDTH:30,TILE_HEIGTH:30,
    DATA:[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,2,0,0,2,2,2,2,2,2,2,2,0,0,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,2,0,0,2,2,2,2,2,2,2,2,0,0,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,2,0,0,2,2,2,2,2,2,2,2,0,0,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    DATA2:[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,R,R,R,R,R,R,D,D,L,L,L,L,L,L,1],
        [1,U,U,U,U,U,L,L,R,R,U,U,U,U,U,1],
        [1,U,U,U,U,U,U,U,U,U,U,U,U,U,U,1],
        [1,2,U,U,2,2,2,2,2,2,2,2,U,U,2,1],
        [1,R,U,U,L,L,L,L,R,R,R,R,U,U,L,1],
        [1,2,U,U,2,2,2,2,2,2,2,2,U,U,2,1],
        [1,R,U,U,L,L,L,L,R,R,R,R,U,U,L,1],
        [1,2,U,U,2,2,2,2,2,2,2,2,U,U,2,1],
        [1,R,U,U,L,L,L,L,R,R,R,R,U,U,L,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
};