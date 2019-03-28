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
        if(isPrePlaying) return;
        pressStop = true;
        pedal.tint = 0X555555;
    });

    pedal.on("pointerup",function(){
        if(isPrePlaying) return;
        pressStop = false;
        pedal.tint = 0XFFFFFF;
        cityRoadAniBg.animationSpeed = bgAnimationSpeed;
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

    prePlayTimelineG1 = new TimelineMax({paused:true});
    prePlayTimelineG1
    .add(()=>{
        pedal.tint = 0X555555;
        isPrePlaying = true;
        timeText.visible = false;
        timeRemainingText.visible = false;
        pressStop = true;
    }, 0)
    .add(()=>{
        pedal.tint = 0XFFFFFF;
        prePlayStartTextG1.text = "5";
        prePlayStartTextG1.visible = true;
        
    }, 1)
    .add(()=>{
        prePlayStartTextG1.text = "4";
    }, 2)
    .add(()=>{
        pedal.tint = 0X555555;
        prePlayStartTextG1.text = "3";
        pressStop = false;   
        cityRoadAniBg.animationSpeed = bgAnimationSpeed;
    }, 3)
    .add(()=>{
        //停車安全讓汽車通過
        prePlayStartTextG1.text = "2";
    }, 4)
    .add(()=>{
        prePlayStartTextG1.text = "1";
    }, 5)
    .add(()=>{
        prePlayStartTextG1.text = "GO!";
    }, 6)
    .add(()=>{
        pedal.tint = 0XFFFFFF;
        isPrePlaying = false;
        prePlayStartTextG1.visible = false;
        timeText.visible = true;
        timeRemainingText.visible = true;
        resetAllTimers();
    }, 7)
}