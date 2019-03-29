let common;
let game1Data;
export {game1Setup, generateCrossingGroup};
function game1Setup(Vars){
    common = Vars.common;
    game1Data = Vars.game1Data;

    game1Data.g1Ui =  new PIXI.Sprite(PIXI.loader.resources.g1Ui.texture);
    game1Data.g1Ui.position.set(0, 0);
    game1Data.g1Ui.anchor.set(0, 0);

    game1Data.timeText = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD3BE',
        fontWeight: 500
    }));
    game1Data.timeText.position.set(common.app.screen.width/2, 60);
    game1Data.timeText.anchor.set(0.5, 0);
    
    game1Data.timeRemainingText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 150,
        fill: '#FFD3BE',
        fontWeight: 500
    }));

    game1Data.timeRemainingText.position.set(common.app.screen.width/2 - 30, 100);
    game1Data.timeRemainingText.anchor.set(0.5, 0);
    
    game1Data.hintRect =  new PIXI.Graphics();
    game1Data.hintRect.beginFill(0x000000, 0);
    game1Data.hintRect.lineStyle(80, 0xFF0000, 1);
    game1Data.hintRect.drawRect(0, 0, common.app.screen.width, common.app.screen.height);
    game1Data.hintRect.endFill();
    game1Data.hintRect.visible = false;

    game1Data.pedal =  new PIXI.Sprite(PIXI.loader.resources.pedalImg.texture);
    game1Data.pedal.position.set(common.app.screen.width-60 , common.app.screen.height-60);
    game1Data.pedal.anchor.set(1, 1);

    game1Data.pedalWarning =  new PIXI.Sprite(PIXI.loader.resources.pedalWarningImg.texture);
    game1Data.pedalWarning.position.set(game1Data.pedal.position.x-game1Data.pedal.width/2 , game1Data.pedal.position.y-game1Data.pedal.height/2);
    game1Data.pedalWarning.anchor.set(0.5, 0.5);


    //動態背景
    
    let bgTexs = [];

    for (let i = 0; i < 119; i++) {
        let tempTex = PIXI.Texture.fromFrame('roadBgG1' + i);
        bgTexs.push(tempTex);
    }
    
    game1Data.cityRoadAniBg = new PIXI.extras.AnimatedSprite(bgTexs);
    game1Data.cityRoadAniBg.animationSpeed = game1Data.bgAnimationSpeed;
    game1Data.cityRoadAniBg.play();


    // let bgTexs = PIXI.Texture.fromVideo("images/game1/roadBgVideoG1.mp4");
    // cityRoadAniBg = new PIXI.Sprite(bgTexs);
    // bgTexs.baseTexture.source.play();

    game1Data.cityRoad =  new PIXI.Sprite(PIXI.loader.resources.cityImg.texture);
    game1Data.cityRoad.position.set(common.app.screen.width/2, common.app.screen.height/2);
    game1Data.cityRoad.scale.set(1.8, 1.8);
    game1Data.cityRoad.anchor.set(0.5, 0.5);

    game1Data.missImg =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    game1Data.missImg.position.set(common.app.screen.width-60, common.app.screen.height/2-game1Data.missImg.height);
    game1Data.missImg.anchor.set(1, 0);
    game1Data.missImg.scale.set(0.6, 0.6);

    game1Data.mrImg =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    game1Data.mrImg.position.set(60, 80);
    game1Data.mrImg.anchor.set(0, 0);
    game1Data.mrImg.scale.set(0.6, 0.6);

    game1Data.sysImg =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    game1Data.sysImg.position.set(60, 80+game1Data.mrImg.height+60);
    game1Data.sysImg.anchor.set(0, 0);
    game1Data.sysImg.scale.set(0.6, 0.6);

    game1Data.countImg = new PIXI.Sprite(PIXI.loader.resources.countImg.texture);
    game1Data.countImg.position.set(60, 80+game1Data.mrImg.height+200);
    game1Data.countImg.anchor.set(0, 0);
    game1Data.countImg.scale.set(0.6, 0.6);

    game1Data.carCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD3BE',
        fontWeight: 500
    }));
    game1Data.carCounterText.position.set(190, 80+game1Data.mrImg.height+100);
    game1Data.carCounterText.anchor.set(0, 0);

    game1Data.bikeCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD3BE',
        fontWeight: 500
    }));
    game1Data.bikeCounterText.position.set(190, 80+game1Data.mrImg.height+200);
    game1Data.bikeCounterText.anchor.set(0, 0);

    game1Data.walkCounterText = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD3BE',
        fontWeight: 500
    }));
    game1Data.walkCounterText.position.set(190, 80+game1Data.mrImg.height+300);
    game1Data.walkCounterText.anchor.set(0, 0);


    game1Data.dash =  new PIXI.Sprite(PIXI.loader.resources.dashImg.texture);
    game1Data.dash.position.set(common.app.screen.width/2, common.app.screen.height);
    game1Data.dash.anchor.set(0.5, 1);
    game1Data.dash.scale.set(0.8, 0.8);

    game1Data.hintTextG1 = new PIXI.Text("請適時地按下煞車以確保安全", new PIXI.TextStyle({
        fontSize: 24,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    game1Data.hintTextG1.position.set(common.app.screen.width/2, common.app.screen.height - game1Data.dash.height - 30);
    game1Data.hintTextG1.anchor.set(0.5, 0.5);

    common.prePlayStartTextG1 = new PIXI.Text("5", new PIXI.TextStyle({
        fontSize: 180,
        fill: '#FFFFFF',
        fontWeight: 500
    }));

    common.prePlayStartTextG1.position.set(common.app.screen.width/2, common.app.screen.height/2 - 200);
    common.prePlayStartTextG1.anchor.set(0.5, 0.5);
    common.prePlayStartTextG1.visible = false;

    game1Data.world3D = new PIXI.projection.Container2d();
    game1Data.world3D.position.set(-90, 1075);
    addVanishingAsset();

    

    common.stage1.addChild(game1Data.cityRoadAniBg);
    //stage1.addChild(cityRoad);
    //stage1.addChild(crossingGroup);

    common.stage1.addChild(game1Data.vanishingPoint);
    common.stage1.addChild(game1Data.world3D);

    // stage1.addChild(dash);
    // stage1.addChild(missImg);
    // stage1.addChild(mrImg);
    // stage1.addChild(sysImg);
    // stage1.addChild(countImg);
    common.stage1.addChild(game1Data.carCounterText);
    common.stage1.addChild(game1Data.bikeCounterText);
    common.stage1.addChild(game1Data.walkCounterText);
    common.stage1.addChild(game1Data.pedalWarning);
    common.stage1.addChild(game1Data.pedal);
    // stage1.addChild(timeText);
    common.stage1.addChild(game1Data.timeRemainingText);
    common.stage1.addChild(common.prePlayStartTextG1);
    common.stage1.addChild(game1Data.hintRect);
    common.stage1.addChild(game1Data.hintTextG1);
    common.stage1.addChild(game1Data.g1Ui);

    game1Data.speedDownSound = PIXI.loader.resources.speedDownSound.data;
    game1Data.speedDownSound.volume = 1;
    
}


function addVanishingAsset(){
    game1Data.bigWhiteTexture = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
    game1Data.bigWhiteTexture.orig.width = 30;
    game1Data.bigWhiteTexture.orig.height = 30;

    //左右馬路線
    game1Data.lineLeft = new PIXI.projection.Sprite2d(game1Data.bigWhiteTexture);
    game1Data.lineLeft.tint = 0xffffff;
    game1Data.lineLeft.scale.set(1, 1000);
    game1Data.lineLeft.anchor.set(0.5, 0.5);
    game1Data.lineLeft.position.set((common.app.screen.width-game1Data.roadWidth)/2, 0);

    game1Data.lineRight = new PIXI.projection.Sprite2d(game1Data.bigWhiteTexture);
    game1Data.lineRight.tint = 0xffffff;
    game1Data.lineRight.scale.set(1, 1000);
    game1Data.lineRight.anchor.set(0.5, 0.5);
    game1Data.lineRight.position.set((common.app.screen.width+game1Data.roadWidth)/2, 0);
    
    // world3D.addChild(lineLeft);
    // world3D.addChild(lineRight);

    //橫線
    game1Data.lineGroup = [];
    for(let i=0; i< 10; i++){
        let s = new PIXI.projection.Sprite2d(game1Data.bigWhiteTexture);
        s.tint = 0xcccccc;
        s.scale.set(game1Data.roadWidth/30, 0.5);
        s.anchor.set(0.5);
        s.counterY = 6000*i;
        s.counterX = 0;
        s.position.set(common.app.screen.width/2, 10000);
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //紀錄物件參考
        game1Data.lineGroup.push(s);
        // world3D.addChild(s);
    }

    generateCrossingGroup();
    
    game1Data.vanishingPointStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff'
    });
    
    game1Data.vanishingPoint = new PIXI.Text('Ｏ', game1Data.vanishingPointStyle);
    game1Data.vanishingPoint.anchor.set(0.5);
    game1Data.vanishingPoint.position.set(960, 330);

}


function generateCrossingGroup(){
    //根據斑馬線群組產生物件
    game1Data.crossingGroup = [];
    for(let i=0; i<game1Data.crossObjects.length; i++){
        let t, s;
        if(game1Data.crossObjects[i].type == "car"){
            t = PIXI.loader.resources.carImg.texture;
            s = new PIXI.projection.Sprite2d(t);
            s.scale.set(2);
        }else if(game1Data.crossObjects[i].type == "walk"){
            t = PIXI.loader.resources.walkImg.texture;
            s = new PIXI.projection.Sprite2d(t);
            s.scale.set(1.4);
        }else if(game1Data.crossObjects[i].type == "bike"){
            t = PIXI.loader.resources.bikeImg.texture;
            s = new PIXI.projection.Sprite2d(t);
            s.scale.set(2);
        }

        s.type = game1Data.crossObjects[i].type;
        s.counterY = game1Data.crossObjects[i].posY;
        s.side = game1Data.crossObjects[i].side;
        // s.counterX = crossObjects[i].posX;

        if(s.side == "left"){
            s.counterX = -1500;
            if(s.type == "car"){
               s.counterX = -5000;
            }
        }else{
            s.counterX = common.app.screen.width + 1500;
            s.scale.x = -1*s.scale.x;
            if(s.type == "car"){
                s.counterX = common.app.screen.width + 5000;
                s.scale.set(-2.5, 2.5);
            }
        }
        if(i==0){
            s.counterX = 500;
        }

        
        s.anchor.set(0.5);
        s.position.x = 0;
        //調整物體水平還是垂直
        s.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        game1Data.crossingGroup.push(s);
    }
    //為了 z-index 反序加入 container  中
    for(let i=game1Data.crossObjects.length-1; i>=0; i--){
        game1Data.world3D.addChild(game1Data.crossingGroup[i]);
    }

}

