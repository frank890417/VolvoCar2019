
function setupGame1(){

    

    timeText = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    timeText.position.set(app.screen.width/2, 60);
    timeText.anchor.set(0.5, 0);
    
    timeRemainingText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));

    timeRemainingText.position.set(app.screen.width/2, 120);
    timeRemainingText.anchor.set(0.5, 0);
    
    hintRect =  new PIXI.Graphics();
    hintRect.beginFill(0x000000, 0);
    hintRect.lineStyle(80, 0xFF0000, 1);
    hintRect.drawRect(0, 0, app.screen.width, app.screen.height);
    hintRect.endFill();
    hintRect.visible = false;

    pedal =  new PIXI.Sprite(PIXI.loader.resources.pedalImg.texture);
    pedal.position.set(app.screen.width-60 , app.screen.height-60);
    pedal.anchor.set(1, 1);

    pedalWarning =  new PIXI.Sprite(PIXI.loader.resources.pedalWarningImg.texture);
    pedalWarning.position.set(pedal.position.x-pedal.width/2 , pedal.position.y-pedal.height/2);
    pedalWarning.anchor.set(0.5, 0.5);


    //動態背景
    let bgTexs = [], i;

    for (i = 36; i < 297; i++) {
         let tempTex = PIXI.Texture.fromFrame('roadBgG1' + i);
         bgTexs.push(tempTex);
    }
    
    cityRoadAniBg = new PIXI.extras.AnimatedSprite(bgTexs);
    cityRoadAniBg.animationSpeed = 1;
    cityRoadAniBg.play();


    // let bgTexs = PIXI.Texture.fromVideo("images/game1/roadBgVideoG1.mp4");
    // cityRoadAniBg = new PIXI.Sprite(bgTexs);
    // bgTexs.baseTexture.source.play();

    cityRoad =  new PIXI.Sprite(PIXI.loader.resources.cityImg.texture);
    cityRoad.position.set(app.screen.width/2, app.screen.height/2);
    cityRoad.scale.set(1.8, 1.8);
    cityRoad.anchor.set(0.5, 0.5);

    missImg =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    missImg.position.set(app.screen.width-60, app.screen.height/2-missImg.height);
    missImg.anchor.set(1, 0);
    missImg.scale.set(0.6, 0.6);

    mrImg =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    mrImg.position.set(60, 80);
    mrImg.anchor.set(0, 0);
    mrImg.scale.set(0.6, 0.6);

    sysImg =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    sysImg.position.set(60, 80+mrImg.height+60);
    sysImg.anchor.set(0, 0);
    sysImg.scale.set(0.6, 0.6);

    countImg = new PIXI.Sprite(PIXI.loader.resources.countImg.texture);
    countImg.position.set(60, 80+mrImg.height+200);
    countImg.anchor.set(0, 0);
    countImg.scale.set(0.6, 0.6);

    carCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    carCounterText.position.set(190, 80+mrImg.height+180);
    carCounterText.anchor.set(0, 0);

    bikeCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    bikeCounterText.position.set(190, 80+mrImg.height+240);
    bikeCounterText.anchor.set(0, 0);

    walkCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    walkCounterText.position.set(190, 80+mrImg.height+300);
    walkCounterText.anchor.set(0, 0);


    dash =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    dash.position.set(app.screen.width/2, app.screen.height);
    dash.anchor.set(0.5, 1);
    dash.scale.set(0.8, 0.8);


    world3D = new PIXI.projection.Container2d();
    world3D.position.set(-90, 1075);
    addVanishingAsset();
    

    stage1.addChild(cityRoadAniBg);
    //stage1.addChild(cityRoad);
    //stage1.addChild(crossingGroup);

    stage1.addChild(vanishingPoint);
    stage1.addChild(world3D);

    stage1.addChild(dash);
    stage1.addChild(missImg);
    stage1.addChild(mrImg);
    stage1.addChild(sysImg);
    stage1.addChild(countImg);
    stage1.addChild(carCounterText);
    stage1.addChild(bikeCounterText);
    stage1.addChild(walkCounterText);
    stage1.addChild(pedalWarning);
    stage1.addChild(pedal);
    stage1.addChild(timeText);
    stage1.addChild(timeRemainingText);
    stage1.addChild(hintRect);
}


function addVanishingAsset(){
    bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    bigWhiteTexture.orig.width = 30;
    bigWhiteTexture.orig.height = 30;

    //左右馬路線
    lineLeft = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineLeft.tint = 0xffffff;
    lineLeft.scale.set(1, 1000);
    lineLeft.anchor.set(0.5, 0.5);
    lineLeft.position.set((app.screen.width-roadWidth)/2, 0);

    lineRight = new PIXI.projection.Sprite2d(bigWhiteTexture);
    lineRight.tint = 0xffffff;
    lineRight.scale.set(1, 1000);
    lineRight.anchor.set(0.5, 0.5);
    lineRight.position.set((app.screen.width+roadWidth)/2, 0);
    
    world3D.addChild(lineLeft);
    world3D.addChild(lineRight);

    //橫線
    lineGroup = [];
    for(let i=0; i< 20; i++){
        let s = new PIXI.projection.Sprite2d(bigWhiteTexture);
        s.tint = 0xffffff;
        s.scale.set(roadWidth/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 2000*i;
        s.counterX = 0;
        s.position.set(app.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        lineGroup.push(s);
        world3D.addChild(s);
    }

    //根據斑馬線群組產生物件
    crossingGroup = [];
    for(let i=0; i<6; i++){
        let t;
        if(crossObjects[i].type == "car"){
            t = PIXI.loader.resources.carImg.texture;
        }else if(crossObjects[i].type == "walk"){
            t = PIXI.loader.resources.walkImg.texture;
        }else if(crossObjects[i].type == "bike"){
            t = PIXI.loader.resources.bikeImg.texture;
        }
        
        let s = new PIXI.projection.Sprite2d(t);
        s.type = crossObjects[i].type;
        s.counterY = crossObjects[i].posY;
        s.counterX = 0;
        s.anchor.set(1);
        s.position.x = 0;
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        crossingGroup.push(s);
    }
    //為了 z-index 反序加入 container  中
    for(let i=5; i>=0; i--){
        world3D.addChild(crossingGroup[i]);
    }
    


    vanishingPointStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    vanishingPoint = new PIXI.Text('Ｏ', vanishingPointStyle);
    vanishingPoint.anchor.set(0.5);
    vanishingPoint.position.set(960, 715);

}

