// import loadAllAssets from "./assetLoader.js"
let vars;
let common;
let game1Data;

export default {setupEnv}

function setupEnv(containerSelector, currentGame, Vars){
    vars = Vars;
    common = Vars.common;
    game1Data = Vars.game1Data;

    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas";
    }

    PIXI.utils.skipHello();

    let app = new PIXI.Application({
        width: Vars.common.DEFAULT_STAGE_WIDTH,
        height: Vars.common.DEFAULT_STAGE_HEIGHT,
        antialias: true,
        // transparent: true,
        transparent: false,
        backgroundColor: 0x333333,
        resolution: 1,
        sharedTicker: false
    });

    console.log(`game${currentGame}Data`);

    Vars[`game${currentGame}Data`].app = app;

    app.renderer.autoResize = true;

    $(containerSelector).append(app.view);
    
    setupCommonData();
}

function setupCommonData(){
    common.stage1 = new PIXI.Container();
    common.stage2 = new PIXI.Container();
    common.stage3 = new PIXI.Container();
    common.stage4 = new PIXI.Container();

    common.stages = {
        1: common.stage1,
        2: common.stage2,
        3: common.stage3,
        4: common.stage4
    }
}
