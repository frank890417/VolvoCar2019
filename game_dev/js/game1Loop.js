function game1Loop(){

    //橫線
    for(let i=0; i< lineGroup.length; i++){
        let s = lineGroup[i];
        s.counterY -= groundMoveSpeedG1;
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 60000;
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
        
        if(s.counterY<20000){
            if(s.visible==false){
                s.visible = true;
                TweenMax.fromTo(s, 1,{alpha:0}, {alpha:1});
            }
        }else{
            s.alpha = 0;
            s.visible = false;
        }

    
        let sideVal = s.side == "left" ? 1: -1;

		if(s.counterY < 8000){
            
            if(s.type == "car"){
                s.counterX += 30*sideVal;
            }else if(s.type == "walk"){
                s.counterX += 8*sideVal;
            }else if(s.type == "bike"){
                s.counterX += 15*sideVal;
            }


            if(s.position.x < app.screen.width/2 + roadWidth/4){
                isInWarningRange = true;
            }

            if(s.counterY < -1000){
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



    if(!pressStop){
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
    /*
    if(pressStop){
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
    */

    //更新數量
    carCounterText.text = "0" + carCounter;
    bikeCounterText.text = "0" +bikeCounter;
    walkCounterText.text = "0" + walkCounter;
}