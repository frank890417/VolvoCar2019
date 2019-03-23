var timeCounter2 = 0;

function game2Loop() {
    //更新橫線
    for(let i=0; i< lineGroup_g2.length; i++){
        let s = lineGroup_g2[i];
        // if(!pressStop){
            s.counterY -= (carSpeed+1)*5+100;
        // }
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 60000;
		}
    }

    //更新路燈
    for(let i=0; i< streetLightGroup_g2.length; i++){
        let s = streetLightGroup_g2[i];
        // if(!pressStop){
            s.counterY -= (carSpeed+1)*5+100;
        // }
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 24000*11;
		}
    }

    //車子移動設定
    if(carSpeedUp){
        carSpeed+=0.3;
        if(carSpeed > carSpeedMax){
            carSpeed = carSpeedMax;
        }
    }else{
        carSpeed-=0.01;
    }

    if(carSpeedDown){
        carSpeed-=0.3;
        if(carSpeed < carSpeedMin){
            carSpeed = carSpeedMin;
        }
    }

    //隨機改變車子速度
    carSpeed += carSpeedRandomSeed;


    //是否離開安全區
    if(currentCarPosition<safeAreaMax && currentCarPosition > safeAreaMin){
        
        dangerAreaStayTime = 0;
        if(!safeState){
            //如果從外面跑到安全區域
            safeAreaTimeline.pause();
            safeAreaHintIndex = 3;
            for (let i = 0; i < 4; i++) {
                safeAreaHint[i].visible = (i==safeAreaHintIndex)? true: false;
                safeAreaHint[i].alpha = (safeAreaHintIndex+1)/4;
            }
        }
        safeState = true;
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].tint = 0x00ff00;
        }
    }else{
        if(safeState){
            //如果從安全區域跑到外面
            safeAreaHintIndex = 0;
            safeAreaTimeline.restart();
        }
        safeState = false;
        dangerAreaStayTime++;
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].tint = 0xffff00;
        }
    }

    //離開安全區域太久
    if(dangerAreaStayTime>180){
        hintRect_g2.visible = true;
    }else{
        hintRect_g2.visible = false;
    }
    
    if(currentCarPosition < carMovingAncorMin){
        currentCarPosition = carMovingAncorMin;
    }

    if(currentCarPosition > carMovingAncorMax){
        currentCarPosition = carMovingAncorMax;
    }

    currentCarPosition-=carSpeed*3;
    car_g2.position.set(app.screen.width/2, currentCarPosition);
    // safeAreaHint.position.set(app.screen.width/2, currentCarPosition);
    for (let i = 0; i < 4; i++) {
        safeAreaHint[i].position.set(app.screen.width/2, currentCarPosition-100);
    }
    safeAreaHint.height = 1500;

    timeCounter2++;
    car_g2.position.x = Math.sin(timeCounter2/40)*50 +app.screen.width/2;
    
    //消失點左右移動
    // world3D_g2.position.x = Math.sin(timeCounter2/140)*300;
}
