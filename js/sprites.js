function cl_creat(i,x,y){
	var cl = new Sprite(id["cl.png"]);
	cl.x = x;
	cl.y = y;
	cl.ny = 220;
	cl.flag = false;
	cl.index = i;
	cl.stay = 15;
	cl.point = 1;
	subscribe(cl);	
	return cl;
}

function clclick_creat(i,x,y){
	var cl_click = new Sprite(id["cl_click.png"]);
	cl_click.x = x;
	cl_click.y = y;
	cl_click.ny = 220;
	cl_click.visible = false;
	return cl_click;
}

function cover_creat(x,y){
	var cover = new Graphics();
	cover.beginFill(0xaaaaaa);
	cover.drawRect(x, y, 750, 500);
	cover.endFill();
	return cover;
}

function grass_creat(x,y){
	var grass = new Sprite(id["grass.png"]);
	grass.x = x;
	grass.y = y;	
	grass.show = false;
	grass.select = 0;
	return grass;
}

function deft_creat(i,x,y){
	var deft = PIXI.Sprite.fromImage('imgs/deft.png');
	deft.x = x;
	deft.y = y;
	deft.ny = 220;
	deft.flag = false;
	deft.index = i;
	deft.stay = 15;
	deft.point = 5;
	subscribe(deft);	
	return deft;	
}

function deft_c_creat(i,x,y){
	var deft_click = PIXI.Sprite.fromImage('imgs/deft_click.png');
	deft_click.x = x;
	deft_click.y = y;
	deft_click.ny = 220;
	deft_click.visible = false;
	return deft_click;
}

function meiko_creat(i,x,y){
	var meiko = PIXI.Sprite.fromImage('imgs/meiko.png');
	meiko.x = x;
	meiko.y = y;
	meiko.ny = 220;
	meiko.flag = false;
	meiko.index = i;
	meiko.stay = 15;
	meiko.point = 10;
	subscribe(meiko);	
	return meiko;	
}

function meiko_c_creat(i,x,y){
	var meiko_click = PIXI.Sprite.fromImage('imgs/meiko_click.png');
	meiko_click.x = x;
	meiko_click.y = y;
	meiko_click.ny = 220;
	meiko_click.visible = false;
	return meiko_click;
}

function replay_creat(x,y){
	var replay = PIXI.Sprite.fromImage('imgs/replay.png');
	replay.x = x;
	replay.y = y;
	replayscribe(replay);
	return replay;
}

function replayscribe(obj) {
    obj.interactive = true;
    obj.buttonMode = true;
    obj.on('pointerdown', onClick1);
}
function onClick1() {
	window.location.reload();
}