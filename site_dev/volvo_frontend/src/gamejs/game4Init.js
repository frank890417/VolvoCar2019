function game4Init(){
    myCarShiftY = 0;
    myCarControlTime = 0;
    lastPosData = {x: 0, y: 0};
    lastPosDataArmy = {x: 0, y: 0};
    showController = false;
    mouseDownPos = {x: 0, y: 0};
    registerGame4Event();
    armyCarTimeline.seek(2);
    myCarTimeline.seek(0);

    let tl = new TimelineMax();
    tl.fromTo(hintRect_g4, 0.2, {alpha: 0}, {alpha: 1}).yoyo(1).repeat(-1);
 
}


function registerGame4Event(){
    moveArmyCar();
    
    $("body").on("mousedown", function(){
        showController = true;
        mouseDownPos.x =  app.renderer.plugins.interaction.mouse.global.x;
        mouseDownPos.y =  app.renderer.plugins.interaction.mouse.global.y;
    });

    $("body").on("mouseup", function(){
        showController = false;
    });
}

function moveArmyCar(){
    let bezierData = MorphSVGPlugin.pathDataToBezier("#g4_path");
    armyCarTimeline = new TimelineMax({});
    myCarTimeline = new TimelineMax({});

    let moveArmyCar = TweenMax.to(armyCar_g4.position, 20, {
        bezier: {
            values: bezierData, 
            type:"cubic"
        },
        ease:Linear.easeNone
    });

    armyCarTimeline.add(moveArmyCar, 0).repeat(-1);
    // armyCarTimeline.add(moveArmyCar, 0);

    let moveMyCar = TweenMax.to(myCarMovingArea_g4.position, 20, {
        bezier: {
            values:bezierData, 
            type:"cubic"
        },
        ease:Linear.easeNone
    });

    myCarTimeline.add(moveMyCar, 0).repeat(-1);
    myCarTimeline.pause();
    armyCarTimeline.pause();
    // myCarTimeline.add(moveMyCar, 3);
}
