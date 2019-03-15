function game1Loop(){

    //橫線
    for(let i=0; i< lineGroup.length; i++){
        let s = lineGroup[i];
        s.counterY -= groundMoveSpeedG1;
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 10000;
		}
    }

    //過馬路的人們
    let isInWarningRange = false;
    let isInDangerZone = false;
    for(let i=0; i<crossingGroup.length; i++){
        let s = crossingGroup[i];
        s.counterY -= groundMoveSpeedG1;
        s.position.y = s.counterY;
        s.position.x = s.counterX;
        if(s.position.y < 150 && s.position.x > app.screen.width/2 - roadWidth/4 && s.position.x < app.screen.width/2 + roadWidth/2){
            isInDangerZone = true;
        }
        if(s.counterY<15000){
            s.visible = true;
        }else{
            s.visible = false;
        }

		if(s.counterY< 2000){
            
            if(s.type == "car"){
                s.counterX += 20;
            }else if(s.type == "walk"){
                s.counterX += 5;
            }else if(s.type == "bike"){
                s.counterX += 12;
            }

            if(s.position.x < app.screen.width/2 + roadWidth/4){
                isInWarningRange = true;
            }

            if(s.counterY< -1000){
                if(s.type == "car"){
                    carCounter--;
                }else if(s.type == "walk"){
                    walkCounter--;
                }else if(s.type == "bike"){
                    bikeCounter--;
                }
                s.visible  = false;
                s.parent.removeChild(s);
                s.destroy();
                crossingGroup.splice(i, 1);
                // s.counterX = 0;
                // s.counterY = 20000;
            }
		}
    }

    hintRect.visible = isInDangerZone;
    pedalWarning.visible = isInWarningRange;



    if(!pressStop && !isPrePlaying){
        groundMoveSpeedG1+=1;
        if(groundMoveSpeedG1>50){
            groundMoveSpeedG1 = 50;
        }
    }else{
        groundMoveSpeedG1-=2;
        if(groundMoveSpeedG1<0){
            groundMoveSpeedG1 = 0;
        }
    }


    //影片速度控制
    if(pressStop || isPrePlaying){
        if(cityRoadAniBg.animationSpeed>0){
            cityRoadAniBg.animationSpeed -= 0.03;
            if(cityRoadAniBg.animationSpeed<0){
                cityRoadAniBg.animationSpeed = 0;
            }
        }
    }else{
        if(cityRoadAniBg.animationSpeed>1){
            cityRoadAniBg.animationSpeed +=0.02;
        }
    }
    

    //更新數量
    carCounterText.text = "0" + carCounter;
    bikeCounterText.text = "0" +bikeCounter;
    walkCounterText.text = "0" + walkCounter;
}