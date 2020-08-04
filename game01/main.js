var UPDATE_DELAY = 100;
var screen = new Screen(4,3);
var objects = new ObjectContainer(screen,["PLAYER"]);

function main() {
	screen.init();
	objects.new(new PLAYER(ID.PLAYER,10,10,-1));
	objects.new(new PLAYER(2,50,10,-1));
	objects.new(new PLAYER(2,50,50,-1));
	update();
}

function update() {
	var start = new Date().getTime();
	objects.draw();
	var delay = new Date().getTime() - start ;
	setTimeout(this.update, UPDATE_DELAY - delay);
}

window.onresize = function(event) {
	screen.init();
}