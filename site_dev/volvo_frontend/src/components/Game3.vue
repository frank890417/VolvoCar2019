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
      let ratio = $(window).innerWidth()/1920;
      $("canvas").css("transform", `scale(${ratio})`);
      $("canvas").css("transform-origin", "0 0");
    },
    resetData(){
      console.log("resetData");
      resetData();
    },
    loadAsset(callback){
      console.log("loadAsset");
      if(!PIXI.loader.resources.g1Ui){
        loadAllAssets.loadAllAssets(Vars, callback);
      }else{
        callback();
      }
    },
    setUp(gameContainerSelector){
      console.log("setup");
      Vars.common.currentStage = 3;
      envSetting.setupEnv(gameContainerSelector, Vars);
      this.resizeCanvas();
      game3Setup(Vars);
      game3Init(Vars);
      resetData();
    
    },
    start(){
      game3Start();

    
    },
    pause(){
      game3Pause();
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
      gameContainer: ".game3 .game-container"
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
    height: 100vh
    canvas
      transform-origin: 0 0
  position: relative
  .loading-text 
    position: absolute
    left: 10px
    top: 10px
</style>
