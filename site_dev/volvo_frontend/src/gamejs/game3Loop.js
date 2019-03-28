export default {game3Loop};

let vars;
let common;
let game3Data;

let timeCounter3 = 0;
function game3Loop(Vars) {
    if(!vars) initLoopData(Vars);

    //更新橫線
    for(let i=0; i< game3Data.lineGroup_g3.length; i++){
        let s = game3Data.lineGroup_g3[i];
        s.counterY -= game3Data.carSpeed;
        console.log(s.counterY);

        s.position.y = s.counterY;
        if(s.counterY< -500){
            s.counterY = 3000*11;
        }
    }
    
    if(game3Data.leftBtnClick_g3){
        if(game3Data.isLeftCarComes){
            let tl = new TimelineMax();
            tl.fromTo(game3Data.hintRectGood_g3, 0.2, {alpha: 1}, {alpha: 0}).yoyo(1).repeat(6);  
            if(game3Data.carMoveLeftAni){
                game3Data.carMoveLeftAni.kill();
                game3Data.carMoveLeftAni = null;
                game3Data.carMoveLeftAniMirror.kill();
            }
            setToCenter();
            
        }
    }

    if(game3Data.rightBtnClick_g3){
        if(game3Data.isRightCarComes){
            let tl = new TimelineMax();
            tl.fromTo(game3Data.hintRectGood_g3, 0.2, {alpha: 1}, {alpha: 0}).yoyo(1).repeat(6);  
            if(game3Data.carMoveRightAni){
                game3Data.carMoveRightAni.kill();
                game3Data.carMoveRightAni = null;
                game3Data.carMoveRightAniMirror.kill();
            }
            setToCenter();
        }
    }

    //update wifi
    for(let i=0; i<5; i++){
        let tempWifiL = game3Data.leftWifi[i];
        let tempWifiR = game3Data.rightWifi[i];
        tempWifiL.position.set(game3Data.car_g3.position.x - 200, game3Data.car_g3.position.y - 500);
        tempWifiR.position.set(game3Data.car_g3.position.x + 200, game3Data.car_g3.position.y - 500);
    }

    
    // game3Data.car_g3.position.x = Math.sin(timeCounter3/100)*50 + app.screen.width/2;
    // game3Data.car_g3.position.y = Math.sin(timeCounter3/300)*10 + carPosY_g3;
    
    // carComingLeft_g3.position.y = (carComingLeft_g3.position.y + 10 )% 10000;
    //world3D_g3.position.x = Math.sin(timeCounter3/140)*300;
    timeCounter3++;
}


function initLoopData(Vars){
    vars = Vars;
    common = Vars.common;
    game3Data = Vars.game3Data;
}


function setToCenter(){
    TweenMax.to(game3Data.car_g3.position, 1,{
        x: common.app.screen.width/2,
        ease: Power0.easeNone
    });
    TweenMax.to(game3Data.mirrorBgRight_g3.position, 1,{
        x: -300,
        ease: Power0.easeNone
    });
    TweenMax.to(game3Data.mirrorBgLeft_g3.position, 1,{
        x: 0,
        ease: Power0.easeNone
    });
}