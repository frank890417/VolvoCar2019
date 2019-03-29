let common;
let game2Data;
export {game2Setup};

function game2Setup(Vars){
    common = Vars.common;
    game2Data = Vars.game2Data;

    game2Data.g2Ui =  new PIXI.Sprite(PIXI.loader.resources.g2Ui.texture);
    game2Data.g2Ui.position.set(0, 0);
    game2Data.g2Ui.anchor.set(0, 0);

    game2Data.timeText_g2 = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD3BE',
        fontWeight: 500
    }));
    game2Data.timeText_g2.position.set(common.app.screen.width/2, 60);
    game2Data.timeText_g2.anchor.set(0.5, 0);
    
    game2Data.timeRemainingText_g2 = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 150,
        fill: '#FFD3BE',
        fontWeight: 500,
    }));

    game2Data.timeRemainingText_g2.position.set(common.app.screen.width/2-30, 100);
    game2Data.timeRemainingText_g2.anchor.set(0.5, 0);

    game2Data.hintRect_g2 =  new PIXI.Graphics();
    game2Data.hintRect_g2.beginFill(0x000000, 0);
    game2Data.hintRect_g2.lineStyle(80, 0xFF0000, 1);
    game2Data.hintRect_g2.drawRect(0, 0, common.app.screen.width, common.app.screen.height);
    game2Data.hintRect_g2.endFill();
    game2Data.hintRect_g2.visible = false;

    let bgTexs = [];

    for (let i = 0; i < 7; i++) {
         let tempTex = PIXI.Texture.fromFrame('roadBgG2' + i);
         bgTexs.push(tempTex);
    }
    
    game2Data.cityRoadAniBg_g2 = new PIXI.extras.AnimatedSprite(bgTexs);
    game2Data.cityRoadAniBg_g2.animationSpeed = 1;
    game2Data.cityRoadAniBg_g2.play();


    // cityRoad_g2 =  new PIXI.Sprite(PIXI.loader.resources.cityImg.texture);
    // cityRoad_g2.position.set(common.app.screen.width/2, common.app.screen.height/2);
    // cityRoad_g2.scale.set(1.8, 1.8);
    // cityRoad_g2.anchor.set(0.5, 0.5);

    game2Data.missImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    game2Data.missImg_g2.position.set(common.app.screen.width-60, common.app.screen.height/2-game2Data.missImg_g2.height);
    game2Data.missImg_g2.anchor.set(1, 0);
    game2Data.missImg_g2.scale.set(0.6, 0.6);

    game2Data.mrImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    game2Data.mrImg_g2.position.set(60, 80);
    game2Data.mrImg_g2.anchor.set(0, 0);
    game2Data.mrImg_g2.scale.set(0.6, 0.6);

    game2Data.sysImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    game2Data.sysImg_g2.position.set(60, 80+game2Data.mrImg_g2.height+60);
    game2Data.sysImg_g2.anchor.set(0, 0);
    game2Data.sysImg_g2.scale.set(0.6, 0.6);

    game2Data.dash_g2 =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    game2Data.dash_g2.position.set(common.app.screen.width/2, common.app.screen.height);
    game2Data.dash_g2.anchor.set(0.5, 1);
    game2Data.dash_g2.scale.set(0.8, 0.8);

    // safeHintImg
    // car_g2 =  new PIXI.Sprite(PIXI.loader.resources.carMidImg.texture);
    // car_g2.position.set(common.app.screen.width/2, 200);
    // car_g2.scale.set(0.5, 0.5);
    // car_g2.anchor.set(0.5, 0.5);

    game2Data.leftBtn_g2 =  new PIXI.Sprite(PIXI.loader.resources.leftBtnImg.texture);
    game2Data.leftBtn_g2.position.set(60, common.app.screen.height-60);
    game2Data.leftBtn_g2.anchor.set(0, 1);

    game2Data.rightBtn_g2 =  new PIXI.Sprite(PIXI.loader.resources.rightBtnImg.texture);
    game2Data.rightBtn_g2.position.set(common.app.screen.width -60 -game2Data.rightBtn_g2.width, common.app.screen.height-60);
    game2Data.rightBtn_g2.anchor.set(0, 1);

    game2Data.hint_g2 =  new PIXI.Sprite(PIXI.loader.resources.hintImg.texture);
    game2Data.hint_g2.position.set(common.app.screen.width-60, common.app.screen.height/2 + game2Data.missImg_g2.height+100);
    game2Data.hint_g2.anchor.set(1, 1);
    game2Data.hint_g2.scale.set(0.6, 0.6);

    //安全距離
    // safeAreaRect =  new PIXI.Graphics();
    // safeAreaRect.beginFill(0x00DD00, 0.4);
    
    // safeAreaRect.drawRect(0, safeAreaMin, common.app.screen.width, (safeAreaMax-safeAreaMin)*2);
    // safeAreaRect.endFill();


    game2Data.hintTextG2 = new PIXI.Text("請將車子保持在適當距離", new PIXI.TextStyle({
        fontSize: 24,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    game2Data.hintTextG2.position.set(common.app.screen.width/2, common.app.screen.height - game2Data.dash_g2.height - 30);
    game2Data.hintTextG2.anchor.set(0.5, 0.5);

    common.prePlayStartTextG2 = new PIXI.Text("5", new PIXI.TextStyle({
        fontSize: 180,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    common.prePlayStartTextG2.position.set(common.app.screen.width/2, common.app.screen.height/2 - 200);
    common.prePlayStartTextG2.anchor.set(0.5, 0.5);
    common.prePlayStartTextG2.visible = false;

    game2Data.world3D_g2 = new PIXI.projection.Container2d();
    game2Data.world3D_g2.position.set(0, 700);
    addVanishingAssetG3();
    

    common.stage2.addChild(game2Data.cityRoadAniBg_g2)
    // stage2.addChild(cityRoad_g2);
    common.stage2.addChild(game2Data.vanishingPoint_g2);
    common.stage2.addChild(game2Data.world3D_g2);

    // stage2.addChild(dash_g2);
    // stage2.addChild(missImg_g2);
    // stage2.addChild(hint_g2);
    // stage2.addChild(mrImg_g2);
    // stage2.addChild(sysImg_g2);
    // stage2.addChild(timeText_g2);
    common.stage2.addChild(game2Data.timeRemainingText_g2);
    common.stage2.addChild(game2Data.rightBtn_g2);
    common.stage2.addChild(game2Data.leftBtn_g2);
    common.stage2.addChild(common.prePlayStartTextG2);
    common.stage2.addChild(game2Data.hintTextG2);
    common.stage2.addChild(game2Data.hintRect_g2);
    common.stage2.addChild(game2Data.g2Ui);


    game2Data.speedDownSound = PIXI.loader.resources.speedDownSound.data;
    game2Data.speedDownSound.volume = 1;
    game2Data.speedUpSound = PIXI.loader.resources.speedUpSound.data;
    game2Data.speedUpSound.volume = 1;
    

    


}


function addVanishingAssetG3(){
    game2Data.bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    game2Data.bigWhiteTexture.orig.width = 30;
    game2Data.bigWhiteTexture.orig.height = 30;

    //左右馬路線
    game2Data.lineLeft_g2 = new PIXI.projection.Sprite2d(game2Data.bigWhiteTexture);
    game2Data.lineLeft_g2.tint = 0xffffff;
    game2Data.lineLeft_g2.scale.set(1, 1000);
    game2Data.lineLeft_g2.anchor.set(0.5, 0.5);
    game2Data.lineLeft_g2.position.set((common.app.screen.width-game2Data.roadWidth_g2)/2, 0);

    game2Data.lineRight_g2 = new PIXI.projection.Sprite2d(game2Data.bigWhiteTexture);
    game2Data.lineRight_g2.tint = 0xffffff;
    game2Data.lineRight_g2.scale.set(1, 1000);
    game2Data.lineRight_g2.anchor.set(0.5, 0.5);
    game2Data.lineRight_g2.position.set((common.app.screen.width+game2Data.roadWidth_g2)/2, 0);
    
    // world3D_g2.addChild(lineLeft_g2);
    //world3D_g2.addChild(lineRight_g2);

    //橫線
    game2Data.lineGroup_g2 = [];
    for(let i=0; i< 10; i++){
        let s = new PIXI.projection.Sprite2d(game2Data.bigWhiteTexture);
        s.tint = 0xffffff;
        s.scale.set(game2Data.roadWidth_g2/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 6000*i;
        s.counterX = 0;
        s.position.set(common.app.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        game2Data.lineGroup_g2.push(s);
        // world3D_g2.addChild(s);
    }

    //加入路燈
    game2Data.streetLightGroup_g2 = [];
    for(let i=0; i< 20; i++){
        let s = new PIXI.projection.Sprite2d(PIXI.loader.resources.streetLightImg.texture);
        // s.scale.set(roadWidth_g2/30, 0.5);
        s.scale.set(8);
        s.scale.y = -8;
        if(i%2 == 0){
            s.scale.x = -8;
            s.position.set(common.app.screen.width/2 + game2Data.roadWidth_g2/2, 30000);
        }else{
            s.position.set(common.app.screen.width/2 - game2Data.roadWidth_g2/2, 30000);
        }
        s.anchor.set(0, 1);
        s.counterY = 36000*i;
        s.counterX = 0;
        
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
        //紀錄物件參考
        game2Data.streetLightGroup_g2.push(s);
        game2Data.world3D_g2.addChild(s);
    }
    //安全範圍
    
    for (let i = 0; i < 4; i++) {
        let tempS = new PIXI.projection.Sprite2d(PIXI.Texture.fromFrame('safeAreaHintImg' + i));
        tempS.width = game2Data.roadWidth_g2/5;
        tempS.height = 1500;
        tempS.scale.y = -1;
        tempS.tint = 0xff0000;
        tempS.anchor.set(0.5, 0);
        tempS.position.set(common.app.screen.width/2, game2Data.currentCarPosition);
        game2Data.safeAreaHint.push(tempS);
        game2Data.world3D_g2.addChild(tempS);
    }

    //敵方車車
    game2Data.car_g2 = new PIXI.projection.Sprite2d(PIXI.loader.resources.carMidImg.texture);
    game2Data.car_g2.scale.set(5, -5);
    game2Data.car_g2.anchor.set(0.5, 1);
    game2Data.car_g2.position.set(common.app.screen.width/2, game2Data.currentCarPosition);
    game2Data.car_g2.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    game2Data.world3D_g2.addChild(game2Data.car_g2);

    //消失點標記
    game2Data.vanishingPointStyle_g2 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    game2Data.vanishingPoint_g2 = new PIXI.Text('Ｏ', game2Data.vanishingPointStyle_g2);
    game2Data.vanishingPoint_g2.anchor.set(0.5);
    game2Data.vanishingPoint_g2.position.set(945, -35);

}
