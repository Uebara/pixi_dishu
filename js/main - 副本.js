//Aliases
var Container = PIXI.Container,
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

var state, cl,cls, cl_click,cl_clicks, grass, grasses ,cover1, cover2,healthBar,
message, endmsg,gameScene, gameOverScene, enemies, id;

function setup(){

	gameScene = new Container();
	stage.addChild(gameScene);

	id = resources["imgs/items.json"].textures;

	var numberOfGrass = 6,
	space = 50;

	cls = [];
	cl_clicks = [];
	for(var i = 0;i<3;i++){

		cl = new Sprite(id["cl.png"]);
		cl_click = new Sprite(id["cl_click.png"]);

		var x = (i%3)*(space + 180) + space+20;
		var y = 220;

		cl.x = x;
		cl.y = y;
		cl.ny = 220;
		cl.flag = false;

		cls.push(cl);
		gameScene.addChild(cl);

		cl_click.x = x;
		cl_click.y = y;
		cl_click.ny = 220;
		cl_click.visible = false;
		cl_click.flag = false;

		cl_clicks.push(cl_click);
		gameScene.addChild(cl_click);
	}	

	cover1 = new Graphics();
	cover1.beginFill(0xaaaaaa);
	cover1.drawRect(0, 270, 750, 500);
	cover1.endFill();
	gameScene.addChild(cover1);

	for(var i = 3;i<6;i++){
		cl = new Sprite(id["cl.png"]);
		cl_click = new Sprite(id["cl_click.png"]);

		var x = (i%3)*(space + 180) + space+20;
		var y = (space + 220) + 220;

		cl.x = x;
		cl.y = y;
		cl.ny = 220;
		cl.flag = false;

		cls.push(cl);
		gameScene.addChild(cl);

		cl_click.x = x;
		cl_click.y = y;
		cl_click.ny = 220;
		cl_click.visible = false;
		cl_click.flag = false;

		cl_clicks.push(cl_click);
		gameScene.addChild(cl_click);
	}		

	grasses = [];

	for(var i = 0;i<numberOfGrass;i++){
		grass = new Sprite(id["grass.png"]);

		var x = (i%3)*(space + 180) + space;
		var y = (i%2)*(space + 220) + space;

		grass.x = x;
		grass.y = y;

		grasses.push(grass);
		gameScene.addChild(grass);
	}

	cover2 = new Graphics();
	cover2.beginFill(0xaaaaaa);
	cover2.drawRect(0, 540, 750, 500);
	cover2.endFill();
	gameScene.addChild(cover2);

	//Create the `gameOver` scene
	gameOverScene = new Container();
	stage.addChild(gameOverScene);

	//Make the `gameOver` scene invisible when the game first starts
	gameOverScene.visible = false;

	//Create the text sprite and add it to the `gameOver` scene
	endmsg = new Text(
		"The End!", 
		{font: "64px Futura", fill: "white"}
		);
	endmsg.x = 200;
	endmsg.y = 220;
	gameOverScene.addChild(endmsg);

	//Set the game state
	state = play;

	message = new Text(
		"得分", 
		{font: "32px sans-serif", fill: "white"}
		);

	message.position.set(10, 20);
	gameScene.addChild(message);

	//Start the game loop
	gameLoop();
}
// renderer.render(stage);

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state
  state();

  //Render the stage
  renderer.render(stage);
}
var then = Date.now();
var deltaTime = 1200;
var randomNum = Math.floor(Math.random()*6);
var point = 0;
var miss = 0;

function play() {
	message.text = "得分："+point +"错过："+miss;

	var now = Date.now();
	var delta = now-then;
	if(delta>deltaTime){
		then = now;
		randomNum = Math.floor(Math.random()*6);
		if(deltaTime>100)
			deltaTime -= 50;
	}
	for(var i = 0;i<cls.length;i++){
		cl_clicks[randomNum].flag = true;
		if(cl_clicks[i].flag){
			if(cls[i].ny <=20){
				cls[i].flag = true;
			// cl_clicks[i].flag = true;
		}
		if(cls[i].ny >=221){
			if(cls[i].visible)
				miss++;
			cls[i].flag = false;
			cls[i].visible = true;
			cl_clicks[i].flag = false;
			cl_clicks[i].visible = false;
		}
		if(cls[i].flag){
			cls[i].y +=5;
			cls[i].ny +=5;
			cl_clicks[i].y +=5;
			cl_clicks[i].ny +=5;
		}else{
			cls[i].y -=5;
			cls[i].ny -=5;
			cl_clicks[i].y -=5;
			cl_clicks[i].ny -=5;
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

window.addEventListener("mousedown",function(e){
	var obj = document.getElementById("body");
  obj.style.cursor= "url('imgs/hamer_down.ico'),auto";
	// document.getElementById(myCanvas).css("cursor","url('hamer_down.ico'),auto");
	var mouse_x=e.pageX;
	var mouse_y=e.pageY;
	for(var i = 0;i<cls.length;i++){
		if((mouse_x>=cls[i].x)&&(mouse_x<=(parseInt(cls[i].x)+140))&&(mouse_y>=cls[i].y)&&(mouse_y<=parseInt(cls[i].y)+150)){
			// zombie[i].x = 0;
			// zombie.splice(i,1);
			cls[i].visible = false;
			cl_clicks[i].visible = true;
			cls[i].flag = true;
			// cl_clicks[i].flag = true;
			point++;
			break;
		}
	}
},false);

window.addEventListener("mouseup",function(e){
	var obj = document.getElementById("body");
  obj.style.cursor= "url('imgs/hamer.ico'),auto";
},false);