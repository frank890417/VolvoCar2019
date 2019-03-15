function setupGame2(){

    timeText_g2 = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    timeText_g2.position.set(app.screen.width/2, 60);
    timeText_g2.anchor.set(0.5, 0);
    
    timeRemainingText_g2 = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 'bold',
    }));

    timeRemainingText_g2.position.set(app.screen.width/2, 120);
    timeRemainingText_g2.anchor.set(0.5, 0);

    // let bgTexs = [], i;

    // for (i = 0; i < 480; i++) {
    //      let tempTex = PIXI.Texture.fromFrame('roadBgG2' + i);
    //      bgTexs.push(tempTex);
    // }
    
    // cityRoadAniBg_g2 = new PIXI.extras.AnimatedSprite(bgTexs);
    // cityRoadAniBg_g2.scale.set(2, 2);
    // cityRoadAniBg_g2.animationSpeed = 1;
    // cityRoadAniBg_g2.play();


    // cityRoad_g2 =  new PIXI.Sprite(PIXI.loader.resources.cityImg.texture);
    // cityRoad_g2.position.set(app.screen.width/2, app.screen.height/2);
    // cityRoad_g2.scale.set(1.8, 1.8);
    // cityRoad_g2.anchor.set(0.5, 0.5);

    missImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    missImg_g2.position.set(app.screen.width-60, app.screen.height/2-missImg_g2.height);
    missImg_g2.anchor.set(1, 0);
    missImg_g2.scale.set(0.6, 0.6);

    mrImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    mrImg_g2.position.set(60, 80);
    mrImg_g2.anchor.set(0, 0);
    mrImg_g2.scale.set(0.6, 0.6);

    sysImg_g2 =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    sysImg_g2.position.set(60, 80+mrImg_g2.height+60);
    sysImg_g2.anchor.set(0, 0);
    sysImg_g2.scale.set(0.6, 0.6);

    dash_g2 =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    dash_g2.position.set(app.screen.width/2, app.screen.height);
    dash_g2.anchor.set(0.5, 1);
    dash_g2.scale.set(0.8, 0.8);

    // safeHintImg
    // car_g2 =  new PIXI.Sprite(PIXI.loader.resources.carMidImg.texture);
    // car_g2.position.set(app.screen.width/2, 200);
    // car_g2.scale.set(0.5, 0.5);
    // car_g2.anchor.set(0.5, 0.5);

    leftBtn_g2 =  new PIXI.Sprite(PIXI.loader.resources.leftBtnImg.texture);
    leftBtn_g2.position.set(60, app.screen.height-60);
    leftBtn_g2.anchor.set(0, 1);

    rightBtn_g2 =  new PIXI.Sprite(PIXI.loader.resources.rightBtnImg.texture);
    rightBtn_g2.position.set(app.screen.width -60 -rightBtn_g2.width, app.screen.height-60);
    rightBtn_g2.anchor.set(0, 1);

    hint_g2 =  new PIXI.Sprite(PIXI.loader.resources.hintImg.texture);
    hint_g2.position.set(app.screen.width-60, app.screen.height/2 + missImg_g2.height+100);
    hint_g2.anchor.set(1, 1);
    hint_g2.scale.set(0.6, 0.6);

    //安全距離
    // safeAreaRect =  new PIXI.Graphics();
    // safeAreaRect.beginFill(0x00DD00, 0.4);
    
    // safeAreaRect.drawRect(0, safeAreaMin, app.screen.width, (safeAreaMax-safeAreaMin)*2);
    // safeAreaRect.endFill();


    world3D_g2 = new PIXI.projection.Container2d();
    world3D_g2.position.set(0, 700);
    addVanishingAssetG2();
    

    //stage2.addChild(cityRoadAniBg_g2)
    // stage2.addChild(cityRoad_g2);
    stage2.addChild(vanishingPoint_g2);
    stage2.addChild(world3D_g2);

    stage2.addChild(dash_g2);
    stage2.addChild(missImg_g2);
    stage2.addChild(hint_g2);
    stage2.addChild(mrImg_g2);
    stage2.addChild(sysImg_g2);
    stage2.addChild(timeText_g2);
    stage2.addChild(timeRemainingText_g2);
    stage2.addChild(rightBtn_g2);
    stage2.addChild(leftBtn_g2);

}


function addVanishingAssetG2(){
    bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    bigWhiteTexture.orig.width = 30;
    bigWhiteTexture.orig.height = 30;

    //左右馬路線
    lineLeft_g2 = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineLeft_g2.tint = 0xffffff;
    lineLeft_g2.scale.set(1, 1000);
    lineLeft_g2.anchor.set(0.5, 0.5);
    lineLeft_g2.position.set((app.screen.width-roadWidth_g2)/2, 0);

    lineRight_g2 = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineRight_g2.tint = 0xffffff;
    lineRight_g2.scale.set(1, 1000);
    lineRight_g2.anchor.set(0.5, 0.5);
    lineRight_g2.position.set((app.screen.width+roadWidth_g2)/2, 0);
    
    world3D_g2.addChild(lineLeft_g2);
    world3D_g2.addChild(lineRight_g2);

    //橫線
    lineGroup_g2 = [];
    for(let i=0; i< 20; i++){
        let s = new PIXI.projection.Sprite2d(bigWhiteTexture);
        s.tint = 0xffffff;
        s.scale.set(roadWidth_g2/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 2000*i;
        s.counterX = 0;
        s.position.set(app.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        lineGroup_g2.push(s);
        world3D_g2.addChild(s);
    }

    //加入路燈
    streetLightGroup_g2 = [];
    for(let i=0; i< 20; i++){
        let s = new PIXI.projection.Sprite2d(PIXI.loader.resources.streetLightImg.texture);
        // s.scale.set(roadWidth_g2/30, 0.5);
        s.scale.set(8);
        s.scale.y = -8;
        if(i%2 == 0){
            s.scale.x = -8;
            s.position.set(app.screen.width/2 + roadWidth_g2/2, 30000);
        }else{
            s.position.set(app.screen.width/2 - roadWidth_g2/2, 30000);
        }
        s.anchor.set(0, 1);
        s.counterY = 12000*i;
        s.counterX = 0;
        
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
        //紀錄物件參考
        streetLightGroup_g2.push(s);
        world3D_g2.addChild(s);
    }
    //安全範圍
    
    for (let i = 0; i < 4; i++) {
        let tempS = new PIXI.projection.Sprite2d(PIXI.Texture.fromFrame('safeAreaHintImg' + i));
        tempS.width = roadWidth_g2/5;
        tempS.height = 1500;
        tempS.scale.y = -1;
        tempS.tint = 0xff0000;
        tempS.anchor.set(0.5, 0);
        tempS.position.set(app.screen.width/2, currentCarPosition);
        safeAreaHint.push(tempS);
        world3D_g2.addChild(tempS);
    }

    //敵方車車
    car_g2 = new PIXI.projection.Sprite2d(PIXI.loader.resources.carMidImg.texture);
    car_g2.scale.set(5, -5);
    car_g2.anchor.set(0.5, 1);
    car_g2.position.set(app.screen.width/2, currentCarPosition);
    car_g2.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    world3D_g2.addChild(car_g2);

    //消失點標記
    vanishingPointStyle_g2 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    vanishingPoint_g2 = new PIXI.Text('Ｏ', vanishingPointStyle_g2);
    vanishingPoint_g2.anchor.set(0.5);
    vanishingPoint_g2.position.set(945, -35);

}
