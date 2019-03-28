import game2Loop from "./game2Loop"

export {game2Init, resetData};
let vars;
let common;
let game2Data;

function game2Init(Vars){
    vars = Vars;
    common = Vars.common;
    game2Data = Vars.game2Data;

    let tl = new TimelineMax();
    tl.fromTo(game2Data.hintRect_g2, 0.25, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);

    registerGame2Event();
    setUpSafeAreaAni();
    //校正透視
    updateAxisG2();
    addG2PrePlay();


    common.app.stage.addChild(common.stage2);
    common.app.ticker.speed = 1;
    common.app.ticker.add(delta => game2Loop.game2Loop(Vars));

    common.prePlayTimelineG2.restart();
    common.isGameRunning = false;
    common.isPrePlaying = true;
    common.app.ticker.start();
}



function registerGame2Event(){
    //加入點擊事件
    game2Data.rightBtn_g2.interactive = true;
    game2Data.rightBtn_g2.buttonMode = true;
    game2Data.leftBtn_g2.interactive = true;
    game2Data.leftBtn_g2.buttonMode = true;
    
    game2Data.rightBtn_g2.on("pointerdown", function(){
        if(common.isPrePlaying) return;
        game2Data.rightBtn_g2.tint = 0X555555;
        game2Data.carSpeedUp = true;
    });

    game2Data.rightBtn_g2.on("pointerup",function(){
        if(common.isPrePlaying) return;
        game2Data.rightBtn_g2.tint = 0XFFFFFF;
        game2Data.carSpeedUp = false;
    });

    game2Data.leftBtn_g2.on("pointerdown", function(){
        if(common.isPrePlaying) return;
        game2Data.leftBtn_g2.tint = 0X555555;
        game2Data.carSpeedDown = true;
    });

    game2Data.leftBtn_g2.on("pointerup",function(){
        if(common.isPrePlaying) return;
        game2Data.leftBtn_g2.tint = 0XFFFFFF;
        game2Data.carSpeedDown = false;
    });
       
    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        if(!debug) return;
        switch (k) {
            case 37:
                game2Data.world3D_g2.position.x -=5;	
                break;
            case 39:
                game2Data.world3D_g2.position.x +=5;	
                break;
            case 38:
                game2Data.world3D_g2.position.y -=5;	
                break;
            case 40:
                game2Data.world3D_g2.position.y +=5;	
                break;
            case 65:
                game2Data.vanishingPoint_g2.position.x -=5;
                break;
            case 68:
                game2Data.vanishingPoint_g2.position.x +=5;
                break;
            case 87:
                game2Data.vanishingPoint_g2.position.y -=5;
                break;
            case 83:
                game2Data.vanishingPoint_g2.position.y +=5;
                break;
            default:
                break;
        }
        //因為loop會自動更新消失點，所以觸發按鈕時暫不更新
        //updateAxisG2();
    });
}


function updateAxisG2(){
	let posY = game2Data.world3D_g2.toLocal(game2Data.vanishingPoint_g2.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	game2Data.world3D_g2.proj.setAxisY(posY, 1);
}

function setUpSafeAreaAni(){
    game2Data.safeAreaTimeline = new TimelineMax({pause: true});
    game2Data.safeAreaTimeline.add(()=>{
        for (let i = 0; i < 4; i++) {
            game2Data.safeAreaHint[i].visible = (i==game2Data.safeAreaHintIndex)? true: false;
            game2Data.safeAreaHint[i].alpha = (game2Data.safeAreaHintIndex+1)/4;
        }
        game2Data.safeAreaHintIndex = (game2Data.safeAreaHintIndex+1)%4;
    }, 0.2).repeat(3);

    //呼吸感
    let tl2 = new TimelineMax();
    tl2.fromTo(game2Data.safeAreaHint[3], 0.8, {alpha: 0}, {alpha: 0.8}).yoyo(1).repeat(-1);

}


function addG2PrePlay(){
    common.prePlayTimelineG2 = new TimelineMax({paused:true});
    common.prePlayTimelineG2
    .add(()=>{
        game2Data.timeText_g2.visible = false;
        game2Data.timeRemainingText_g2.visible = false;
        common.isPrePlaying = true;
        game2Data.leftBtn_g2.tint = 0X555555;
    }, 0)
    .add(()=>{
        common.prePlayStartTextG2.text = "5";
        common.prePlayStartTextG2.visible = true;
        game2Data.rightBtn_g2.tint = 0Xffffff;
        game2Data.carSpeedUp = true;
    }, 1)
    .add(()=>{
        common.prePlayStartTextG2.text = "4";
        
    }, 2)
    .add(()=>{
        common.prePlayStartTextG2.text = "3";
    }, 3)
    .add(()=>{
        game2Data.rightBtn_g2.tint = 0X555555;
        game2Data.carSpeedUp = false;
        common.prePlayStartTextG2.text = "2";
    }, 4)
    .add(()=>{
        game2Data.leftBtn_g2.tint = 0XFFFFFF;
        game2Data.carSpeedDown = true;
        common.prePlayStartTextG2.text = "1";
    }, 5)
    .add(()=>{
        game2Data.leftBtn_g2.tint = 0X555555;
        game2Data.carSpeedDown = false;
        common.prePlayStartTextG2.text = "GO!";
    }, 6)
    .add(()=>{
        game2Data.rightBtn_g2.tint = 0Xffffff;
        game2Data.leftBtn_g2.tint = 0XFFFFFF;
        game2Data.timeRemainingText_g2.visible = true;
        common.prePlayStartTextG2.visible = false;
        game2Data.timeText_g2.visible = true;
        common.isPrePlaying = false;
        resetAllTimers();
    }, 7)
    //車子隨機變速
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 13)
    .add(()=>{
        game2Data.carSpeedRandomSeed = +0.01;
    }, 16)
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 20)
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 23)
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 27)
    .add(()=>{
        game2Data.carSpeedRandomSeed = +0.01;
    }, 30)
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 32)
    .add(()=>{
        game2Data.carSpeedRandomSeed = +0.01;
    }, 35)
    .add(()=>{
        game2Data.carSpeedRandomSeed = -0.01;
    }, 40)
}


function resetAllTimers(){
    game2Data.remainingTime = 30;
    game2Data.timeRemainingText_g2.text = game2Data.remainingTime;

    clearInterval(game2Data.timerGame2);


    game2Data.timerGame2 = setInterval(function(){
        game2Data.remainingTime--;
        if(game2Data.remainingTime<=0){
            game2Data.remainingTime =0;
        }
        if(game2Data.remainingTime<=0 && false){
            game2Data.remainingTime = 0;
            console.log("恭喜過關");
            clearInterval(game2Data.timerGame2);
        }
        game2Data.timeRemainingText_g2.text = game2Data.remainingTime;
    }, 1000);
}


function resetData(){

    if(common.prePlayTimelineG2){
        common.prePlayTimelineG2.restart();
    }

    //重置橫線
    for(let i=0; i< 10; i++){
        let s = game2Data.lineGroup_g2[i];
        s.counterY = 6000*i;
        s.counterX = 0;
        s.position.set(common.app.screen.width/2, 10000);
    }
    
    //重置路燈
    for(let i=0; i< 20; i++){
        let s = game2Data.streetLightGroup_g2[i];
        if(i%2 == 0){
            s.scale.x = -8;
            s.position.set(common.app.screen.width/2 + game2Data.roadWidth_g2/2, 30000);
        }else{
            s.position.set(common.app.screen.width/2 - game2Data.roadWidth_g2/2, 30000);
        }
        s.anchor.set(0, 1);
        s.counterY = 24000*i;
        s.counterX = 0;
    }
    game2Data.carSpeed = 0;
    game2Data.currentCarPosition = 1200;

    resetAllTimers();
}