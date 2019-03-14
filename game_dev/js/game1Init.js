function game1Init(){
    let tl = new TimelineMax();
    tl.fromTo(pedalWarning, 0.5, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
    registerGame1Event();
    //校正透視
    updateAxisG1();
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