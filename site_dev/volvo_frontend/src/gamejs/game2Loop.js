export default {game2Loop};

let vars;
let common;
let game2Data;
let currentApp;


var timeCounter2 = 0;

function game2Loop(Vars) {
    // console.log("Game Ticker 2")
    if(!vars) initLoopData(Vars);

    //更新橫線
    for(let i=0; i< game2Data.lineGroup_g2.length; i++){
        let s = game2Data.lineGroup_g2[i];
        // if(!pressStop){
            s.counterY -= (game2Data.carSpeed+1)*5+100;
        // }
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 60000;
		}
    }

    //更新路燈
    for(let i=0; i< game2Data.streetLightGroup_g2.length; i++){
        let s = game2Data.streetLightGroup_g2[i];
        // if(!pressStop){
            s.counterY -= (game2Data.carSpeed+1)*5+100;
        // }
		s.position.y = s.counterY;
		if(s.counterY< -500){
			s.counterY = 24000*11;
		}
    }

    //車子移動設定
    if(game2Data.carSpeedUp){
        game2Data.carSpeed+=0.3;
        if(game2Data.carSpeed > game2Data.carSpeedMax){
            game2Data.carSpeed = game2Data.carSpeedMax;
        }
    }else{
        game2Data.carSpeed-=0.01;
    }

    if(game2Data.carSpeedDown){
        game2Data.carSpeed-=0.3;
        if(game2Data.carSpeed < game2Data.carSpeedMin){
            game2Data.carSpeed = game2Data.carSpeedMin;
        }
    }

    //隨機改變車子速度
    game2Data.carSpeed += game2Data.carSpeedRandomSeed;


    //是否離開安全區
    if(game2Data.currentCarPosition<game2Data.safeAreaMax && game2Data.currentCarPosition > game2Data.safeAreaMin){
        
        game2Data.dangerAreaStayTime = 0;
        if(!game2Data.safeState){
            //如果從外面跑到安全區域
            game2Data.safeAreaTimeline.pause();
            game2Data.safeAreaHintIndex = 3;
            for (let i = 0; i < 4; i++) {
                game2Data.safeAreaHint[i].visible = (i==game2Data.safeAreaHintIndex)? true: false;
                game2Data.safeAreaHint[i].alpha = (game2Data.safeAreaHintIndex+1)/4;
            }
        }
        game2Data.safeState = true;
        for (let i = 0; i < 4; i++) {
            game2Data.safeAreaHint[i].tint = 0x00ff00;
        }
    }else{
        if(game2Data.safeState){
            //如果從安全區域跑到外面
            game2Data.safeAreaHintIndex = 0;
            game2Data.safeAreaTimeline.restart();
        }
        game2Data.safeState = false;
        game2Data.dangerAreaStayTime++;
        for (let i = 0; i < 4; i++) {
            game2Data.safeAreaHint[i].tint = 0xffff00;
        }
    }

    //如果在危險區域做對的事，重新讀秒
    if(game2Data.currentCarPosition>game2Data.safeAreaMax){
        if(game2Data.carSpeedUp){
            game2Data.dangerAreaStayTime = 0;
        }
    }

    if(game2Data.currentCarPosition<game2Data.safeAreaMin){
        if(game2Data.carSpeedDown){
            game2Data.dangerAreaStayTime = 0;
        }
    }

    //離開安全區域太久
    if(game2Data.dangerAreaStayTime>180){
        game2Data.hintRect_g2.visible = true;
    }else{
        game2Data.hintRect_g2.visible = false;
    }
    
    if(game2Data.currentCarPosition < game2Data.carMovingAncorMin){
        game2Data.currentCarPosition = game2Data.carMovingAncorMin;
    }

    if(game2Data.currentCarPosition > game2Data.carMovingAncorMax){
        game2Data.currentCarPosition = game2Data.carMovingAncorMax;
    }

    game2Data.currentCarPosition-=game2Data.carSpeed*3;
    game2Data.car_g2.position.set(currentApp.screen.width/2, game2Data.currentCarPosition);
    // safeAreaHint.position.set(currentApp.screen.width/2, game2Data.currentCarPosition);
    for (let i = 0; i < 4; i++) {
        game2Data.safeAreaHint[i].position.set(currentApp.screen.width/2, game2Data.currentCarPosition-100);
    }
    game2Data.safeAreaHint.height = 1500;

    timeCounter2++;
    game2Data.car_g2.position.x = Math.sin(timeCounter2/40)*50 +currentApp.screen.width/2;
    
    //消失點左右移動
    // world3D_g2.position.x = Math.sin(timeCounter2/140)*300;
}


function initLoopData(Vars){
    vars = Vars;
    common = Vars.common;
    game2Data = Vars.game2Data;
    currentApp = game2Data.app;
}