<template lang="pug">
  .game3 
    .loading-text 載入中
    .game-container
    
</template>

<script>
import WOW from 'wow.js'
import {mapState} from 'vuex'
import {TweenMax, TimelineMax} from 'gsap'
import sceneData from '../sceneData.js'
import Vars from "../gamejs/globalVariables.js"
import envSetting from "../gamejs/envSetting.js"
import loadAllAssets from "../gamejs/assetLoader.js"
import {game3Setup} from "../gamejs/game3Setup.js"
import {game3Init, resetData, game3Start, game3Pause} from "../gamejs/game3Init.js"

export default {
  name: 'Game3',
  props: {
    msg: String
  },
  mounted(){

  },
  methods: {
    resizeCanvas(){
      $("canvas").css("width","100%");
    },
    resetData(){
      console.log("[Game3] resetData");
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
      if(!Vars.game3Data.app){
        console.log("[Game3] setup");
        this.isInit = true;
        envSetting.setupEnv(gameContainerSelector, this.currentGame, Vars);
        this.resizeCanvas();
        game3Setup(Vars);
        game3Init(Vars);
        resetData();
        Vars.game3Data.app.ticker.stop();
      }else{
        $(gameContainerSelector).append(Vars.game3Data.app.view);
      }
    },
    start(){
      console.log("[Game3] start");
      if($(this.gameContainer).children().length == 0){
        $(this.gameContainer).append(Vars.game3Data.app.view);
      }
      Vars.common.prePlayTimelineG3.restart();
      Vars.game3Data.app.ticker.start();
    },
    pause(){
      console.log("[Game3] pause");
      Vars.game3Data.app.ticker.stop();
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
      currentGame: 3,
      gameContainer: ".game3 .game-container",
      isInit: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.game3
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
