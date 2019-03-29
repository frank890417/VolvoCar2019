export default {game1Loop};

let vars;
let common;
let game1Data;

function game1Loop(Vars){
    if(!vars) initLoopData(Vars);
    
    //橫線
    for(let i=0; i< game1Data.lineGroup.length; i++){
        let s = game1Data.lineGroup[i];
        s.counterY -= game1Data.groundMoveSpeedG1;
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 60000;
		}
    }

    //過馬路的人們
    let isInWarningRange = false;
    let isInDangerZone = false;
    for(let i=0; i<game1Data.crossingGroup.length; i++){
        let s = game1Data.crossingGroup[i];
        s.counterY -= game1Data.groundMoveSpeedG1;
        s.position.y = s.counterY;
        s.position.x = s.counterX;
        if(s.position.y < 150 && s.position.x > common.app.screen.width/2 - game1Data.roadWidth/4 && s.position.x < common.app.screen.width/2 + game1Data.roadWidth/2){
            isInDangerZone = true;
        }
        
        if(s.counterY<7000){
            if(!s.visible ){
                s.visible = true;
                TweenMax.fromTo(s, 0.1,{alpha:0}, {alpha:1});
            }
        }else{
            s.alpha = 0;
            s.visible = false;
        }

    
        let sideVal = s.side == "left" ? 1: -1;

		if(s.counterY < 6500){
            
            if(s.type == "car"){
                s.counterX += 50*sideVal;
            }else if(s.type == "walk"){
                s.counterX += 18*sideVal;
            }else if(s.type == "bike"){
                s.counterX += 25*sideVal;
            }


            if(s.position.x < common.app.screen.width/2 + game1Data.roadWidth/4){
                isInWarningRange = true;
            }

            if(s.counterY < -1000){
                if(s.type == "car"){
                    game1Data.carCounter--;
                }else if(s.type == "walk"){
                    game1Data.walkCounter--;
                }else if(s.type == "bike"){
                    game1Data.bikeCounter--;
                }
                s.visible  = false;
                s.parent.removeChild(s);
                s.destroy();
                game1Data.crossingGroup.splice(i, 1);
                // s.counterX = 0;
                // s.counterY = 20000;
            }
		}
    }

    game1Data.hintRect.visible = isInDangerZone;
    game1Data.pedalWarning.visible = isInWarningRange;



    if(!game1Data.pressStop){
        game1Data.groundMoveSpeedG1+=5;
        if(game1Data.groundMoveSpeedG1 > 100){
            game1Data.groundMoveSpeedG1 = 100;
        }
    }else{
        game1Data.groundMoveSpeedG1-=2;
        if(game1Data.groundMoveSpeedG1<0){
            game1Data.groundMoveSpeedG1 = 0;
        }
    }


    //影片速度控制
    
    if(game1Data.pressStop){
        if(game1Data.cityRoadAniBg.animationSpeed>0){
            game1Data.cityRoadAniBg.animationSpeed -= 0.02;
            if(game1Data.cityRoadAniBg.animationSpeed<0){
                game1Data.cityRoadAniBg.animationSpeed = 0;
            }
        }
    }else{
        if(game1Data.cityRoadAniBg.animationSpeed < 0.05){
            game1Data.cityRoadAniBg.animationSpeed +=0.005;
        }else if(game1Data.cityRoadAniBg.animationSpeed > 0.8){
            game1Data.cityRoadAniBg.animationSpeed = 0.8;
        }
    }
    

    //更新數量
    game1Data.carCounterText.text = "0" + game1Data.carCounter;
    game1Data.bikeCounterText.text = "0" + game1Data.bikeCounter;
    game1Data.walkCounterText.text = "0" + game1Data.walkCounter;

}


function initLoopData(Vars){
    vars = Vars;
    common = Vars.common;
    game1Data = Vars.game1Data;
}