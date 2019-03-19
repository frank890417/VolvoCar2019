function game3Init(){
    // currentCarSide = "center";
    setUpCarMovingAnimation();
    registerGame3Event();    
    updateAxisG3();
    addG3PrePlay();
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
        rightBtn_g3.tint = 0X555555;
        rightBtnClick_g3 = true;
    });

    rightBtn_g3.on("pointerup",function(){
        rightBtn_g3.tint = 0XFFFFFF;
        rightBtnClick_g3 = false;
    });

    leftBtn_g3.on("pointerdown", function(){
        leftBtn_g3.tint = 0X555555;
        leftBtnClick_g3 = true;
    });

    leftBtn_g3.on("pointerup",function(){
        leftBtn_g3.tint = 0XFFFFFF;
        leftBtnClick_g3 = false;
    });

    
    $( "body" ).keyup(function(e) {
        let k = e.keyCode;
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
        
        switch (k) {
            case 37:
                leftBtn_g3.tint = 0X555555;
                leftBtnClick_g3 = true;
                break;
            case 39:
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
            //這邊會建立 車子往左靠的動畫
            carMoveLeftAni = TweenMax.to(car_g3.position, 3,{
                x: app.screen.width/2 - 300,
                ease: Power0.easeNone
            });
        },
        onComplete: ()=>{
            carLeftTimeline_g3.pause();
            carLeftTimeline_g3.seek(0);
            nextCarSideSequence();
        },
        paused:true
    });

    carLeftTimeline_g3
    .add(carComingLeftMove, 1)
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
    }, 1.7);


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
            });
        },
        onComplete: ()=>{
            carRightTimeline_g3.pause();
            carRightTimeline_g3.seek(0);
            nextCarSideSequence();
        },
        paused:true
    });

    carRightTimeline_g3
    .add(carComingRightMove, 1)
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
    }, 1.7);
}


function showMirrorCar(side){
    if(side == 'left'){
        TweenMax.fromTo(carInMirrorLeft_g3.position, 3, {
            x: 250,
            y: 100,
            ease: Power0.easeNone
        },{
            x: -50,
            y: 300
        });
    
        TweenMax.fromTo(carInMirrorLeft_g3.scale, 2, {
            x: 0.01,
            y: 0.01,
            ease: Power0.easeNone
        },{
            x: 0.15,
            y: 0.15
        });
    }else{
        TweenMax.fromTo(carInMirrorRight_g3.position, 3, {
            x: 100,
            y: 100,
            ease: Power0.easeNone
        },{
            x: 400,
            y: 300
        });
    
        TweenMax.fromTo(carInMirrorRight_g3.scale, 2, {
            x: 0.01,
            y: 0.01,
            ease: Power0.easeNone
        },{
            x: 0.15,
            y: 0.15
        });
    }
}



function addG3PrePlay(){
    prePlayTimelineG3 = new TimelineMax({paused:true});
    prePlayTimelineG3
    .add(()=>{
        timeText_g3.visible = false;
        timeRemainingText_g3.visible = false;
        //停車安全讓汽車通過
        isPrePlaying = true;
    }, 0)
    .add(()=>{

    }, 2)
    .add(()=>{
        prePlayStartTextG2.text = "5";
        prePlayStartTextG2.visible = true;
    }, 4)
    .add(()=>{
        
        prePlayStartTextG2.text = "4";
    }, 5)
    .add(()=>{
        
        prePlayStartTextG2.text = "3";
    }, 6)
    .add(()=>{

        prePlayStartTextG2.text = "2";
    }, 7)
    .add(()=>{

        prePlayStartTextG2.text = "1";
    }, 8)
    .add(()=>{

        isPrePlaying = false;
        prePlayStartTextG2.text = "GO!";
    }, 9)
    .add(()=>{
        prePlayStartTextG2.visible = false;
        timeText_g3.visible = true;
        timeRemainingText_g3.visible = true;
        hintTextG3.visible = false;
        resetAllTimers();
    }, 10);


/*
    leftBtn_g3.tint = 0X555555;
    leftBtnClick_g3 = true;

    rightBtn_g3.tint = 0X555555;
    rightBtnClick_g3 = true;
*/
    
}