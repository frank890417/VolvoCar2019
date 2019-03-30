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
import {game3Init, resetData, game3Start,game3Pause} from "../gamejs/game3Init.js"

export default {
  name: 'Game3',
  props: {
    msg: String
  },
  mounted(){
    window.tempVars = Vars;

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
      if(!this.isInit){
        this.isInit = true;
        console.log("[Game3] setup");
        Vars.common.currentStage = 3;
        envSetting.setupEnv(gameContainerSelector, Vars);
        this.resizeCanvas();
        game3Setup(Vars);
        game3Init(Vars);
        resetData();
        Vars.common.app.ticker.stop();
      }
    },
    start(){
      Vars.common.app.ticker.start();
    },
    pause(){
      Vars.common.app.ticker.stop();
    }
  },
  computed: {
    ...mapState(['debug']),
  },
  beforeDestroy: function() {
    
  },
  destroyed: function() {
    delete Vars.common.app;
  },
  watch:{
    
  },
  data(){
    return {
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
