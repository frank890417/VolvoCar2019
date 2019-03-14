
function game4Loop() {
    // myCarTimeline.time(myCarControlTime);
    //8108/3602 map, 3609.71/1442 path
    let currentMapPosX = myCarMovingArea_g4.position.x - app.screen.width/2;
    let currentMapPosY = myCarMovingArea_g4.position.y - app.screen.height/2;
    if(currentMapPosX >= 6166){
       currentMapPosX = 6166;
    }
    if(currentMapPosX < 0){
        currentMapPosX = 0;
    }

    if(currentMapPosY >= 3074){
        currentMapPosY = 3074;
     }
     if(currentMapPosY < 0){
         currentMapPosY = 0;
     }

    
    //更新相機位置
    roadContainer.position.x = currentMapPosX*-1;
    roadContainer.position.y = currentMapPosY*-1;

    //車子的旋轉角度
    let angle = Math.PI + Math.atan2(-myCarMovingArea_g4.position.x + lastPosData.x, myCarMovingArea_g4.position.y - lastPosData.y);
    lastPosData.x = myCarMovingArea_g4.position.x;
    lastPosData.y = myCarMovingArea_g4.position.y;
    
    if(myCarTimeline.time() > 0.1){
        myCarMovingArea_g4.rotation = angle;
    }else{
        myCarMovingArea_g4.rotation = 1.6;
    }
    
    
    let armyAngle = Math.PI + Math.atan2(-armyCar_g4.position.x + lastPosDataArmy.x, armyCar_g4.position.y - lastPosDataArmy.y);
    lastPosDataArmy.x = armyCar_g4.position.x;
    lastPosDataArmy.y = armyCar_g4.position.y;
    
    if(armyCarTimeline.time() > 0.1){
        armyCar_g4.rotation = armyAngle;
    }else{
        armyCar_g4.rotation = 1.6;
    }
    
    //繪製拖曳效果
    drawDragEffect(angle);

    if(myCarSpeed < 0){
        myCarSpeed = 0;
    }

    if(myCarSpeed > armyCarSpeed + 0.002){
        myCarSpeed = armyCarSpeed + 0.002;
    }

    let myTime = myCarTimeline.time();
    let armyTime = armyCarTimeline.time();


    myCarTimeline.seek(myTime+myCarSpeed);
    armyCarTimeline.seek(armyTime+armyCarSpeed);


    if(armyTime - myTime >= 1.5 || armyTime - myTime < 0.3){
        myCarSpeed = armyCarSpeed;
        hintRect_g4.visible = true;
    }else{
        hintRect_g4.visible = false;
    }
    
    
    myCar_g4.position.x = myCarShiftY;
    
    
}

function drawDragEffect(angle){
    if(showController){
        let mousePos = app.renderer.plugins.interaction.mouse.global;
        let distance = Math.sqrt( (mousePos.x-mouseDownPos.x)*(mousePos.x-mouseDownPos.x) + (mousePos.y-mouseDownPos.y)*(mousePos.y-mouseDownPos.y));
        mouseTracker.clear();
        mouseTracker.lineStyle(4, 0xffd900);
        mouseTracker.moveTo(mouseDownPos.x, mouseDownPos.y);
        mouseTracker.lineTo(mousePos.x, mousePos.y);
        mouseTracker.lineStyle(0, 0xffd900);
        mouseTracker.beginFill(0xffd900);
        mouseTracker.drawCircle(mousePos.x, mousePos.y, distance/30);
        // basicText.text = distance/(app.screen.width/2);

        //計算角度
        let dragAngle = Math.PI + Math.atan2(-mousePos.x + mouseDownPos.x, mousePos.y - mouseDownPos.y);

        if(Math.abs(myCarShiftY)<50){
            myCar_g4.position.x = myCarShiftY;
        }

        //有拉動就加一點點速度
        myCarSpeed += 0.00002;
        if(Math.abs(dragAngle-angle) > 1.2){
            if(dragAngle < angle && myCarShiftY>-100){
                myCarShiftY-=2;
            }else if(dragAngle > angle && myCarShiftY<100){
                myCarShiftY+=2;
            }
            
        }else{
            myCarSpeed += 0.00002;
        }

        basicText.text = dragAngle-angle;
        


        

    }else{
        myCarSpeed -= 0.00005;

        // myCarTimeline.timeScale(0);
        mouseTracker.clear();
    }
}