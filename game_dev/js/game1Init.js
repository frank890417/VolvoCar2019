function game1Init(){
    let tl = new TimelineMax();
    tl.fromTo(pedalWarning, 0.5, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
    registerGame1Event();
    //校正透視
    updateAxisG1();
    addG1PrePlay();
}

function registerGame1Event(){
    //加入點擊事件
    pedal.interactive = true;
    pedal.buttonMode = true;
    
    pedal.on("pointerdown", function(){
        pressStop = true;
        pedal.tint = 0X555555;

    });

    pedal.on("pointerup",function(){
        pressStop = false;
        pedal.tint = 0XFFFFFF;
        cityRoadAniBg.animationSpeed = 1;
    });
    
    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        if(!debug) return;
        switch (k) {
            case 37:
                world3D.position.x -=5;	
                break;
            case 39:
                world3D.position.x +=5;	
                break;
            case 38:
                world3D.position.y -=5;	
                break;
            case 40:
                world3D.position.y +=5;	
                break;
            case 65:
                vanishingPoint.position.x -=5;
                break;
            case 68:
                vanishingPoint.position.x +=5;
                break;
            case 87:
                vanishingPoint.position.y -=5;
                break;
            case 83:
                vanishingPoint.position.y +=5;
                break;
            default:
                break;
        }
        updateAxisG1();
    });
}


function updateAxisG1(){
	let posY = world3D.toLocal(vanishingPoint.position, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
	world3D.proj.setAxisY(posY, 1);
}


function addG1PrePlay(){

    //閃爍 READY 字
    let startTextAni = TweenMax.fromTo(prePlayStartTextG1, 0.5, 
        {
            alpha: 0
        },
        {
            alpha: 0.6,
            repeat: 6,
            yoyo: true
        }
    );

    prePlayTimelineG1 = new TimelineMax({paused:true});
    prePlayTimelineG1
    .add(()=>{
        //顯示說明版
        prePlayG1Cover.visible = true;
        TweenMax.fromTo(prePlayG1Cover, 0.5, {alpha: 0}, {alpha: 1});
        timeText.visible = false;
        timeRemainingText.visible = false;
    }, 0)
    .add(()=>{
        //停車安全讓汽車通過
        pedal.tint = 0X555555;
        isPrePlaying = true;
    }, 4)
    .add(()=>{
        //等待六秒後繼續衝撞
        pedal.tint = 0XFFFFFF;
        cityRoadAniBg.animationSpeed = 1;
        isPrePlaying = false;
    }, 9)
    .add(()=>{
        //一次失敗的
        pedal.tint = 0X555555;
        isPrePlaying = true;
    }, 12)
    .add(()=>{
        //繼續走
        pedal.tint = 0XFFFFFF;
        cityRoadAniBg.animationSpeed = 1;
        isPrePlaying = false;
    }, 14)
    .add(()=>{
        //指導結束，遊戲開始倒數
        prePlayStartTextG1.visible = true;
    }, 15)
    .add(startTextAni, 15)
    .add(()=>{
        TweenMax.fromTo(prePlayG1Cover, 0.5, {alpha: 1}, {alpha: 0});
    }, 20)
    .add(()=>{
        prePlayStartTextG1.visible = false;
        prePlayG1Cover.visible = false;
        timeText.visible = true;
        timeRemainingText.visible = true;
        resetG1Data();
    }, 20.5);
    
}