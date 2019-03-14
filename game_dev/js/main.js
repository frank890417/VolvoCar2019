$(document).ready(function(){
    
    setupEnv();

    //關卡切換按鈕
    $(".item").on("click", function(){
        isGameRunning = false;
        $(".init-text").text("");
        $(".init-text").show();
        $(".game-start").fadeIn(800);
        app.ticker.stop();
        if(currentStage!=0){
            stages[currentStage].visible = false;
        }
        
        //stage3
        carLeftTimeline_g3.pause();
        carRightTimeline_g3.pause();
        //stage4
        currentStage = parseInt($(this).attr("stage"));
        $(".game-start").text("【點擊開始第 "+currentStage+" 關】");
    });

    $(".game-start").on("click", function(){
        isGameRunning = true;
        $(this).fadeOut();
        $(".init-text").hide();
        resetAllGamesData();
        resetAllTimers();
        stages[currentStage].visible = true;
        app.ticker.start();
    });


    //當滑鼠up時候，要把所有按鈕的狀態都取消
    $("body").mouseup(function(){
        //stage1
        pressStop = false;
        pedal.tint = 0XFFFFFF;

        //stage2
        rightBtn_g2.tint = 0XFFFFFF;
        carSpeedUp = false;
        leftBtn_g2.tint = 0XFFFFFF;
        carSpeedDown = false;

        //stage3

        //stage4

    });
    
    $("body").keydown(function(e){
        console.log(e.keyCode);
        if(e.keyCode == 32){
            //stage1
            pressStop = true;
            pedal.tint = 0X555555;
            //stage2
            leftBtn_g2.tint = 0X555555;
            carSpeedDown = true;
        }else if(e.keyCode == 13){
            //stage2
            rightBtn_g2.tint = 0X555555;
            carSpeedUp = true;
        }
        
    });

    $("body").keyup(function(e){
        if(e.keyCode == 32){
            //stage1
            pressStop = false;
            pedal.tint = 0XFFFFFF;
            cityRoadAniBg.animationSpeed = 1;
            //stage2
            leftBtn_g2.tint = 0XFFFFFF;
            carSpeedDown = false;
        }else if(e.keyCode == 13){
            //stage2
            rightBtn_g2.tint = 0XFFFFFF;
            carSpeedUp = false;
        }
    });
});

let counter = 0;
function initStage(){
    game1Init();
    game2Init();
    game3Init();
    game4Init();
    app.stage.addChild(stage1);
    app.stage.addChild(stage2);
    app.stage.addChild(stage3);
    app.stage.addChild(stage4);
    app.ticker.speed = 1;
    stageLoops = {
        1: game1Loop,
        2: game2Loop,
        3: game3Loop,
        4: game4Loop
    }
    app.ticker.add(delta => gameLoop(delta));
    counter += app.ticker.deltaTime;
}

function gameLoop(delta){
    if(currentStage!=0){
        stageLoops[currentStage]();
    }
}

function resetAllGamesData(){

    resetG1Data();
    resetG2Data();
    resetG3Data();
    resetG4Data();

}


function resetG1Data(){
    //crossObjects

    //根據斑馬線群組產生物件
    crossingGroup.forEach(sprite => {
        sprite.parent.removeChild(sprite);
        sprite.destroy();    
    });


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
    
    carCounter = 3;
    bikeCounter = 1;
    walkCounter = 2;
    groundMoveSpeedG1 = 0;

}


function resetG2Data(){
    //重置橫線
    for(let i=0; i< 20; i++){
        let s = lineGroup_g2[i];
        s.counterY = 2000*i;
        s.counterX = 0;
        s.position.set(app.screen.width/2, 10000);
    }
    
    //重置路燈
    for(let i=0; i< 20; i++){
        let s = streetLightGroup_g2[i];
        if(i%2 == 0){
            s.scale.x = -8;
            s.position.set(app.screen.width/2 + roadWidth_g2/2, 30000);
        }else{
            s.position.set(app.screen.width/2 - roadWidth_g2/2, 30000);
        }
        s.anchor.set(0, 1);
        s.counterY = 12000*i;
        s.counterX = 0;
    }
    carSpeed = 0;
    currentCarPosition = 1500;
}

function resetG3Data(){
    carSideSequenceIndex = 0;
    nextCarSideSequence();
}

function resetG4Data(){
    myCarTimeline.seek(0);
    armyCarTimeline.seek(0.5);
}



function resetAllTimers(){
    remainingTime = 30;
    remainingTime_g2 = 30;
    remainingTime_g3 = 30;
    timeRemainingText.text = remainingTime;
    timeRemainingText_g2.text = remainingTime_g2;
    timeRemainingText_g3.text = remainingTime_g3;

    clearInterval(timerGame1);
    clearInterval(timerGame2);
    clearInterval(timerGame3);
    clearInterval(carEmitterTimer);

    //設定每一關的倒數計時器
    if(currentStage==1){
        timerGame1 = setInterval(function(){
            remainingTime--;
            if(remainingTime<=0){
                remainingTime =0;
            }
            if(remainingTime<=0 && false){
                remainingTime = 0;
                console.log("恭喜過關");
                // alert("恭喜過關!");
                stages[currentStage].visible = false;
                clearInterval(timerGame1);
            }
            timeRemainingText.text = remainingTime;
        }, 1000);
    }

    if(currentStage==2){
        timerGame2 = setInterval(function(){
            remainingTime_g2--;
            if(remainingTime_g2<=0){
                remainingTime_g2 = 0;
                // alert("恭喜過關!");
                // stages[currentStage].visible = false;
                // clearInterval(timerGame2);
            }
            timeRemainingText_g2.text = remainingTime_g2;      
        }, 1000);
    }


    if(currentStage==3){
        //啟動隨機汽車發射器
        // setEmitter();
        timerGame3 = setInterval(function(){
            remainingTime_g3--;
            if(remainingTime_g3<=0){
                remainingTime_g3 = 0;
                // alert("恭喜過關!");
                // stages[currentStage].visible = false;
                // clearInterval(timerGame3);
                // clearInterval(carEmitterTimer);
            }
            timeRemainingText_g3.text = remainingTime_g3; 
        }, 1000);
    }



}