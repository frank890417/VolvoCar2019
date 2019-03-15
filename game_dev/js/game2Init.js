function game2Init(){
    
    registerGame2Event();
    setUpSafeAreaAni();
    //校正透視
    updateAxisG2();
}



function registerGame2Event(){
    //加入點擊事件
    rightBtn_g2.interactive = true;
    rightBtn_g2.buttonMode = true;
    leftBtn_g2.interactive = true;
    leftBtn_g2.buttonMode = true;
    
    rightBtn_g2.on("pointerdown", function(){
        rightBtn_g2.tint = 0X555555;
        carSpeedUp = true;
    });

    rightBtn_g2.on("pointerup",function(){
        rightBtn_g2.tint = 0XFFFFFF;
        carSpeedUp = false;
    });

    leftBtn_g2.on("pointerdown", function(){
        leftBtn_g2.tint = 0X555555;
        carSpeedDown = true;
    });

    leftBtn_g2.on("pointerup",function(){
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
    let tl = new TimelineMax();
    tl.add(()=>{
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].visible = (i==safeAreaHintIndex)? true: false;
            safeAreaHint[i].alpha = (safeAreaHintIndex+1)/4;
        }
        safeAreaHintIndex = (safeAreaHintIndex+1)%4;
    }, 0.8).repeat(-1);
}