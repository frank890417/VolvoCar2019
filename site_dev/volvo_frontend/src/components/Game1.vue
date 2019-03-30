<template lang="pug">
  .game1 
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
import {game1Setup} from "../gamejs/game1Setup.js"
import {game1Init, resetData, game1Start, game1Pause} from "../gamejs/game1Init.js"

export default {
  name: 'Game1',
  props: {
  },
  mounted(){
    window.tempVars = Vars;
  },
  methods: {
    resizeCanvas(){
      $("canvas").css("width","100%");
    },
    resetData(){
      console.log("[Game1] resetData");

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
      console.log("[Game1] setup");

      if(!this.isInit){
        this.isInit = true;
        envSetting.setupEnv(gameContainerSelector, this.currentGame, Vars);
        this.resizeCanvas();
        game1Setup(Vars);
        game1Init(Vars);
        resetData();
        Vars.game1Data.app.ticker.stop();
      }
    },
    start(){
      console.log("[Game1] start");
      // Vars.game1Data.prePlayTimelineG1.restart();
      Vars.game1Data.app.ticker.start();
    },
    pause(){
      console.log("[Game1] pause");
      Vars.game1Data.app.ticker.stop();
    }
  },
  computed: {
    ...mapState(['debug']),
  },
  beforeDestroy: function() {
    //移除 vue instance 之前
    console.log('beforeDestroy');
  },
  destroyed: function() {
    //移除 vue instance 之後
    delete Vars.game1Data.app;
    console.log('destroyed');
  },
  watch:{
    
  },
  data(){
    return {
      currentGame: 1,
      gameContainer: ".game1 .game-container",
      isInit: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.game1
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
