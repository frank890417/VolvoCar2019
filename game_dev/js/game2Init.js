function game2Init(){
    let tl = new TimelineMax();
    tl.fromTo(hintRect_g2, 0.5, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);

    registerGame2Event();
    setUpSafeAreaAni();
    //校正透視
    updateAxisG2();
    addG2PrePlay();
}



function registerGame2Event(){
    //加入點擊事件
    rightBtn_g2.interactive = true;
    rightBtn_g2.buttonMode = true;
    leftBtn_g2.interactive = true;
    leftBtn_g2.buttonMode = true;
    
    rightBtn_g2.on("pointerdown", function(){
        if(isPrePlaying) return;
        rightBtn_g2.tint = 0X555555;
        carSpeedUp = true;
    });

    rightBtn_g2.on("pointerup",function(){
        if(isPrePlaying) return;
        rightBtn_g2.tint = 0XFFFFFF;
        carSpeedUp = false;
    });

    leftBtn_g2.on("pointerdown", function(){
        if(isPrePlaying) return;
        leftBtn_g2.tint = 0X555555;
        carSpeedDown = true;
    });

    leftBtn_g2.on("pointerup",function(){
        if(isPrePlaying) return;
        leftBtn_g2.tint = 0XFFFFFF;
        carSpeedDown = false;
    });
       
    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        if(!debug) return;
        switch (k) {
            case 37:
                world3D_g2.position.x -=5;	
                break;
            case 39:
                world3D_g2.position.x +=5;	
                break;
            case 38:
                world3D_g2.position.y -=5;	
                break;
            case 40:
                world3D_g2.position.y +=5;	
                break;
            case 65:
                vanishingPoint_g2.position.x -=5;
                break;
            case 68:
                vanishingPoint_g2.position.x +=5;
                break;
            case 87:
                vanishingPoint_g2.position.y -=5;
                break;
            case 83:
                vanishingPoint_g2.position.y +=5;
                break;
            default:
                break;
        }
        //因為loop會自動更新消失點，所以觸發按鈕時暫不更新
        //updateAxisG2();
    });
}


function updateAxisG2(){
	let posY = world3D_g2.toLocal(vanishingPoint_g2.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	world3D_g2.proj.setAxisY(posY, 1);
}

function setUpSafeAreaAni(){
    safeAreaTimeline = new TimelineMax({pause: true});
    safeAreaTimeline.add(()=>{
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].visible = (i==safeAreaHintIndex)? true: false;
            safeAreaHint[i].alpha = (safeAreaHintIndex+1)/4;
        }
        safeAreaHintIndex = (safeAreaHintIndex+1)%4;
    }, 0.2).repeat(3);

    //呼吸感
    let tl2 = new TimelineMax();
    tl2.fromTo(safeAreaHint[3], 0.8, {alpha: 0}, {alpha: 0.8}).yoyo(1).repeat(-1);

}


function addG2PrePlay(){
    prePlayTimelineG2 = new TimelineMax({paused:true});
    prePlayTimelineG2
    .add(()=>{
        timeText_g2.visible = false;
        timeRemainingText_g2.visible = false;
        isPrePlaying = true;
        leftBtn_g2.tint = 0X555555;
    }, 0)
    .add(()=>{
        prePlayStartTextG2.text = "5";
        prePlayStartTextG2.visible = true;
        rightBtn_g2.tint = 0Xffffff;
        carSpeedUp = true;
    }, 1)
    .add(()=>{
        prePlayStartTextG2.text = "4";
        
    }, 2)
    .add(()=>{
        prePlayStartTextG2.text = "3";
    }, 3)
    .add(()=>{
        rightBtn_g2.tint = 0X555555;
        carSpeedUp = false;
        prePlayStartTextG2.text = "2";
    }, 4)
    .add(()=>{
        leftBtn_g2.tint = 0XFFFFFF;
        carSpeedDown = true;
        prePlayStartTextG2.text = "1";
    }, 5)
    .add(()=>{
        leftBtn_g2.tint = 0X555555;
        carSpeedDown = false;
        prePlayStartTextG2.text = "GO!";
    }, 6)
    .add(()=>{
        rightBtn_g2.tint = 0Xffffff;
        leftBtn_g2.tint = 0XFFFFFF;
        timeRemainingText_g2.visible = true;
        prePlayStartTextG2.visible = false;
        timeText_g2.visible = true;
        isPrePlaying = false;
        resetAllTimers();
    }, 7)
    //車子隨機變速
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 13)
    .add(()=>{
        carSpeedRandomSeed = +0.01;
    }, 16)
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 20)
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 23)
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 27)
    .add(()=>{
        carSpeedRandomSeed = +0.01;
    }, 30)
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 32)
    .add(()=>{
        carSpeedRandomSeed = +0.01;
    }, 35)
    .add(()=>{
        carSpeedRandomSeed = -0.01;
    }, 40)
}