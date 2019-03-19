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
        if(!isPrePlaying){
            pressStop = true;
            pedal.tint = 0X555555;
        }
    });

    pedal.on("pointerup",function(){
        if(!isPrePlaying){
            pressStop = false;
            pedal.tint = 0XFFFFFF;
            cityRoadAniBg.animationSpeed = 1;
        }
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
        timeText.visible = false;
        timeRemainingText.visible = false;
        //停車安全讓汽車通過
        pedal.tint = 0X555555;
        isPrePlaying = true;
    }, 0)
    .add(()=>{
        prePlayStartTextG1.text = "5";
        prePlayStartTextG1.visible = true;
    }, 4)
    .add(()=>{
        prePlayStartTextG1.text = "4";
    }, 5)
    .add(()=>{
        prePlayStartTextG1.text = "3";
    }, 6)
    .add(()=>{
        prePlayStartTextG1.text = "2";
    }, 7)
    .add(()=>{
        prePlayStartTextG1.text = "1";
    }, 8)
    .add(()=>{
        //開始衝撞
        pedal.tint = 0XFFFFFF;
        cityRoadAniBg.animationSpeed = 1;
        isPrePlaying = false;
        prePlayStartTextG1.text = "GO!";
    }, 9)
    .add(()=>{
        prePlayStartTextG1.visible = false;
        timeText.visible = true;
        timeRemainingText.visible = true;
        hintTextG1.visible = false;
        resetAllTimers();
    }, 10);
    
}