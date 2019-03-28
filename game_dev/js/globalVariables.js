//共用
var bigWhiteTexture;
var debug = false;
var isPrePlaying = false;
var prePlayTimelineG1;
var prePlayTimelineG2;
var prePlayTimelineG3;
var prePlayTimelineG4;
var prePlayG1Cover;
var prePlayG2Cover;
var prePlayG3Cover;
var prePlayG4Cover;
var prePlayStartTextG1;
var prePlayStartTextG2;
var prePlayStartTextG3;
var prePlayStartTextG4;
//給預覽動畫使用
var isGameRunning = false;

//調整畫面的解析度
var DEFAULT_STAGE_WIDTH = 1920;
var DEFAULT_STAGE_HEIGHT = 1080;

//stage manage
var app;
var currentStage = 0;
var stage1;
var stage2;
var stage3;
var stage4;

var stages = {
    1: stage1,
    2: stage2,
    3: stage3,
    4: stage4
}

var stageLoops;


//第二關
var g2Ui;
var hintRect_g2;
var timerGame2;
var timeText_g2;
var timeRemainingText_g2;
var remainingTime_g2 = 30;

var cityRoad_g2;
var cityRoadAniBg_g2;
var dash_g2;
var missImg_g2;
var mrImg_g2;
var sysImg_g2;

var leftBtn_g2;
var rightBtn_g2;
var hint_g2;
var car_g2;

//設定汽車的最遠距離以及最近可以到多近
var carMovingAncorMin = 200;
var carMovingAncorMax = 2500;
var carSpeed = 0;
var carSpeedMin = -1;
var carSpeedMax = 1;
var carSpeedUp = false;
var carSpeedDown = false;
var carSpeedRandomSeed = 0;

var currentCarPosition;
var safeAreaHint = [];
var safeAreaHintIndex = 0;
var safeAreaMax = 880;
var safeAreaMin = 430;
var safeState = false;
var dangerAreaStayTime = 0;
var safeAreaTimeline;

var world3D_g2;
var vanishingPoint_g2;
var vanishingPointStyle_g2;
var lineLeft_g2;
var lineRight_g2;
var roadWidth_g2 = 5000;
var lineGroup_g2;
var streetLightGroup_g2;

//第三關
var carSideSequenceIndex = 0;
var carSideSequence = ['left', 'left', 'right', 'right', 'left'];

var timerGame3;
var hintRect_g3;
var hintTextG3;
var hintRectGood_g3
var timeText_g3;
var timeRemainingText_g3;
var remainingTime_g3 = 30;
var cityRoad_g3;
var dash_g3;
var missImg_g3;
var mrImg_g3;
var sysImg_g3;
var leftBtn_g3;
var rightBtn_g3;
var hint_g3;

var car_g3;
var carMoveLeftAni;
var carPosY_g3 = 600;
var carComingLeft_g3;
var carComingRight_g3;
var isLeftCarComes = false;
var isRightCarComes = false;

var world3D_g3;
var vanishingPoint_g3;
var vanishingPointStyle_g3;
var lineLeft_g3;
var lineRight_g3;
var roadWidth_g3 = 1920*1.5;
var lineGroup_g3;
var leftWifi = [];
var rightWifi = [];
var leftWifiIndex = 0;
var rightWifiIndex = 0;
var leftWifiTimeline;
var rightWifiTimeline;

//後照鏡
var mirrorLeft_g3;
var mirrorRight_g3;
var carInMirrorLeft_g3;
var carInMirrorRight_g3;

var mirrorHintLeft_g3;
var mirrorHintRight_g3;

var mirrorMaskLeft_g3;
var mirrorMaskRight_g3;
var mirrorBgLeft_g3;
var mirrorBgRight_g3;
var mirrorBorderLeft_g3;
var mirrorBorderRight_g3;

var carLeftTimeline_g3;
var carRightTimeline_g3;

var carEmitterTimer;
var currentCarSide;


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


export default { common, game1Data };


