function setupEnv(){
    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas";
    }
    PIXI.utils.sayHello(type);
    app = new PIXI.Application({
        width: DEFAULT_STAGE_WIDTH,
        height: DEFAULT_STAGE_HEIGHT,
        antialias: true,
        transparent: true,
        // backgroundColor: 0xFFFFFF,
        resolution: 1
    });

    app.renderer.autoResize = true;
    $(".container").append(app.view);
    loadAllAssets();
}

window.onresize = function(e){
   //resizeGame();
}

function resizeGame(){

}