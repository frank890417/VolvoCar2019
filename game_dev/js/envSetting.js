// import loadAllAssets from "./assetLoader.js"
let vars;
let common;
let game1Data;

export default {
    setupEnv(containerSelector, Vars){
        vars = Vars;
        common = Vars.common;
        game1Data = Vars.game1Data;

        let type = "WebGL";
        if(!PIXI.utils.isWebGLSupported()){
            type = "canvas";
        }
        // PIXI.utils.sayHello(type);
        PIXI.utils.skipHello();

        Vars.common.app = new PIXI.Application({
            width: Vars.common.DEFAULT_STAGE_WIDTH,
            height: Vars.common.DEFAULT_STAGE_HEIGHT,
            antialias: true,
            // transparent: true,
            transparent: false,
            backgroundColor: 0x333333,
            resolution: 1
        });
    
        Vars.common.app.renderer.autoResize = true;
        $(containerSelector).append(Vars.common.app.view);
        setupCommonData();
    }
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
