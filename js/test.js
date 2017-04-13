window.onload = function() {
	var renderer = PIXI.autoDetectRenderer(800, 560, { transparent: true });
	document.body.appendChild(renderer.view);
	// create the root of the scene graph
	var stage = new PIXI.Container();

//--------------------------------------------------------------------------
	//使用Loader和json的形式
	PIXI.loader.add('imgs/enemy_slm.json').load(onAssetsLoaded);

	var frames,movie;
	function onAssetsLoaded() {
		//推荐模式
		frames = [];
 		// frames = ["cl.png", "cl_click.png","grass.png"];
 		for(var i = 0;i<7;i++){
 			frames.push("enemy_slm "+i+".ase");
 		}
 		//可在外部需要时随时新建，但是调用函数一定要在这里面声明（？）
		play();
//------------------------------------------------------
//		//直接新建模式，当使用该方式时，下面的play和cl_creat方法均可不要
// 		frames = ["cl.png", "cl_click.png","grass.png"];  
// 		movie = PIXI.MovieClip.fromFrames(frames);

// 		movie.animationSpeed = 0.05;
// 		movie.play();
// 		movie.loop = false;
//		//直接加到stage上
// 		stage.addChild(movie);

}
	function play(){
		stage.addChild(cl_creat(0,0));
		stage.addChild(cl_creat(80,0));
	}
	function cl_creat(x,y){
		movie = PIXI.MovieClip.fromFrames(frames);
		movie.position.set(x, y);
		// anchor为设置中心，为0则默认左上角为0,0，为0.5则默认中心为0,0，为1则默认右下角为0,0
		// movie.anchor.set(1);
		//图片切换速度，默认1，越高越快越低越慢
		movie.animationSpeed = 0.15;
		movie.play();
		//是否循环播放
		movie.loop = true;

		return movie;
	}

//--------------------------------------------------------------------------
/*
	//直接使用img的形式
	function cl_creat(x,y){
		var imgs = ["imgs/deft.png","imgs/deft_click.png"];
		var textures = [];

		for (var i=0; i < 2; i++){
			textures.push(PIXI.Texture.fromImage(imgs[i]));
		};

		var movie = new PIXI.MovieClip(textures);
		movie.position.set(x, y);
		movie.animationSpeed = 0.05;
		movie.play();
		movie.loop = false;

		return movie;
	}

	//可在任意地方调用新建
	stage.addChild(cl_creat(100,100));
	stage.addChild(cl_creat(400,100));
*/

//--------------------------------------------------------------------------
	//自动刷新页面
	animate();

	function animate() {
		renderer.render(stage);
		requestAnimationFrame(animate);
	}
}