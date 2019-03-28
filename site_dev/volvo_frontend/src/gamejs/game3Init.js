function game3Init(){
    // currentCarSide = "center";
    setUpCarMovingAnimation();
    registerGame3Event();    
    updateAxisG3();
    addG3PrePlay();
    setUpWifiAni();
    rightBtnClick_g3 = false;
    leftBtnClick_g3 = false;

    let tl = new TimelineMax();
    tl.fromTo(mirrorHintLeft_g3, 0.2, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
    let tr = new TimelineMax();
    tr.fromTo(mirrorHintRight_g3, 0.2, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);

    //先不要自動出題
    //nextCarSideSequence();
}

function registerGame3Event(){
    rightBtn_g3.interactive = true;
    rightBtn_g3.buttonMode = true;
    leftBtn_g3.interactive = true;
    leftBtn_g3.buttonMode = true;
    
    rightBtn_g3.on("pointerdown", function(){
        if(isPrePlaying) return;
        rightWifiTimeline.restart();
        rightBtn_g3.tint = 0X555555;
        rightBtnClick_g3 = true;
    });

    rightBtn_g3.on("pointerup",function(){
        if(isPrePlaying) return;
        rightBtn_g3.tint = 0XFFFFFF;
        rightBtnClick_g3 = false;
    });

    leftBtn_g3.on("pointerdown", function(){
        if(isPrePlaying) return;
        leftWifiTimeline.restart();
        leftBtn_g3.tint = 0X555555;
        leftBtnClick_g3 = true;
    });

    leftBtn_g3.on("pointerup",function(){
        if(isPrePlaying) return;
        leftBtn_g3.tint = 0XFFFFFF;
        leftBtnClick_g3 = false;
    });

    
    $( "body" ).keyup(function(e) {
        let k = e.keyCode;
        if(isPrePlaying) return;
        switch (k) {
            case 37:
            leftBtn_g3.tint = 0XFFFFFF;
            leftBtnClick_g3 = false;
                break;
            case 39:
            rightBtn_g3.tint = 0XFFFFFF;
             rightBtnClick_g3 = false;
                break;
        }
    });

    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        console.log(k);
        let power = 20;
        if(isPrePlaying) return;
        switch (k) {
            case 37:
                leftWifiTimeline.restart();
                leftBtn_g3.tint = 0X555555;
                leftBtnClick_g3 = true;
                break;
            case 39:
                rightWifiTimeline.restart();
                rightBtn_g3.tint = 0X555555;
                rightBtnClick_g3 = true;
                break;
        }

        if(!debug) return;
        switch (k) {
            case 37:
                world3D_g3.position.x -=power;	
                break;
            case 39:
                world3D_g3.position.x +=power;	
                break;
            case 38:
                world3D_g3.position.y -=power;	
                break;
            case 40:
                world3D_g3.position.y +=power;	
                break;
            case 65:
                vanishingPoint_g3.position.x -=power;
                break;
            case 68:
                vanishingPoint_g3.position.x +=power;
                break;
            case 87:
                vanishingPoint_g3.position.y -=power;
                break;
            case 83:
                vanishingPoint_g3.position.y +=power;
                break;
            default:
                break;
        }
        updateAxisG3();
    });

}

function updateAxisG3(){
	let posY = world3D_g3.toLocal(vanishingPoint_g3.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	world3D_g3.proj.setAxisY(posY, 1);
}

function nextCarSideSequence(){
//出下一題
    if(carSideSequence[carSideSequenceIndex] == "left"){
        carLeftTimeline_g3.restart()
    }else{
        carRightTimeline_g3.restart()
    }
    carSideSequenceIndex = (carSideSequenceIndex+1)%6;
}

function setUpCarMovingAnimation(){
    //下方來車動畫設定
    let carComingLeftMove = TweenMax.fromTo(carComingLeft_g3.position, 10, {
        y: -1000,
        ease: Power0.easeNone
    },{
        y: 10000
    });
   
    carLeftTimeline_g3 = new TimelineMax({
        onStart: ()=>{
            isLeftCarComes = true;
            showMirrorCar("left");
            //車子往左靠的動畫
            carMoveLeftAni = TweenMax.to(car_g3.position, 3,{
                x: app.screen.width/2 - 300,
                ease: Power0.easeNone
            }).delay(3);
            
        },
        onComplete: ()=>{
            carLeftTimeline_g3.pause();
            carLeftTimeline_g3.seek(0);
            nextCarSideSequence();
            carComingLeft_g3.visible = false;
        },
        paused:true
    });

    

    carLeftTimeline_g3
    .add(()=>{
        carComingLeft_g3.visible = false;
    }, 0)
    .add(carComingLeftMove, 4)
    .add(()=>{
        carComingLeft_g3.visible = true;
    }, 4.5)
    .add(function(){
        isLeftCarComes = false;
        if(carMoveLeftAni){
            //如果位移動畫存在，代表沒有成功，也就是要撞到了
            TweenMax.to(car_g3.position, 0.5,{
                x: app.screen.width/2 - 150,
                ease: Elastic.easeOut.config(1, 0.3)
            });

            let tl = new TimelineMax({
                onComplete: ()=>{
                    carComingLeft_g3.position.y = -1000;

                    TweenMax.to(car_g3.position, 1,{
                        x: app.screen.width/2,
                        ease: Power0.easeNone
                    });

                }
            });
            tl.fromTo(hintRect_g3, 0.2, {alpha: 0.3}, {alpha: 0}).yoyo(1).repeat(6);
        }
    }, 4.7);


    let carComingRightMove = TweenMax.fromTo(carComingRight_g3.position, 10, {
        y: -1000,
        ease: Power0.easeNone
    },{
        y: 10000
    });
   
    carRightTimeline_g3 = new TimelineMax({
        onStart: ()=>{
            isRightCarComes = true;
            showMirrorCar("right");
            //這邊會建立 車子往右靠的動畫
            carMoveRightAni = TweenMax.to(car_g3.position, 3,{
                x: app.screen.width/2 + 300,
                ease: Power0.easeNone
            }).delay(3);
        },
        onComplete: ()=>{
            carRightTimeline_g3.pause();
            carRightTimeline_g3.seek(0);
            nextCarSideSequence();
            carComingRight_g3.visible = false;
        },
        paused:true
    });

    carRightTimeline_g3
    .add(()=>{
        carComingRight_g3.visible = false;
    }, 0)
    .add(carComingRightMove, 4)
    .add(()=>{
        carComingRight_g3.visible = true;
    }, 4.5)
    .add(function(){
        isRightCarComes = false;
        if(carMoveRightAni){
            //撞到的動畫
            TweenMax.to(car_g3.position, 0.5,{
                x: app.screen.width/2 + 150,
                ease: Elastic.easeOut.config(1, 0.3)
            });
            let tl = new TimelineMax({
                onComplete: ()=>{
                    carComingRight_g3.position.y = -1000;
                    TweenMax.to(car_g3.position, 1,{
                        x: app.screen.width/2,
                        ease: Power0.easeNone
                    });
                }
            });
            tl.fromTo(hintRect_g3, 0.2, {alpha: 0.3}, {alpha: 0}).yoyo(1).repeat(6);
        }
    }, 4.7);
}


function showMirrorCar(side){
    if(side == 'left'){
        carLeftMirrorTimeline_g3 = new TimelineMax();

        let leftMirrowPosStayAni = TweenMax.fromTo(carInMirrorLeft_g3.position, 3, {
            x: 300,
            y: 105,
            ease: Power0.easeNone
        },{
            x: 295,
            y: 100
        });

        let leftMirrowPosAni = TweenMax.fromTo(carInMirrorLeft_g3.position, 3, {
            x: 295,
            y: 100,
            ease: Power0.easeNone
        },{
            x: -50,
            y: 300
        });
    
        let leftMirrowScaleAni = TweenMax.fromTo(carInMirrorLeft_g3.scale, 2, {
            x: 0.01,
            y: 0.01,
            ease: Power0.easeNone
        },{
            x: 0.15,
            y: 0.15
        });

        carLeftMirrorTimeline_g3.add(leftMirrowPosStayAni, 0);
        carLeftMirrorTimeline_g3.add(leftMirrowPosAni, 3);
        carLeftMirrorTimeline_g3.add(leftMirrowScaleAni, 3);


    }else{
        carRightMirrorTimeline_g3 = new TimelineMax();

        let rightMirrowPosStayAni = TweenMax.fromTo(carInMirrorRight_g3.position, 3, {
            x: 105,
            y: 105,
            ease: Power0.easeNone
        },{
            x: 100,
            y: 100
        });

        let rightMirrowPosAni = TweenMax.fromTo(carInMirrorRight_g3.position, 3, {
            x: 100,
            y: 100,
            ease: Power0.easeNone
        },{
            x: 400,
            y: 300
        });
    
        let rightMirrowScaleAni = TweenMax.fromTo(carInMirrorRight_g3.scale, 2, {
            x: 0.01,
            y: 0.01,
            ease: Power0.easeNone
        },{
            x: 0.15,
            y: 0.15
        });

        carRightMirrorTimeline_g3.add(rightMirrowPosStayAni, 0);
        carRightMirrorTimeline_g3.add(rightMirrowPosAni, 3);
        carRightMirrorTimeline_g3.add(rightMirrowScaleAni, 3);

    }
}


function setUpWifiAni(){
    leftWifiTimeline = new TimelineMax({
        pause: true,
        onStart: ()=>{
            leftWifiIndex = 0;
        }
    });
    leftWifiTimeline.add(()=>{
        for (let i = 0; i < 5; i++) {
            leftWifi[i].visible = (i==leftWifiIndex)? true: false;
        }
        leftWifiIndex = (leftWifiIndex+1)%4;
    }, 0.2).delay(0.2).repeat(8);

    rightWifiTimeline = new TimelineMax({
        pause: true,
        onStart: ()=>{
            rightWifiIndex = 0;
        }
    });
    rightWifiTimeline.add(()=>{
        for (let i = 0; i < 5; i++) {
            rightWifi[i].visible = (i==rightWifiIndex)? true: false;
        }
        rightWifiIndex = (rightWifiIndex+1)%4;
    }, 0.2).delay(0.2).repeat(8);
}


function addG3PrePlay(){
    prePlayTimelineG3 = new TimelineMax({paused:true});
    prePlayTimelineG3
    .add(()=>{
        carLeftMirrorTimeline_g3.seek(3);
        carLeftMirrorTimeline_g3.play();
        carLeftTimeline_g3.seek(3);
        carLeftTimeline_g3.play();
        carMoveLeftAni = TweenMax.to(car_g3.position, 3,{
            x: app.screen.width/2 - 300,
            ease: Power0.easeNone
        });
        carSideSequenceIndex++;
        nextCarSideSequence();

        timeText_g3.visible = false;
        timeRemainingText_g3.visible = false;
        isPrePlaying = true;
        prePlayStartTextG3.text = "5";
        prePlayStartTextG3.visible = true;
        leftBtn_g3.tint = 0X555555;
        rightBtn_g3.tint = 0X555555;
    }, 0)
    .add(()=>{
        prePlayStartTextG3.text = "4";
    }, 1)
    .add(()=>{
        prePlayStartTextG3.text = "3";
    }, 2)
    .add(()=>{
        prePlayStartTextG3.text = "2";
    }, 3)
    .add(()=>{
        rightWifiTimeline.restart();
        rightBtn_g3.tint = 0Xffffff;
        rightBtnClick_g3 = true;
        prePlayStartTextG3.text = "1";
    }, 4)
    .add(()=>{
        // leftBtn_g3.tint = 0X555555;
        // leftBtnClick_g3 = false;
        prePlayStartTextG3.text = "GO!";
    }, 5)
    .add(()=>{
        leftBtn_g3.tint = 0Xffffff;
        prePlayStartTextG3.visible = false;
        timeText_g3.visible = true;
        timeRemainingText_g3.visible = true;
        hintTextG3.visible = false;
        isPrePlaying = false;
        rightBtnClick_g3 = false;
        resetAllTimers();
    }, 6)


/*
    leftBtn_g3.tint = 0X555555;
    leftBtnClick_g3 = true;

    rightBtn_g3.tint = 0X555555;
    rightBtnClick_g3 = true;
*/
    
}