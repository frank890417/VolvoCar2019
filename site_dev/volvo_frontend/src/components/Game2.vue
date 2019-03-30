<template lang="pug">
  .game2
    .loading-text 載入中
    .game-container
    
</template>

<script>
import WOW from 'wow.js'
import {mapState} from 'vuex'
import {TweenMax} from 'gsap'
import sceneData from '../sceneData.js'
import Vars from "../gamejs/globalVariables.js"
import envSetting from "../gamejs/envSetting.js"
import loadAllAssets from "../gamejs/assetLoader.js"
import {game2Setup} from "../gamejs/game2Setup.js"
import {game2Init, resetData , game2Start, game2Pause} from "../gamejs/game2Init.js"

export default {
  name: 'Game2',
  props: {
    msg: String
  },
  mounted(){
  },
  methods: {
    resizeCanvas(){
      // let ratio = $(window).innerWidth()/1920;
      $("canvas").css("width","100%");
    },
    resetData(){
      console.log("[Game2] resetData");
      resetData();
    },
    loadAsset(callback){
      console.log("[ALL Game] loadAsset");
      if(!PIXI.loader.resources.g1Ui){
        loadAllAssets.loadAllAssets(Vars, callback);
      }else{
        callback();
      }
    },
    setUp(gameContainerSelector){
      if(!Vars.game2Data.app){
        this.isInit = true;
        console.log("[Game2] setup");
        envSetting.setupEnv(gameContainerSelector, this.currentGame, Vars);
        this.resizeCanvas();
        game2Setup(Vars);
        game2Init(Vars);
        resetData();
        Vars.game2Data.app.ticker.stop();
      }else{
        $(gameContainerSelector).append(Vars.game2Data.app.view);
      }
    },
    start(){
      if($(this.gameContainer).children().length == 0){
        $(this.gameContainer).append(Vars.game2Data.app.view);
      }
      console.log("[Game2] start");
      Vars.common.prePlayTimelineG2.restart();
      Vars.game2Data.app.ticker.start();
    },
    pause(){
      console.log("[Game2] pause");
      Vars.game2Data.app.ticker.stop();
    }
  },
  computed: {
    ...mapState(['debug']),
  },
  beforeDestroy: function() {
    
  },
  destroyed: function() {
    
  },
  watch:{
    
  },
  data(){
    return {
      currentGame: 2,
      gameContainer: ".game2 .game-container",
      isInit: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.game2
  .game-container
    overflow: hidden
    width: 100%
    height: 56.25vw
    canvas
      transform-origin: 0 0
  position: relative
  .loading-text 
    position: absolute
    left: 10px
    top: 10px
</style>
