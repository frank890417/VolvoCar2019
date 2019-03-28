import game3Loop from "./game3Loop"

export {game3Init, resetData};
let vars;
let common;
let game3Data;


function game3Init(Vars){
    vars = Vars;
    common = Vars.common;
    game3Data = Vars.game3Data;

    setUpCarMovingAnimation();
    addMirrorCarAni();
    registerGame3Event();    
    updateAxisG3();
    setUpWifiAni();
    addG3PrePlay();
    game3Data.rightBtnClick_g3 = false;
    game3Data.leftBtnClick_g3 = false;

    let tl = new TimelineMax();
    tl.fromTo(game3Data.mirrorHintLeft_g3, 0.2, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
    let tr = new TimelineMax();
    tr.fromTo(game3Data.mirrorHintRight_g3, 0.2, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);


    common.app.stage.addChild(common.stage3);
    common.app.ticker.speed = 1;
    common.app.ticker.add(delta => game3Loop.game3Loop(Vars));

    common.prePlayTimelineG3.restart();
    common.isGameRunning = false;
    common.isPrePlaying = true;
    common.app.ticker.start();

}

function registerGame3Event(){
    game3Data.rightBtn_g3.interactive = true;
    game3Data.rightBtn_g3.buttonMode = true;
    game3Data.leftBtn_g3.interactive = true;
    game3Data.leftBtn_g3.buttonMode = true;
    
    game3Data.rightBtn_g3.on("pointerdown", function(){
        if(common.isPrePlaying) return;
        game3Data.rightWifiTimeline.restart();
        game3Data.rightBtn_g3.tint = 0X555555;
        game3Data.rightBtnClick_g3 = true;
    });

    game3Data.rightBtn_g3.on("pointerup",function(){
        if(common.isPrePlaying) return;
        game3Data.rightBtn_g3.tint = 0XFFFFFF;
        game3Data.rightBtnClick_g3 = false;
    });

    game3Data.leftBtn_g3.on("pointerdown", function(){
        if(common.isPrePlaying) return;
        game3Data.leftWifiTimeline.restart();
        game3Data.leftBtn_g3.tint = 0X555555;
        game3Data.leftBtnClick_g3 = true;
    });

    game3Data.leftBtn_g3.on("pointerup",function(){
        if(common.isPrePlaying) return;
        game3Data.leftBtn_g3.tint = 0XFFFFFF;
        game3Data.leftBtnClick_g3 = false;
    });

    
    $( "body" ).keyup(function(e) {
        let k = e.keyCode;
        if(common.isPrePlaying) return;
        switch (k) {
            case 37:
            game3Data.leftBtn_g3.tint = 0XFFFFFF;
            game3Data.leftBtnClick_g3 = false;
                break;
            case 39:
            game3Data.rightBtn_g3.tint = 0XFFFFFF;
            game3Data.rightBtnClick_g3 = false;
                break;
        }
    });

    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        console.log(k);
        let power = 20;
        if(common.isPrePlaying) return;
        switch (k) {
            case 37:
                game3Data.leftWifiTimeline.restart();
                game3Data.leftBtn_g3.tint = 0X555555;
                game3Data.leftBtnClick_g3 = true;
                break;
            case 39:
                game3Data.rightWifiTimeline.restart();
                game3Data.rightBtn_g3.tint = 0X555555;
                game3Data.rightBtnClick_g3 = true;
                break;
        }

        if(1) return;
        switch (k) {
            case 37:
                game3Data.world3D_g3.position.x -=power;	
                console.log(game3Data.world3D_g3.position.x)
                break;
            case 39:
                game3Data.world3D_g3.position.x +=power;	
                break;
            case 38:
                game3Data.world3D_g3.position.y -=power;	
                break;
            case 40:
                game3Data.world3D_g3.position.y +=power;	
                break;
            case 65:
                game3Data.vanishingPoint_g3.position.x -=power;
                break;
            case 68:
                game3Data.vanishingPoint_g3.position.x +=power;
                break;
            case 87:
                game3Data.vanishingPoint_g3.position.y -=power;
                break;
            case 83:
                game3Data.vanishingPoint_g3.position.y +=power;
                break;
            default:
                break;
        }
        updateAxisG3();
    });

}

function updateAxisG3(){
	let posY = game3Data.world3D_g3.toLocal(game3Data.vanishingPoint_g3.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	game3Data.world3D_g3.proj.setAxisY(posY, 1);
}

function nextCarSideSequence(){
//出下一題
    if(game3Data.carSideSequence[game3Data.carSideSequenceIndex] == "left"){
        game3Data.carLeftTimeline_g3.restart()
    }else{
        game3Data.carRightTimeline_g3.restart()
    }
    game3Data.carSideSequenceIndex = (game3Data.carSideSequenceIndex+1)%6;
}

function setUpCarMovingAnimation(){
    //下方來車動畫設定
    let carComingLeftMove = TweenMax.fromTo(game3Data.carComingLeft_g3.position, 10, {
        y: -1000, ease: Power0.easeNone
    },{
        y: 10000
    });
   
    game3Data.carLeftTimeline_g3 = new TimelineMax({
        onStart: ()=>{
            game3Data.isLeftCarComes = true;
            showMirrorCar("left");

            //車子往左靠的動畫
            game3Data.carMoveLeftAni = TweenMax.to(game3Data.car_g3.position, 3,{
                x: common.app.screen.width/2 - 300, ease: Power0.easeNone
            }).delay(3);
            //鏡子中的也要移動
            game3Data.carMoveRightAniMirror = TweenMax.to(game3Data.mirrorBgRight_g3.position, 3,{
                x: -200, ease: Power0.easeNone
            }).delay(3);

            game3Data.carMoveLeftAniMirror = TweenMax.to(game3Data.mirrorBgLeft_g3.position, 3,{
                x: 100, ease: Power0.easeNone
            }).delay(3);
        },
        onComplete: ()=>{
            game3Data.carLeftTimeline_g3.seek(0);
            game3Data.carLeftTimeline_g3.pause();
            nextCarSideSequence();
            game3Data.carComingLeft_g3.visible = false;
        },
        paused:true
    });

    game3Data.carLeftTimeline_g3
    .add(()=>{
        game3Data.carComingLeft_g3.visible = false;
    }, 0)
    .add(carComingLeftMove, 4)
    .add(()=>{
        game3Data.carComingLeft_g3.visible = true;
    }, 4.5)
    .add(function(){
        game3Data.isLeftCarComes = false;
        if(game3Data.carMoveLeftAni){
            //如果位移動畫存在，代表沒有成功，也就是要撞到了
            TweenMax.to(game3Data.car_g3.position, 0.5,{
                x: common.app.screen.width/2 - 150,
                ease: Elastic.easeOut.config(1, 0.3)
            });
            //回到中間
            let tl = new TimelineMax({
                onComplete: ()=>{
                    game3Data.carComingLeft_g3.position.y = -1000;
                    setToCenter();
                }
            });
            tl.fromTo(game3Data.hintRect_g3, 0.2, {alpha: 0.3}, {alpha: 0}).yoyo(1).repeat(6);
        }
    }, 4.7);


    let carComingRightMove = TweenMax.fromTo(game3Data.carComingRight_g3.position, 10, {
        y: -1000, ease: Power0.easeNone
    },{
        y: 10000
    });
   
    game3Data.carRightTimeline_g3 = new TimelineMax({
        onStart: ()=>{
            game3Data.isRightCarComes = true;
            showMirrorCar("right");
            
            //這邊會建立 車子往右靠的動畫
            game3Data.carMoveRightAni = TweenMax.to(game3Data.car_g3.position, 3,{
                x: common.app.screen.width/2 + 300, ease: Power0.easeNone
            }).delay(3);
            game3Data.carMoveRightAniMirror = TweenMax.to(game3Data.mirrorBgRight_g3.position, 3,{
                x: -400, ease: Power0.easeNone
            }).delay(3);

            game3Data.carMoveLeftAniMirror = TweenMax.to(game3Data.mirrorBgLeft_g3.position, 3,{
                x: -100, ease: Power0.easeNone
            }).delay(3);

        },
        onComplete: ()=>{
            game3Data.carRightTimeline_g3.seek(0);
            game3Data.carRightTimeline_g3.pause();
            nextCarSideSequence();
            game3Data.carComingRight_g3.visible = false;
        },
        paused:true
    });

    game3Data.carRightTimeline_g3
    .add(()=>{
        game3Data.carComingRight_g3.visible = false;
    }, 0)
    .add(carComingRightMove, 4)
    .add(()=>{
        game3Data.carComingRight_g3.visible = true;
    }, 4.5)
    .add(function(){
        game3Data.isRightCarComes = false;
        if(game3Data.carMoveRightAni){
            //撞到的動畫
            TweenMax.to(game3Data.car_g3.position, 0.5,{
                x: common.app.screen.width/2 + 150,
                ease: Elastic.easeOut.config(1, 0.3)
            });
            let tl = new TimelineMax({
                onComplete: ()=>{
                    game3Data.carComingRight_g3.position.y = -1000;
                    setToCenter();
                }
            });
            tl.fromTo(game3Data.hintRect_g3, 0.2, {alpha: 0.3}, {alpha: 0}).yoyo(1).repeat(6);
        }
    }, 4.7);
}


function setToCenter(){
    TweenMax.to(game3Data.car_g3.position, 1,{
        x: common.app.screen.width/2,
        ease: Power0.easeNone
    });
    TweenMax.to(game3Data.mirrorBgRight_g3.position, 1,{
        x: -300,
        ease: Power0.easeNone
    });
    TweenMax.to(game3Data.mirrorBgLeft_g3.position, 1,{
        x: 0,
        ease: Power0.easeNone
    });
}

function showMirrorCar(side){
    if(side == 'left'){
        game3Data.carLeftMirrorTimeline_g3.restart();
    }else{
        game3Data.carRightMirrorTimeline_g3.restart();
    }
}

function addMirrorCarAni(){
    game3Data.carLeftMirrorTimeline_g3 = new TimelineMax({pause: true});

    let leftMirrowPosStayAni = TweenMax.fromTo(game3Data.carInMirrorLeft_g3.position, 3, {
        x: 300, y: 105, ease: Power0.easeNone
    },{
        x: 295, y: 100
    });

    let leftMirrowPosAni = TweenMax.fromTo(game3Data.carInMirrorLeft_g3.position, 3, {
        x: 295, y: 100, ease: Power0.easeNone
    },{
        x: -50, y: 300
    });

    let leftMirrowScaleAni = TweenMax.fromTo(game3Data.carInMirrorLeft_g3.scale, 2, {
        x: 0.03, y: 0.03, ease: Power0.easeNone
    },{
        x: 0.15, y: 0.15
    });

    game3Data.carLeftMirrorTimeline_g3.add(leftMirrowPosStayAni, 0);
    game3Data.carLeftMirrorTimeline_g3.add(leftMirrowPosAni, 3);
    game3Data.carLeftMirrorTimeline_g3.add(leftMirrowScaleAni, 3);

    game3Data.carRightMirrorTimeline_g3 = new TimelineMax({pause: true});

    let rightMirrowPosStayAni = TweenMax.fromTo(game3Data.carInMirrorRight_g3.position, 3, {
        x: 105, y: 105, ease: Power0.easeNone
    },{
        x: 100, y: 100
    });

    let rightMirrowPosAni = TweenMax.fromTo(game3Data.carInMirrorRight_g3.position, 3, {
        x: 100, y: 100, ease: Power0.easeNone
    },{
        x: 420, y: 320
    });

    let rightMirrowScaleAni = TweenMax.fromTo(game3Data.carInMirrorRight_g3.scale, 2, {
        x: 0.03, y: 0.03, ease: Power0.easeNone
    },{
        x: 0.15, y: 0.15
    });

    game3Data.carRightMirrorTimeline_g3.add(rightMirrowPosStayAni, 0);
    game3Data.carRightMirrorTimeline_g3.add(rightMirrowPosAni, 3);
    game3Data.carRightMirrorTimeline_g3.add(rightMirrowScaleAni, 3);

}


function setUpWifiAni(){
    game3Data.leftWifiTimeline = new TimelineMax({
        onStart: ()=>{
            game3Data.leftWifiIndex = 0;
        },
        paused: true
    });
    game3Data.leftWifiTimeline.add(()=>{
        for (let i = 0; i < 5; i++) {
            game3Data.leftWifi[i].visible = (i==game3Data.leftWifiIndex)? true: false;
        }
        game3Data.leftWifiIndex = (game3Data.leftWifiIndex+1)%4;
    }, 0.2).delay(0.2).repeat(8);

    game3Data.rightWifiTimeline = new TimelineMax({
        onStart: ()=>{
            game3Data.rightWifiIndex = 0;
        },
        paused: true
    });
    game3Data.rightWifiTimeline.add(()=>{
        for (let i = 0; i < 5; i++) {
            game3Data.rightWifi[i].visible = (i==game3Data.rightWifiIndex)? true: false;
        }
        game3Data.rightWifiIndex = (game3Data.rightWifiIndex+1)%4;
    }, 0.2).delay(0.2).repeat(8);
}


function addG3PrePlay(){
    common.prePlayTimelineG3 = new TimelineMax({paused:true});
    common.prePlayTimelineG3
    .add(()=>{
        //左邊車子衝出來，失敗的
        game3Data.carLeftMirrorTimeline_g3.play();
        game3Data.carLeftMirrorTimeline_g3.seek(4);
        game3Data.carLeftTimeline_g3.play();
        game3Data.carLeftTimeline_g3.seek(4);
        //車子向左靠
        game3Data.carMoveLeftAni = TweenMax.to(game3Data.car_g3.position, 3,{
            x: common.app.screen.width/2 - 300,
            ease: Power0.easeNone
        });
        game3Data.carMoveRightAniMirror = TweenMax.to(game3Data.mirrorBgRight_g3.position, 3,{
            x: -200, ease: Power0.easeNone
        });

        game3Data.carMoveLeftAniMirror = TweenMax.to(game3Data.mirrorBgLeft_g3.position, 3,{
            x: 100, ease: Power0.easeNone
        });

        game3Data.timeText_g3.visible = false;
        game3Data.timeRemainingText_g3.visible = false;
        common.isPrePlaying = true;
        common.prePlayStartTextG3.text = "5";
        common.prePlayStartTextG3.visible = true;
        game3Data.leftBtn_g3.tint = 0X555555;
        game3Data.rightBtn_g3.tint = 0X555555;
    }, 0)
    .add(()=>{
        common.prePlayStartTextG3.text = "4";
    }, 1)
    .add(()=>{
        common.prePlayStartTextG3.text = "3";
        
        //讓右邊車子衝出來，成功的
        game3Data.carMoveLeftAni.kill();
        game3Data.isRightCarComes = true;
        game3Data.carRightMirrorTimeline_g3.play();
        game3Data.carRightMirrorTimeline_g3.seek(2);
        game3Data.carRightTimeline_g3.play();
        game3Data.carRightTimeline_g3.seek(2);
        
    }, 2)
    .add(()=>{
        //車子向右靠
        game3Data.carMoveRightAni = TweenMax.to(game3Data.car_g3.position, 2, {
            x: common.app.screen.width/2 + 300,
            ease: Power0.easeNone
        });
        game3Data.carMoveRightAniMirror = TweenMax.to(game3Data.mirrorBgRight_g3.position, 2,{
            x: -400, ease: Power0.easeNone
        });

        game3Data.carMoveLeftAniMirror = TweenMax.to(game3Data.mirrorBgLeft_g3.position, 2,{
            x: -100, ease: Power0.easeNone
        });

        common.prePlayStartTextG3.text = "2";
    }, 3)
    .add(()=>{
        game3Data.rightBtn_g3.tint = 0Xffffff;
        game3Data.rightBtnClick_g3 = true;
        game3Data.rightWifiTimeline.restart();
        common.prePlayStartTextG3.text = "1";
    }, 4)
    .add(()=>{
        common.prePlayStartTextG3.text = "GO!";
    }, 5)
    .add(()=>{
        game3Data.leftBtn_g3.tint = 0Xffffff;
        common.prePlayStartTextG3.visible = false;
        game3Data.timeText_g3.visible = true;
        game3Data.timeRemainingText_g3.visible = true;
        game3Data.hintTextG3.visible = false;
        common.isPrePlaying = false;
        game3Data.rightBtnClick_g3 = false;

        //留下右邊的 timeline 去觸發下一台車
        game3Data.carLeftMirrorTimeline_g3.pause();
        game3Data.carLeftMirrorTimeline_g3.seek(10);
        game3Data.carLeftTimeline_g3.pause();
        game3Data.carLeftTimeline_g3.seek(10)

        resetAllTimers();
    }, 6)
}

function resetAllTimers(){
    game3Data.remainingTime = 30;
    game3Data.timeRemainingText_g3.text = game3Data.remainingTime;

    clearInterval(game3Data.timerGame3);
    game3Data.timerGame3 = setInterval(function(){
        game3Data.remainingTime--;
        if(game3Data.remainingTime<=0){
            game3Data.remainingTime =0;
        }
        if(game3Data.remainingTime<=0 && false){
            game3Data.remainingTime = 0;
            console.log("恭喜過關");
            clearInterval(game3Data.timerGame3);
        }
        game3Data.timeRemainingText_g3.text = game3Data.remainingTime;
    }, 1000);
}


function resetData(){
    game3Data.carSideSequenceIndex = 0;
    if(common.prePlayTimelineG3){
        common.prePlayTimelineG3.play();
        common.prePlayTimelineG3.seek(0);
    }
    resetAllTimers();
}