//Aliases
var Container = PIXI.Container,
Application = PIXI.Application,
autoDetectRenderer = PIXI.autoDetectRenderer,
loader = PIXI.loader,
resources = PIXI.loader.resources,
TextureCache = PIXI.utils.TextureCache,
Texture = PIXI.Texture,
Sprite = PIXI.Sprite,
Text = PIXI.Text,
Graphics = PIXI.Graphics;

var stage = new Container(),
renderer = autoDetectRenderer(750, 600);
document.body.appendChild(renderer.view);
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = 0xaaaaaa;

loader.add("imgs/items.json").load(setup);

var state, sprites, sprites_click, grasses, message, endmsg, gameScene, gameOverScene, id;

function setup(){
	gameScene = new Container();
	stage.addChild(gameScene);

	id = resources["imgs/items.json"].textures;

	var numberOfGrass = 6,
	space = 50;

	sprites = [];
	sprites_click = [];
	//上层的cl
	for(var i = 0;i<3;i++){
		var x = (i%3)*(space + 180) + space+20;
		var y = 230;

		var cl = cl_creat(i*3,x,y);
		var deft = deft_creat(1+i*3,x,y);
		var meiko = meiko_creat(2+i*3,x,y);
		sprites.push(cl);
		sprites.push(deft);
		sprites.push(meiko);
		gameScene.addChild(cl);
		gameScene.addChild(deft);
		gameScene.addChild(meiko);

		var cl_click = clclick_creat(i*3,x,y);
		var deft_click = deft_c_creat(1+i*3,x,y);
		var meiko_click = meiko_c_creat(2+i*3,x,y);
		sprites_click.push(cl_click);
		sprites_click.push(deft_click);
		sprites_click.push(meiko_click);
		gameScene.addChild(cl_click);
		gameScene.addChild(deft_click);
		gameScene.addChild(meiko_click);
	}	
	//中间的蒙版
	gameScene.addChild(cover_creat(0,270));
	//下层的cl
	for(var i = 3;i<6;i++){
		var x = (i%3)*(space + 180) + space+20;
		var y = (space + 220) + 230;

		var cl = cl_creat(i*3,x,y);
		var deft = deft_creat(1+i*3,x,y);
		var meiko = meiko_creat(2+i*3,x,y);
		sprites.push(cl);
		sprites.push(deft);
		sprites.push(meiko);
		gameScene.addChild(cl);
		gameScene.addChild(deft);
		gameScene.addChild(meiko);

		var cl_click = clclick_creat(i*3,x,y);
		var deft_click = deft_c_creat(1+i*3,x,y);
		var meiko_click = meiko_c_creat(2+i*3,x,y);
		sprites_click.push(cl_click);
		sprites_click.push(deft_click);
		sprites_click.push(meiko_click);
		gameScene.addChild(cl_click);
		gameScene.addChild(deft_click);
		gameScene.addChild(meiko_click);
	}		
	//洞
	grasses = [];
	for(var i = 0;i<numberOfGrass;i++){
		var x = (i%3)*(space + 180) + space;
		var y = (i%2)*(space + 220) + space;

		var grass = grass_creat(x,y);
		grasses.push(grass);
		gameScene.addChild(grass);
	}
	//下层的蒙版
	gameScene.addChild(cover_creat(0,540));

	//游戏结束页面
	gameOverScene = new Container();
	stage.addChild(gameOverScene);

	gameOverScene.visible = false;
	endmsg = new Text(
		"The End!", 
		{font: "64px Futura", fill: "white"}
		);
	endmsg.x = 200;
	endmsg.y = 220;
	gameOverScene.addChild(endmsg);

	//重玩按钮
	var replay = replay_creat(450,480);
	gameOverScene.addChild(replay);

	//设置游戏开始
	state = play;
	//游戏计分
	message = new Text(
		"得分", 
		{font: "32px sans-serif", fill: "white"}
		);
	message.position.set(10, 20);
	gameScene.addChild(message);

	//游戏启动
	gameLoop();
}
function subscribe(obj) {
    obj.interactive = true;
    obj.buttonMode = true;
    obj.on('pointerdown', onClick);
}
function onClick() {
	if(this.visible){
		this.visible = false;
		this.flag = true;
		sprites_click[this.index].visible = true;
		point += this.point;
	}
}
function gameLoop(){
	if(!gameOverScene.visible){
		requestAnimationFrame(gameLoop);
		state();
		renderer.render(stage);
	}
}

var then = Date.now(),
deltaTime = 1200,
randomNum = Math.floor(Math.random()*6),
point = 0,
miss = 0,
speed = 5;

function play() {
	message.text = "得分："+point +"错过："+miss;
	//间隔delta毫秒执行一次
	var now = Date.now();
	var delta = now-then;
	if(delta>deltaTime){
		then = now;
		randomNum = Math.floor(Math.random()*6);
		if(!grasses[randomNum].show){
			grasses[randomNum].show = true;
			var selectNum = Math.floor(Math.random()*100);
			if(selectNum<90)
				selectNum = 0;
			else if(selectNum<98)
				selectNum = 1;
			else
				selectNum = 2;
			grasses[randomNum].select = selectNum;
		}
		if(deltaTime>100)
			deltaTime -= 50;
	}
	for(var i = 0;i<grasses.length;i++){
		if(grasses[i].show){
			var index = i*3+grasses[i].select;

			if(sprites[index].ny <=20){
				if(sprites[index].stay>=0){
					sprites[index].stay -=1;
					continue;
				}
				else
					sprites[index].flag = true;
			}
			if(sprites[index].ny >=221){
				if(sprites[index].visible)
					miss++;
				sprites[index].flag = false;
				sprites[index].visible = true;
				sprites[index].stay = 15;

				grasses[i].show = false;

				sprites_click[index].visible = false;
			}
			if(sprites[index].flag){
				sprites[index].y +=speed;
				sprites[index].ny +=speed;
				sprites_click[index].y +=speed;
				sprites_click[index].ny +=speed;
			}else{
				sprites[index].y -=speed;
				sprites[index].ny -=speed;
				sprites_click[index].y -=speed;
				sprites_click[index].ny -=speed;
			}
		}

		if(miss >= 3){
			state = end;
			endmsg.text = "Game Over!\n得分："+point;
		}
	}
}

function end() {
	gameScene.visible = false;
	gameOverScene.visible = true;
}