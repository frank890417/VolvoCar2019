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
			s.counterY = 10000;
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
			s.counterY = 30000;
		}
    }

    //車子移動設定
    if(carSpeedUp){
        carSpeed+=0.1;
        if(carSpeed > carSpeedMax){
            carSpeed = carSpeedMax;
        }
    }

    if(carSpeedDown){
        carSpeed-=0.5;
        if(carSpeed < carSpeedMin){
            carSpeed = carSpeedMin;
        }
    }

    if(currentCarPosition<safeAreaMax && currentCarPosition > safeAreaMin){
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].tint = 0x00ff00;
        }
    }else{
        for (let i = 0; i < 4; i++) {
            safeAreaHint[i].tint = 0xffff00;
        }
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
