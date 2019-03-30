let common;
let game3Data;
let currentApp;

export {game3Setup};

function game3Setup(Vars){
    common = Vars.common;
    game3Data = Vars.game3Data;
    currentApp = Vars.game3Data.app;


    game3Data.timeText_g3 = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    game3Data.timeText_g3.position.set(currentApp.screen.width/2, 60);
    game3Data.timeText_g3.anchor.set(0.5, 0);
    
    game3Data.timeRemainingText_g3 = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 'bold',
    }));

    game3Data.timeRemainingText_g3.position.set(currentApp.screen.width/2, 120);
    game3Data.timeRemainingText_g3.anchor.set(0.5, 0);

    game3Data.hintRect_g3 =  new PIXI.Graphics();
    game3Data.hintRect_g3.beginFill(0xFF0000, 1);
    //game3Data.hintRect_g3.lineStyle(80, 0xFF0000, 1);
    game3Data.hintRect_g3.drawRect(0, 0, currentApp.screen.width, currentApp.screen.height);
    game3Data.hintRect_g3.endFill()
    game3Data.hintRect_g3.alpha = 0;

    game3Data.hintRectGood_g3 =  new PIXI.Graphics();
    game3Data.hintRectGood_g3.beginFill(0x000000, 0);
    game3Data.hintRectGood_g3.lineStyle(80, 0x00FF00, 1);
    game3Data.hintRectGood_g3.drawRect(0, 0, currentApp.screen.width, currentApp.screen.height);
    game3Data.hintRectGood_g3.endFill()
    game3Data.hintRectGood_g3.alpha = 0;

    game3Data.cityRoad_g3 =  new PIXI.Sprite(PIXI.loader.resources.cityG3Img.texture);
    game3Data.cityRoad_g3.position.set(currentApp.screen.width/2, currentApp.screen.height/2);
    game3Data.cityRoad_g3.scale.set(1, 1);
    game3Data.cityRoad_g3.anchor.set(0.5, 0.5);

    game3Data.missImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    game3Data.missImg_g3.position.set(currentApp.screen.width-60, currentApp.screen.height/2-game3Data.missImg_g3.height);
    game3Data.missImg_g3.anchor.set(1, 0);
    game3Data.missImg_g3.scale.set(0.6, 0.6);

    game3Data.mrImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    game3Data.mrImg_g3.position.set(60, 80);
    game3Data.mrImg_g3.anchor.set(0, 0);
    game3Data.mrImg_g3.scale.set(0.6, 0.6);

    game3Data.sysImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    game3Data.sysImg_g3.position.set(60, 80+game3Data.mrImg_g3.height+60);
    game3Data.sysImg_g3.anchor.set(0, 0);
    game3Data.sysImg_g3.scale.set(0.6, 0.6);

    game3Data.dash_g3 =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    game3Data.dash_g3.position.set(currentApp.screen.width/2, currentApp.screen.height);
    game3Data.dash_g3.anchor.set(0.5, 1);
    game3Data.dash_g3.scale.set(0.8, 0.8);

    // game3Data.car_g3 =  new PIXI.Sprite(PIXI.loader.resources.carMidImg.texture);
    // game3Data.car_g3.position.set(currentApp.screen.width/2, 500);
    // game3Data.car_g3.anchor.set(0.5, 0.5);
    // game3Data.car_g3.scale.set(0.6, 0.6);

    game3Data.leftBtn_g3 =  new PIXI.Sprite(PIXI.loader.resources.leftBtnG3Img.texture);
    game3Data.leftBtn_g3.position.set(60, currentApp.screen.height-60);
    game3Data.leftBtn_g3.anchor.set(0, 1);

    game3Data.rightBtn_g3 =  new PIXI.Sprite(PIXI.loader.resources.rightBtnG3Img.texture);
    game3Data.rightBtn_g3.position.set(currentApp.screen.width -60 -game3Data.rightBtn_g3.width, currentApp.screen.height-60);
    game3Data.rightBtn_g3.anchor.set(0, 1);

    game3Data.hint_g3 =  new PIXI.Sprite(PIXI.loader.resources.hintG3Img.texture);
    game3Data.hint_g3.position.set(currentApp.screen.width-60, currentApp.screen.height/2 + game3Data.missImg_g3.height+100);
    game3Data.hint_g3.anchor.set(1, 1);
    game3Data.hint_g3.scale.set(0.6, 0.6);

    //後照鏡
    // game3Data.mirrorBgLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBgLeftImg.texture);
    // game3Data.mirrorBgRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBgRightImg.texture);

    let bgTexs = [];

    for (let i = 0; i < 60; i++) {
         let tempTex = PIXI.Texture.fromFrame('mirror' + i);
         bgTexs.push(tempTex);
    }
    
    game3Data.mirrorBgLeft_g3 = new PIXI.extras.AnimatedSprite(bgTexs);
    game3Data.mirrorBgLeft_g3.animationSpeed = -1.2;
    game3Data.mirrorBgLeft_g3.play();

    game3Data.mirrorBgRight_g3 = new PIXI.extras.AnimatedSprite(bgTexs);
    game3Data.mirrorBgRight_g3.animationSpeed = -1.2;
    game3Data.mirrorBgRight_g3.play();
    game3Data.mirrorBgRight_g3.position.set(-game3Data.mirrorBgLeft_g3.width/2+50, 0);


    let mirrorLeftPosition = {
        x: currentApp.screen.width/2 - game3Data.mirrorBgLeft_g3.width + 190,
        y: 80
    }
    let mirrorRightPosition = {
        x: currentApp.screen.width/2 +100,
        y: 80
    }

    game3Data.mirrorBorderLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBorderLeftImg.texture);
    game3Data.mirrorBorderLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    game3Data.mirrorBorderRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBorderRightImg.texture);
    game3Data.mirrorBorderRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    
    game3Data.carInMirrorLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.carInMirrorLeftImg.texture);
    game3Data.carInMirrorLeft_g3.position.set(game3Data.mirrorBgLeft_g3.width/2-60, -200);
    game3Data.carInMirrorLeft_g3.scale.set(0.1, 0.1);
    game3Data.carInMirrorLeft_g3.anchor.set(0.5, 0.5);

    game3Data.carInMirrorRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.carInMirrorRightImg.texture);
    game3Data.carInMirrorRight_g3.position.set(game3Data.mirrorBgRight_g3.width/2+60, -200);
    game3Data.carInMirrorRight_g3.scale.set(0.1, 0.1);
    game3Data.carInMirrorRight_g3.anchor.set(0.5, 0.5);

    game3Data.mirrorLeft_g3 = new PIXI.Container();
    game3Data.mirrorRight_g3 = new PIXI.Container();
    game3Data.mirrorLeft_g3.addChild(game3Data.mirrorBgLeft_g3);
    game3Data.mirrorLeft_g3.addChild(game3Data.carInMirrorLeft_g3);
    game3Data.mirrorRight_g3.addChild(game3Data.mirrorBgRight_g3);
    game3Data.mirrorRight_g3.addChild(game3Data.carInMirrorRight_g3);
    
    game3Data.mirrorLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    game3Data.mirrorRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    
    game3Data.mirrorMaskLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorMaskLeftImg.texture);
    game3Data.mirrorMaskLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    game3Data.mirrorLeft_g3.mask = game3Data.mirrorMaskLeft_g3;
    game3Data.mirrorMaskRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorMaskRightImg.texture);
    game3Data.mirrorMaskRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    game3Data.mirrorRight_g3.mask = game3Data.mirrorMaskRight_g3;
    
    game3Data.mirrorHintLeft_g3 = new PIXI.Sprite(PIXI.loader.resources.mirrorHintLeftImg.texture);
    game3Data.mirrorHintLeft_g3.position.set(mirrorLeftPosition.x-120, mirrorLeftPosition.y-120);
    game3Data.mirrorHintLeft_g3.visible = false;
    game3Data.mirrorHintRight_g3 = new PIXI.Sprite(PIXI.loader.resources.mirrorHintRightImg.texture);
    game3Data.mirrorHintRight_g3.position.set(mirrorRightPosition.x-120, mirrorRightPosition.y-120);
    game3Data.mirrorHintRight_g3.visible = false;

    game3Data.hintTextG3 = new PIXI.Text("請注意後照鏡並透過左右按鈕提醒車主", new PIXI.TextStyle({
        fontSize: 24,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    game3Data.hintTextG3.position.set(currentApp.screen.width/2, currentApp.screen.height/2 );
    game3Data.hintTextG3.anchor.set(0.5, 0.5);


    common.prePlayStartTextG3 = new PIXI.Text("5", new PIXI.TextStyle({
        fontSize: 180,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    common.prePlayStartTextG3.position.set(currentApp.screen.width/2, currentApp.screen.height/2 - 200);
    common.prePlayStartTextG3.anchor.set(0.5, 0.5);
    common.prePlayStartTextG3.visible = false;

    addVanishingAssetG3();
    
    // common.stage3.addChild(game3Data.cityRoad_g3);

    common.stage3.addChild(game3Data.vanishingPoint_g3);
    common.stage3.addChild(game3Data.world3D_g3);


    common.stage3.addChild(game3Data.missImg_g3);
    common.stage3.addChild(game3Data.hint_g3);
    common.stage3.addChild(game3Data.mrImg_g3);
    common.stage3.addChild(game3Data.sysImg_g3);
    common.stage3.addChild(game3Data.timeText_g3);
    common.stage3.addChild(game3Data.timeRemainingText_g3);
    
    common.stage3.addChild(game3Data.mirrorHintLeft_g3);
    common.stage3.addChild(game3Data.mirrorHintRight_g3);
    common.stage3.addChild(game3Data.mirrorLeft_g3);
    common.stage3.addChild(game3Data.mirrorRight_g3);
    common.stage3.addChild(game3Data.mirrorMaskRight_g3);
    common.stage3.addChild(game3Data.mirrorMaskLeft_g3);
    common.stage3.addChild(game3Data.mirrorBorderLeft_g3);
    common.stage3.addChild(game3Data.mirrorBorderRight_g3);

    common.stage3.addChild(game3Data.rightBtn_g3);
    common.stage3.addChild(game3Data.leftBtn_g3);
    common.stage3.addChild(game3Data.hintRect_g3);
    common.stage3.addChild(game3Data.hintRectGood_g3);
    common.stage3.addChild(game3Data.hintTextG3);
    common.stage3.addChild(common.prePlayStartTextG3);
}

function addVanishingAssetG3(){
    game3Data.world3D_g3 = new PIXI.projection.Container2d();
    game3Data.world3D_g3.position.set(0, 910);

    game3Data.bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    game3Data.bigWhiteTexture.orig.width = 30;
    game3Data.bigWhiteTexture.orig.height = 30;

    //左右馬路線
    game3Data.lineLeft_g3 = new PIXI.projection.Sprite2d(game3Data.bigWhiteTexture);
    game3Data.lineLeft_g3.tint = 0xffffff;
    game3Data.lineLeft_g3.scale.set(1, 1000);
    game3Data.lineLeft_g3.anchor.set(0.5, 0.5);
    game3Data.lineLeft_g3.position.set((currentApp.screen.width-game3Data.roadWidth_g3)/2, 0);

    game3Data.lineRight_g3 = new PIXI.projection.Sprite2d(game3Data.bigWhiteTexture);
    game3Data.lineRight_g3.tint = 0xffffff;
    game3Data.lineRight_g3.scale.set(1, 1000);
    game3Data.lineRight_g3.anchor.set(0.5, 0.5);
    game3Data.lineRight_g3.position.set((currentApp.screen.width+game3Data.roadWidth_g3)/2, 0);
    
    game3Data.world3D_g3.addChild(game3Data.lineLeft_g3);
    game3Data.world3D_g3.addChild(game3Data.lineRight_g3);

    //橫線
    game3Data.lineGroup_g3 = [];
    for(let i=0; i< 10; i++){
        let s = new PIXI.projection.Sprite2d(game3Data.bigWhiteTexture);
        s.tint = 0xffffff;
        s.scale.set(game3Data.roadWidth_g3/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 3000*i;
        s.counterX = 0;
        s.position.set(currentApp.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        game3Data.lineGroup_g3.push(s);
        game3Data.world3D_g3.addChild(s);
    }


    //wifi
    for (let i = 1; i < 6; i++) {
        let tempTex = PIXI.Texture.fromFrame('wifiImg' + i);
        
        let tempLeftWifi = new PIXI.projection.Sprite2d(tempTex);
        tempLeftWifi.scale.set(-1.2, -1.2);
        tempLeftWifi.tint = 0xffd25d;
        tempLeftWifi.visible = false;
        tempLeftWifi.position.set(currentApp.screen.width/2 - 300, game3Data.carPosY_g3 - 500);
        game3Data.leftWifi.push(tempLeftWifi);

        let tempRightWifi=  new PIXI.projection.Sprite2d(tempTex);
        tempRightWifi.position.set(currentApp.screen.width/2 + 50, game3Data.carPosY_g3 - 500);
        tempRightWifi.scale.set(1.2, -1.2);
        tempRightWifi.tint = 0xffd25d;
        tempRightWifi.visible = false;
        game3Data.rightWifi.push(tempRightWifi);
        
        game3Data.world3D_g3.addChild(tempLeftWifi);
        game3Data.world3D_g3.addChild(tempRightWifi);

    }

    //左右來車
    game3Data.carComingLeft_g3 =  new PIXI.projection.Sprite2d(PIXI.loader.resources.carComingLeftImg.texture);
    game3Data.carComingLeft_g3.scale.set(5, -5);
    game3Data.carComingLeft_g3.anchor.set(0.5);
    game3Data.carComingLeft_g3.position.set(currentApp.screen.width/2 - game3Data.roadWidth_g3/4 +100, -1000);
    game3Data.carComingLeft_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    game3Data.carComingLeft_g3.visible = false;
    game3Data.world3D_g3.addChild(game3Data.carComingLeft_g3);

    game3Data.carComingRight_g3 =  new PIXI.projection.Sprite2d(PIXI.loader.resources.carComingRightImg.texture);
    game3Data.carComingRight_g3.scale.set(5, -5);
    game3Data.carComingRight_g3.anchor.set(0.5);
    game3Data.carComingRight_g3.position.set(currentApp.screen.width/2+ game3Data.roadWidth_g3/4 -100, -1000);
    game3Data.carComingRight_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    game3Data.carComingRight_g3.visible = false;
    game3Data.world3D_g3.addChild(game3Data.carComingRight_g3);

    //中間車車
    game3Data.car_g3 = new PIXI.projection.Sprite2d(PIXI.loader.resources.carMidImg.texture);
    game3Data.car_g3.scale.set(5, -5);
    game3Data.car_g3.anchor.set(0.5, 0.5);
    game3Data.car_g3.position.set(currentApp.screen.width/2, game3Data.carPosY_g3);
    game3Data.car_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    game3Data.world3D_g3.addChild(game3Data.car_g3);    
    

    //消失點標記
    game3Data.vanishingPointStyle_g3 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    game3Data.vanishingPoint_g3 = new PIXI.Text('Ｏ', game3Data.vanishingPointStyle_g3);
    game3Data.vanishingPoint_g3.anchor.set(0.5);
    game3Data.vanishingPoint_g3.position.set(960, 535);

}
