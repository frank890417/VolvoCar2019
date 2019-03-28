//第四關
var missImg_g4;
var mrImg_g4;
var sysImg_g4;
var hint_g4;
var roadContainer;
var roadMap_g4;
var myCar_g4;
var myCarMovingArea_g4;
var armyCar_g4;
var lastPosData;
var lastPosDataArmy;
var myCarShiftY;

var myCarTimeline;
var armyCarTimeline;
var myCarSpeed = 0.008;
var armyCarSpeed = 0.01;
var mouseTracker;
var basicText;
var showController;
var mouseDownPos;

var timeText_g4;
var timeRemainingText_g4;
var remainingTime_g4 = 30;
var hintRect_g4;




let common = {
    bigWhiteTexture: null,
    isPrePlaying : false,
    prePlayTimelineG1: null,
    prePlayTimelineG2: null,
    prePlayTimelineG3: null,
    prePlayTimelineG4: null,
    prePlayG1Cover: null,
    prePlayG2Cover: null,
    prePlayG3Cover: null,
    prePlayG4Cover: null,
    prePlayStartTextG1: null,
    prePlayStartTextG2: null,
    prePlayStartTextG3: null,
    prePlayStartTextG4: null,
    //給預覽動畫使用
    isGameRunning : false,

    //調整畫面的解析度
    DEFAULT_STAGE_WIDTH : 1920,
    DEFAULT_STAGE_HEIGHT : 1080,

    //stage manage
    app,
    currentStage : 0,
    stage1 : 0,
    stage2 : 0,
    stage3 : 0,
    stage4 : 0,
    stages : {},
    stageLoops: null
};

let game1Data = {
    crossingGroups : [],
    crossingGroup: null,
    crossLine: null,
    crossSequence : ['person', 'car', 'person', 'car', 'person', 'car', 'bike', 'person', 'car', 'person', 'bike'],
    
    
    crossObjects : [
        {type: "walk", posX: -1500, posY: 1000, side: "left"},
        {type: "car", posX: 1500, posY: 8000, side: "right"},
        {type: "walk", posX: -1500, posY: 18000, side: "left"},
        {type: "walk", posX: 8000, posY: 26000, side: "right"},
        {type: "car", posX: -1500, posY: 33000, side: "left"},
        {type: "car", posX: 5000, posY: 41000, side: "right"},
        {type: "bike", posX: 8000, posY: 50000, side: "right"},
        {type: "walk", posX: -1500, posY:57000, side: "left"},
        {type: "car", posX: 8000, posY: 66000, side: "right"},
        {type: "walk", posX: 6000, posY: 75000, side: "right"},
        {type: "bike", posX: -3500, posY: 88000, side: "left"}
    ],
    
    g1Ui: null,
    countImg: null,
    
    carCounter : 4,
    bikeCounter : 2,
    walkCounter : 5,
    
    hintRect: null,
    timerGame1: null,
    timeText: null,
    timeRemainingText: null,
    remainingTime : 30,
    groupSpeedMax : 2,
    groupSpeedMin : 0.05,
    groupSpeed : 2,
    pressStop : false,
    bgAnimationSpeed : 0.2,
    
    cityRoad : null,
    cityRoadAniBg : null,
    bike : null,
    bikeSpeed : 5,
    walkImg : null,
    carImg : null,
    
    groundMoveSpeedG1 : 50,
    
    currentMovingIndex : 0,
    currentMovingObject : null,
    bikeScurrentMovingObjectSpeed : 5,
    
    dash : null,
    pedal : null,
    pedalWarning : null,
    
    missImg : null,
    mrImg : null,
    sysImg : null,
    
    world3D : null,
    vanishingPoint : null,
    vanishingPointStyle : null,
    lineLeft : null,
    lineRight : null,
    roadWidth : 2600,
    lineGroup : null,
    hintTextG1 : null,
}

let game2Data = {
    //第二關
    g2Ui: null,
    hintRect_g2: null,
    timerGame2: null,
    timeText_g2: null,
    timeRemainingText_g2: null,
    remainingTime_g2 : 30,

    cityRoad_g2: null,
    cityRoadAniBg_g2: null,
    dash_g2: null,
    missImg_g2: null,
    mrImg_g2: null,
    sysImg_g2: null,

    leftBtn_g2: null,
    rightBtn_g2: null,
    hint_g2: null,
    car_g2: null,

    //設定汽車的最遠距離以及最近可以到多近
    carMovingAncorMin : 200,
    carMovingAncorMax : 2500,
    carSpeed : 0,
    carSpeedMin : -1,
    carSpeedMax : 1,
    carSpeedUp : false,
    carSpeedDown : false,
    carSpeedRandomSeed : 0,

    currentCarPosition : null,
    safeAreaHint : [],
    safeAreaHintIndex : 0,
    safeAreaMax : 880,
    safeAreaMin : 430,
    safeState : false,
    dangerAreaStayTime : 0,
    safeAreaTimeline : null,

    world3D_g2 : null,
    vanishingPoint_g2:null,
    vanishingPointStyle_g2:null,
    lineLeft_g2:null,
    lineRight_g2:null,
    roadWidth_g2 : 5000,
    lineGroup_g2:null,
    streetLightGroup_g2:null,

}

let game3Data = {


    //第三關
    carSideSequenceIndex : 0,
    carSideSequence : ['left', 'left', 'right', 'right', 'left'],

    timerGame3:null,
    hintRect_g3:null,
    hintTextG3:null,
    hintRectGood_g:null,
    timeText_g3:null,
    timeRemainingText_g3:null,
    remainingTime_g3 : 30,
    cityRoad_g3:null,
    dash_g3:null,
    missImg_g3:null,
    mrImg_g3:null,
    sysImg_g3:null,
    leftBtn_g3:null,
    rightBtn_g3:null,
    hint_g3:null,

    car_g3:null,
    carMoveLeftAni:null,
    carPosY_g3 : 600,
    carComingLeft_g3:null,
    carComingRight_g3:null,
    isLeftCarComes : false,
    isRightCarComes : false,

    world3D_g3:null,
    vanishingPoint_g3:null,
    vanishingPointStyle_g3:null,
    lineLeft_g3:null,
    lineRight_g3:null,
    roadWidth_g3 : 1920*1.5,
    lineGroup_g3:null,
    leftWifi : [],
    rightWifi : [],
    leftWifiIndex : 0,
    rightWifiIndex : 0,
    leftWifiTimeline:null,
    rightWifiTimeline:null,

    //後照鏡
    mirrorLeft_g3:null,
    mirrorRight_g3:null,
    carInMirrorLeft_g3:null,
    carInMirrorRight_g3:null,
    carLeftMirrorTimeline_g3: null,
    carRightMirrorTimeline_g3: null,

    mirrorHintLeft_g3:null,
    mirrorHintRight_g3:null,

    mirrorMaskLeft_g3:null,
    mirrorMaskRight_g3:null,
    mirrorBgLeft_g3:null,
    mirrorBgRight_g3:null,
    mirrorBorderLeft_g3:null,
    mirrorBorderRight_g3:null,

    carLeftTimeline_g3:null,
    carRightTimeline_g3:null,

    carEmitterTimer:null,
    currentCarSide:null,

    pressStop : false

}

let game4Data = {


}


export default { common, game1Data, game2Data, game3Data, game4Data };


