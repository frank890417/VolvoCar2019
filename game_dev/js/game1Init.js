import game1Loop from "./game1Loop"
import {generateCrossingGroup} from "./game1Setup"

export {game1Init, resetData};
let vars;
let common;
let game1Data;

function game1Init(Vars){
    vars = Vars;
    common = Vars.common;
    game1Data = Vars.game1Data;

    let tl = new TimelineMax();
    tl.fromTo(game1Data.pedalWarning, 0.5, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
    registerGame1Event();
    //校正透視
    updateAxisG1();
    addG1PrePlay();

    
    common.app.stage.addChild(common.stage1);
    common.app.ticker.speed = 1;
    common.app.ticker.add(delta => game1Loop.game1Loop(Vars));

    common.prePlayTimelineG1.restart();
    common.isGameRunning = false;
    common.isPrePlaying = true;
    common.app.ticker.start();
}



function registerGame1Event(){
    //加入點擊事件
    game1Data.pedal.interactive = true;
    game1Data.pedal.buttonMode = true;
    
    game1Data.pedal.on("pointerdown", function(){
        if(game1Data.isPrePlaying) return;
        game1Data.pressStop = true;
        game1Data.pedal.tint = 0X555555;
    });

    game1Data.pedal.on("pointerup",function(){
        if(game1Data.isPrePlaying) return;
        game1Data.pressStop = false;
        game1Data.pedal.tint = 0XFFFFFF;
        game1Data.cityRoadAniBg.animationSpeed = game1Data.bgAnimationSpeed;
    });
    
    $( "body" ).keydown(function(e) {
        
        let k = e.keyCode;
        console.log(k);
        switch (k) {
            case 37:
                game1Data.world3D.position.x -=5;	
                break;
            case 39:
                game1Data.world3D.position.x +=5;	
                break;
            case 38:
                game1Data.world3D.position.y -=5;	
                break;
            case 40:
                game1Data.world3D.position.y +=5;	
                break;
            case 65:
                game1Data.vanishingPoint.position.x -=5;
                break;
            case 68:
                game1Data.vanishingPoint.position.x +=5;
                break;
            case 87:
                game1Data.vanishingPoint.position.y -=5;
                break;
            case 83:
                game1Data.vanishingPoint.position.y +=5;
                break;
            default:
                break;
        }
        updateAxisG1();
    });
}


function updateAxisG1(){
	let posY = game1Data.world3D.toLocal(game1Data.vanishingPoint.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	game1Data.world3D.proj.setAxisY(posY, 1);
}


function addG1PrePlay(){

    common.prePlayTimelineG1 = new TimelineMax({paused:true});
    common.prePlayTimelineG1
    .add(()=>{
        game1Data.pedal.tint = 0X555555;
        game1Data.isPrePlaying = true;
        game1Data.timeText.visible = false;
        game1Data.timeRemainingText.visible = false;
        game1Data.pressStop = true;
    }, 0)
    .add(()=>{
        game1Data.pedal.tint = 0XFFFFFF;
        game1Data.prePlayStartTextG1.text = "5";
        game1Data.prePlayStartTextG1.visible = true;
        
    }, 1)
    .add(()=>{
        game1Data.prePlayStartTextG1.text = "4";
    }, 2)
    .add(()=>{
        game1Data.pedal.tint = 0X555555;
        game1Data.prePlayStartTextG1.text = "3";
        game1Data.pressStop = false;   
        game1Data.cityRoadAniBg.animationSpeed = game1Data.bgAnimationSpeed;
    }, 3)
    .add(()=>{
        //停車安全讓汽車通過
        game1Data.prePlayStartTextG1.text = "2";
    }, 4)
    .add(()=>{
        game1Data.prePlayStartTextG1.text = "1";
    }, 5)
    .add(()=>{
        game1Data.prePlayStartTextG1.text = "GO!";
    }, 6)
    .add(()=>{
        game1Data.pedal.tint = 0XFFFFFF;
        game1Data.isPrePlaying = false;
        game1Data.prePlayStartTextG1.visible = false;
        game1Data.timeText.visible = true;
        game1Data.timeRemainingText.visible = true;
        resetAllTimers();
    }, 7)
}

function resetAllTimers(){
    game1Data.remainingTime = 30;
    game1Data.timeRemainingText.text = game1Data.remainingTime;

    clearInterval(game1Data.timerGame1);


    game1Data.timerGame1 = setInterval(function(){
        game1Data.remainingTime--;
        if(game1Data.remainingTime<=0){
            game1Data.remainingTime =0;
        }
        if(game1Data.remainingTime<=0 && false){
            game1Data.remainingTime = 0;
            console.log("恭喜過關");
            clearInterval(game1Data.timerGame1);
        }
        game1Data.timeRemainingText.text = game1Data.remainingTime;
    }, 1000);
}


function resetData(){
    if(common.prePlayTimelineG1){
        common.prePlayTimelineG1.restart();
    }
    //根據斑馬線群組產生物件
    game1Data.crossingGroup.forEach(sprite => {
        sprite.parent.removeChild(sprite);
        sprite.destroy();    
    });
    generateCrossingGroup();
    game1Data.carCounter = 4;
    game1Data.bikeCounter = 2;
    game1Data.walkCounter = 5;
    game1Data.groundMoveSpeedG1 = 0;
    resetAllTimers();
}