function setupGame3(){

    timeText_g3 = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    timeText_g3.position.set(app.screen.width/2, 60);
    timeText_g3.anchor.set(0.5, 0);
    
    timeRemainingText_g3 = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 'bold',
    }));

    timeRemainingText_g3.position.set(app.screen.width/2, 120);
    timeRemainingText_g3.anchor.set(0.5, 0);

    hintRect_g3 =  new PIXI.Graphics();
    hintRect_g3.beginFill(0xFF0000, 1);
    //hintRect_g3.lineStyle(80, 0xFF0000, 1);
    hintRect_g3.drawRect(0, 0, app.screen.width, app.screen.height);
    hintRect_g3.endFill()
    hintRect_g3.alpha = 0;

    hintRectGood_g3 =  new PIXI.Graphics();
    hintRectGood_g3.beginFill(0x000000, 0);
    hintRectGood_g3.lineStyle(80, 0x00FF00, 1);
    hintRectGood_g3.drawRect(0, 0, app.screen.width, app.screen.height);
    hintRectGood_g3.endFill()
    hintRectGood_g3.alpha = 0;

    cityRoad_g3 =  new PIXI.Sprite(PIXI.loader.resources.cityG3Img.texture);
    cityRoad_g3.position.set(app.screen.width/2, app.screen.height/2);
    cityRoad_g3.scale.set(1, 1);
    cityRoad_g3.anchor.set(0.5, 0.5);

    missImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    missImg_g3.position.set(app.screen.width-60, app.screen.height/2-missImg.height);
    missImg_g3.anchor.set(1, 0);
    missImg_g3.scale.set(0.6, 0.6);

    mrImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    mrImg_g3.position.set(60, 80);
    mrImg_g3.anchor.set(0, 0);
    mrImg_g3.scale.set(0.6, 0.6);

    sysImg_g3 =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    sysImg_g3.position.set(60, 80+mrImg.height+60);
    sysImg_g3.anchor.set(0, 0);
    sysImg_g3.scale.set(0.6, 0.6);

    dash_g3 =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    dash_g3.position.set(app.screen.width/2, app.screen.height);
    dash_g3.anchor.set(0.5, 1);
    dash_g3.scale.set(0.8, 0.8);

    // car_g3 =  new PIXI.Sprite(PIXI.loader.resources.carMidImg.texture);
    // car_g3.position.set(app.screen.width/2, 500);
    // car_g3.anchor.set(0.5, 0.5);
    // car_g3.scale.set(0.6, 0.6);

    leftBtn_g3 =  new PIXI.Sprite(PIXI.loader.resources.leftBtnG3Img.texture);
    leftBtn_g3.position.set(60, app.screen.height-60);
    leftBtn_g3.anchor.set(0, 1);

    rightBtn_g3 =  new PIXI.Sprite(PIXI.loader.resources.rightBtnG3Img.texture);
    rightBtn_g3.position.set(app.screen.width -60 -rightBtn_g3.width, app.screen.height-60);
    rightBtn_g3.anchor.set(0, 1);

    hint_g3 =  new PIXI.Sprite(PIXI.loader.resources.hintG3Img.texture);
    hint_g3.position.set(app.screen.width-60, app.screen.height/2 + missImg.height+100);
    hint_g3.anchor.set(1, 1);
    hint_g3.scale.set(0.6, 0.6);

    //後照鏡
    mirrorBgLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBgLeftImg.texture);
    mirrorBgRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBgRightImg.texture);

    let mirrorLeftPosition = {
        x: app.screen.width/2 - mirrorBgLeft_g3.width-100,
        y: 80
    }
    let mirrorRightPosition = {
        x: app.screen.width/2 +100,
        y: 80
    }

    mirrorBorderLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBorderLeftImg.texture);
    mirrorBorderLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    mirrorBorderRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorBorderRightImg.texture);
    mirrorBorderRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    
    carInMirrorLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.carInMirrorLeftImg.texture);
    carInMirrorLeft_g3.position.set(mirrorBgLeft_g3.width/2-60, -200);
    carInMirrorLeft_g3.scale.set(0.1, 0.1);
    carInMirrorLeft_g3.anchor.set(0.5, 0.5);

    carInMirrorRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.carInMirrorRightImg.texture);
    carInMirrorRight_g3.position.set(mirrorBgRight_g3.width/2+60, -200);
    carInMirrorRight_g3.scale.set(0.1, 0.1);
    carInMirrorRight_g3.anchor.set(0.5, 0.5);

    mirrorLeft_g3 = new PIXI.Container();
    mirrorRight_g3 = new PIXI.Container();
    mirrorLeft_g3.addChild(mirrorBgLeft_g3);
    mirrorLeft_g3.addChild(carInMirrorLeft_g3);
    mirrorRight_g3.addChild(mirrorBgRight_g3);
    mirrorRight_g3.addChild(carInMirrorRight_g3);
    
    mirrorLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    mirrorRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    
    mirrorMaskLeft_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorMaskLeftImg.texture);
    mirrorMaskLeft_g3.position.set(mirrorLeftPosition.x, mirrorLeftPosition.y);
    mirrorLeft_g3.mask = mirrorMaskLeft_g3;
    mirrorMaskRight_g3 =  new PIXI.Sprite(PIXI.loader.resources.mirrorMaskRightImg.texture);
    mirrorMaskRight_g3.position.set(mirrorRightPosition.x, mirrorRightPosition.y);
    mirrorRight_g3.mask = mirrorMaskRight_g3;
    
    mirrorHintLeft_g3 = new PIXI.Sprite(PIXI.loader.resources.mirrorHintLeftImg.texture);
    mirrorHintLeft_g3.position.set(mirrorLeftPosition.x-120, mirrorLeftPosition.y-120);
    mirrorHintLeft_g3.visible = false;
    mirrorHintRight_g3 = new PIXI.Sprite(PIXI.loader.resources.mirrorHintRightImg.texture);
    mirrorHintRight_g3.position.set(mirrorRightPosition.x-120, mirrorRightPosition.y-120);
    mirrorHintRight_g3.visible = false;

    hintTextG3 = new PIXI.Text("請注意後照鏡並透過左右按鈕提醒車主", new PIXI.TextStyle({
        fontSize: 24,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    hintTextG3.position.set(app.screen.width/2, app.screen.height/2 + 200);
    hintTextG3.anchor.set(0.5, 0.5);


    prePlayStartTextG3 = new PIXI.Text("5", new PIXI.TextStyle({
        fontSize: 180,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    prePlayStartTextG3.position.set(app.screen.width/2, app.screen.height/2 - 200);
    prePlayStartTextG3.anchor.set(0.5, 0.5);
    prePlayStartTextG3.visible = false;

    addVanishingAssetG3();
    
    stage3.addChild(cityRoad_g3);

    stage3.addChild(vanishingPoint_g3);
    stage3.addChild(world3D_g3);


    stage3.addChild(missImg_g3);
    stage3.addChild(hint_g3);
    stage3.addChild(mrImg_g3);
    stage3.addChild(sysImg_g3);
    stage3.addChild(timeText_g3);
    stage3.addChild(timeRemainingText_g3);
    
    stage3.addChild(mirrorHintLeft_g3);
    stage3.addChild(mirrorHintRight_g3);
    stage3.addChild(mirrorLeft_g3);
    stage3.addChild(mirrorRight_g3);
    stage3.addChild(mirrorMaskRight_g3);
    stage3.addChild(mirrorMaskLeft_g3);
    stage3.addChild(mirrorBorderLeft_g3);
    stage3.addChild(mirrorBorderRight_g3);

    stage3.addChild(rightBtn_g3);
    stage3.addChild(leftBtn_g3);
    stage3.addChild(hintRect_g3);
    stage3.addChild(hintRectGood_g3);
    stage3.addChild(hintTextG3);
    stage3.addChild(prePlayStartTextG3);


    
    
}

function addVanishingAssetG3(){
    world3D_g3 = new PIXI.projection.Container2d();
    world3D_g3.position.set(300, 910);

    bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    bigWhiteTexture.orig.width = 30;
    bigWhiteTexture.orig.height = 30;

    //左右馬路線
    lineLeft_g3 = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineLeft_g3.tint = 0xffffff;
    lineLeft_g3.scale.set(1, 1000);
    lineLeft_g3.anchor.set(0.5, 0.5);
    lineLeft_g3.position.set((app.screen.width-roadWidth_g3)/2, 0);

    lineRight_g3 = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineRight_g3.tint = 0xffffff;
    lineRight_g3.scale.set(1, 1000);
    lineRight_g3.anchor.set(0.5, 0.5);
    lineRight_g3.position.set((app.screen.width+roadWidth_g3)/2, 0);
    
    // world3D_g3.addChild(lineLeft_g3);
    // world3D_g3.addChild(lineRight_g3);

    //橫線
    lineGroup_g3 = [];
    for(let i=0; i< 10; i++){
        let s = new PIXI.projection.Sprite2d(bigWhiteTexture);
        s.tint = 0xffffff;
        s.scale.set(roadWidth_g3/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 3000*i;
        s.counterX = 0;
        s.position.set(app.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        lineGroup_g3.push(s);
        // world3D_g3.addChild(s);
    }


    //wifi
    for (let i = 1; i < 6; i++) {
        let tempTex = PIXI.Texture.fromFrame('wifiImg' + i);
        
        let tempLeftWifi = new PIXI.projection.Sprite2d(tempTex);
        tempLeftWifi.scale.set(-1.2, -1.2);
        tempLeftWifi.tint = 0xffd25d;
        tempLeftWifi.position.set(app.screen.width/2 - 300, carPosY_g3 - 500);
        leftWifi.push(tempLeftWifi);

        let tempRightWifi=  new PIXI.projection.Sprite2d(tempTex);
        tempRightWifi.position.set(app.screen.width/2 + 50, carPosY_g3 - 500);
        tempRightWifi.scale.set(1.2, -1.2);
        tempRightWifi.tint = 0xffd25d;
        rightWifi.push(tempRightWifi);
        
        world3D_g3.addChild(tempLeftWifi);
        world3D_g3.addChild(tempRightWifi);

    }

    //左右來車
    carComingLeft_g3 =  new PIXI.projection.Sprite2d(PIXI.loader.resources.carComingLeftImg.texture);
    carComingLeft_g3.scale.set(5, -5);
    carComingLeft_g3.anchor.set(0.5);
    carComingLeft_g3.position.set(app.screen.width/2 - roadWidth_g3/4 +100, -1000);
    carComingLeft_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    carComingLeft_g3.visible = false;
    world3D_g3.addChild(carComingLeft_g3);

    carComingRight_g3 =  new PIXI.projection.Sprite2d(PIXI.loader.resources.carComingRightImg.texture);
    carComingRight_g3.scale.set(5, -5);
    carComingRight_g3.anchor.set(0.5);
    carComingRight_g3.position.set(app.screen.width/2+ roadWidth_g3/4 -100, -1000);
    carComingRight_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    carComingRight_g3.visible = false;
    world3D_g3.addChild(carComingRight_g3);

    //中間車車
    car_g3 = new PIXI.projection.Sprite2d(PIXI.loader.resources.carMidImg.texture);
    car_g3.scale.set(5, -5);
    car_g3.anchor.set(0.5, 0.5);
    car_g3.position.set(app.screen.width/2, carPosY_g3);
    car_g3.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
    world3D_g3.addChild(car_g3);


    
    
    

    //消失點標記
    vanishingPointStyle_g3 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    vanishingPoint_g3 = new PIXI.Text('Ｏ', vanishingPointStyle_g3);
    vanishingPoint_g3.anchor.set(0.5);
    vanishingPoint_g3.position.set(960, 535);

}
