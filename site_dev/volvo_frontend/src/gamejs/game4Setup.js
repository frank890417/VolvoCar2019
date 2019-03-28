function setupGame4(){

    timeText_g4 = new PIXI.Text("Time", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 500
    }));
    timeText_g4.position.set(app.screen.width/2, 60);
    timeText_g4.anchor.set(0.5, 0);
    
    timeRemainingText_g4 = new PIXI.Text("30", new PIXI.TextStyle({
        fontSize: 52,
        fill: '#FFD25D',
        fontWeight: 'bold',
    }));

    timeRemainingText_g4.position.set(app.screen.width/2, 120);
    timeRemainingText_g4.anchor.set(0.5, 0);

    missImg_g4 =  new PIXI.Sprite(PIXI.loader.resources.missImg.texture);
    missImg_g4.position.set(app.screen.width-60, app.screen.height/2-missImg.height-30);
    missImg_g4.anchor.set(1, 0);
    missImg_g4.scale.set(0.6, 0.6);

    mrImg_g4 =  new PIXI.Sprite(PIXI.loader.resources.mrImg.texture);
    mrImg_g4.position.set(60, 80);
    mrImg_g4.anchor.set(0, 0);
    mrImg_g4.scale.set(0.6, 0.6);

    sysImg_g4 =  new PIXI.Sprite(PIXI.loader.resources.sysImg.texture);
    sysImg_g4.position.set(60, 80+mrImg.height+60);
    sysImg_g4.anchor.set(0, 0);
    sysImg_g4.scale.set(0.6, 0.6);

    hint_g4 =  new PIXI.Sprite(PIXI.loader.resources.hintG4Img.texture);
    hint_g4.position.set(app.screen.width-60, app.screen.height/2 + missImg.height);
    hint_g4.anchor.set(1, 1);
    hint_g4.scale.set(0.6, 0.6);

    roadMap_g4 =  new PIXI.Sprite(PIXI.loader.resources.hintG4Img.texture);
    roadMap_g4.position.set(app.screen.width-60, app.screen.height/2 + missImg.height);
    roadMap_g4.anchor.set(1, 1);


    roadMap_g4 =  new PIXI.Sprite(PIXI.loader.resources.roadMapG4Img.texture);
    roadMap_g4.position.set(0, 0);
    
    myCar_g4 =  new PIXI.Sprite(PIXI.loader.resources.myCarG4Img.texture);
    myCar_g4.position.set(0, 0);
    myCar_g4.anchor.set(0.5, 0.5);
    myCar_g4.scale.set(3);

    myCarMovingArea_g4 = new PIXI.Container();
    myCarMovingArea_g4.addChild(myCar_g4);
    myCarMovingArea_g4.position.set(592, 377);

    armyCar_g4 =  new PIXI.Sprite(PIXI.loader.resources.armyCarG4Img.texture);
    armyCar_g4.position.set(592, 377);
    armyCar_g4.anchor.set(0.5, 0.5);
    armyCar_g4.scale.set(3);

    mouseTracker = new PIXI.Graphics();
    mouseTracker.position.set(0, 0);

    basicText = new PIXI.Text('0');
    basicText.position.set(10, 10);


    hintRect_g4 =  new PIXI.Graphics();
    hintRect_g4.beginFill(0x000000, 0);
    hintRect_g4.lineStyle(80, 0xFF0000, 1);
    hintRect_g4.drawRect(0, 0, app.screen.width, app.screen.height);
    hintRect_g4.endFill();
    hintRect_g4.visible = false;


    roadContainer = new PIXI.Container();
    roadContainer.addChild(roadMap_g4);
    roadContainer.addChild(myCarMovingArea_g4);
    roadContainer.addChild(armyCar_g4);

    stage4.addChild(timeText_g4);
    stage4.addChild(timeRemainingText_g4);
    stage4.addChild(roadContainer);
    stage4.addChild(missImg_g4);
    stage4.addChild(hint_g4);
    stage4.addChild(mrImg_g4);
    stage4.addChild(sysImg_g4);

    stage4.addChild(mouseTracker);
    stage4.addChild(basicText);
    stage4.addChild(hintRect_g4);
}