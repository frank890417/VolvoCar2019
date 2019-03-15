
function loadAllAssets(){
    let _loader = PIXI.loader
        .add("countImg", "images/game1/count.png")
        .add("bikeImg", "images/game1/bike_g1.png")
        .add("dashImg", "images/game1/dash.png")
        .add("cityImg", "images/game1/cityRoad.png")
        .add("cityG3Img", "images/game3/cityRoad_g3.png")
        .add("missImg", "images/game1/miss.png")
        .add("mrImg", "images/game1/mr.png")
        .add("pedalImg", "images/game1/stopper.png")
        .add("pedalWarningImg", "images/game1/stopperLight.png")
        .add("walkImg", "images/game1/walk_g1.png")
        .add("carImg", "images/game1/car_g1.png")
        .add("sysImg", "images/game1/sys.png")
        .add("leftBtnImg", "images/game2/leftBtn.png")
        .add("rightBtnImg", "images/game2/rightBtn.png")
        .add("leftBtnG3Img", "images/game3/leftBtn.png")
        .add("rightBtnG3Img", "images/game3/rightBtn.png")
        .add("hintImg", "images/game2/hint.png")
        .add("hintG3Img", "images/game3/hint_g3.png")
        .add("carMidImg", "images/game2/car2.png")
        .add("safeAreaHintImg0", "images/game2/hintArea/1.png")
        .add("safeAreaHintImg1", "images/game2/hintArea/2.png")
        .add("safeAreaHintImg2", "images/game2/hintArea/3.png")
        .add("safeAreaHintImg3", "images/game2/hintArea/4.png")
        .add("streetLightImg", "images/game2/streetLight.png")
        .add("carInMirrorLeftImg", "images/game3/carFront.png")
        .add("carInMirrorRightImg", "images/game3/carFront.png")
        .add("carComingLeftImg", "images/game3/car1.png")
        .add("carComingRightImg", "images/game3/car3.png")
        .add("mirrorMaskRightImg", "images/game3/maskRight.png")
        .add("mirrorMaskLeftImg", "images/game3/maskLeft.png")
        .add("mirrorBgRightImg", "images/game3/mirrorBgRight.png")
        .add("mirrorBgLeftImg", "images/game3/mirrorBgLeft.png")
        .add("mirrorBorderRightImg", "images/game3/mirrorBorderRight.png")
        .add("mirrorBorderLeftImg", "images/game3/mirrorBorderLeft.png")
        .add("mirrorHintLeftImg", "images/game3/mirrorHintLeft.png")
        .add("mirrorHintRightImg", "images/game3/mirrorHintRight.png")

        .add("hintG4Img", "images/game4/hint_g4.png")
        .add("roadMapG4Img", "images/game4/roadmap_g4.png")
        .add("myCarG4Img", "images/game4/car_me.png")
        .add("armyCarG4Img", "images/game4/car_army.png");
        
    for (let index = 36; index < 297; index++) {
        let tempIndex =  (100000+index).toString().substring(1);
        // console.log(tempIndex);
        _loader.add({name: "roadBgG1" + index,
            url: "images/game1/roadBgG1/bg1_" + tempIndex + ".jpg"
        });
    }

    

    // for (let index = 0; index < 480; index++) {
    //     let tempIndex =  (100000+index).toString().substring(1);
    //     _loader.add({name: "roadBgG2" + index,
    //         url: "images/game2/roadBgG2/roadG2_" + tempIndex + ".jpg"
    //     });
    // }

    // _loader.add('roadBgVideoG1').onComplete.once(() => {
    //     const res = _loader.resources['roadBgVideoG1'];
    //     res.texture = PIXI.Texture.fromVideo("./images/game1/roadBgVideoG1.mp4");
    // });

    _loader
        .on("progress", loadHandler)
        .load(setup);
}

function loadHandler(loader, resource) {
    $(".loading").text("載入進度： " + ~~(loader.progress) + " %");
}

function setup(){
    $(".loading").fadeOut(600);
    $(".init-text").css("opacity", 1);
    
    //先將小遊戲都隱藏
    for(let key in stages){
        stages[key].visible = false;
    }

    setupGame1();
    setupGame2();
    setupGame3();
    setupGame4();
    initStage();
}
