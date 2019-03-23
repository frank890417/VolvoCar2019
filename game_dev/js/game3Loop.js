
var timeCounter3 = 0;
function game3Loop() {

    //更新橫線
    for(let i=0; i< lineGroup_g3.length; i++){
        let s = lineGroup_g3[i];
        if(!pressStop){
            s.counterY -= (carSpeed+1)*5+100;
        }
        s.position.y = s.counterY;
        if(s.counterY< -500){
            s.counterY = 3000*11;
        }
    }

    // if(rightBtnClick_g3);
    if(leftBtnClick_g3){
        if(isLeftCarComes){
            let tl = new TimelineMax();
            tl.fromTo(hintRectGood_g3, 0.2, {alpha: 1}, {alpha: 0}).yoyo(1).repeat(6);  
            if(carMoveLeftAni){
                carMoveLeftAni.kill();
                carMoveLeftAni = null;
            }
            TweenMax.to(car_g3.position, 1,{
                x: app.screen.width/2,
                ease: Power0.easeNone
            });
        }
    }

    if(rightBtnClick_g3){
        if(isRightCarComes){
            let tl = new TimelineMax();
            tl.fromTo(hintRectGood_g3, 0.2, {alpha: 1}, {alpha: 0}).yoyo(1).repeat(6);  
            if(carMoveRightAni){
                carMoveRightAni.kill();
                carMoveRightAni = null;
            }
            TweenMax.to(car_g3.position, 1,{
                x: app.screen.width/2,
                ease: Power0.easeNone
            });
        }
    }

    //update wifi
    for(let i=0; i<5; i++){
        let tempWifiL = leftWifi[i];
        let tempWifiR = rightWifi[i];
        tempWifiL.position.set(car_g3.position.x - 120, car_g3.position.y - 500);
        tempWifiR.position.set(car_g3.position.x + 120, car_g3.position.y - 500);
    }

    
    // car_g3.position.x = Math.sin(timeCounter3/100)*50 + app.screen.width/2;
    // car_g3.position.y = Math.sin(timeCounter3/300)*10 + carPosY_g3;
    
    // carComingLeft_g3.position.y = (carComingLeft_g3.position.y + 10 )% 10000;
    //world3D_g3.position.x = Math.sin(timeCounter3/140)*300;
    timeCounter3++;
}