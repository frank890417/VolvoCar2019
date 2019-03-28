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
import {game2Init, resetData} from "../gamejs/game2Init.js"

export default {
  name: 'Game2',
  props: {
    msg: String
  },
  mounted(){
  },
  methods: {
    resizeCanvas(){
      let ratio = $(window).innerWidth()/1920;
      $("canvas").css("transform", `scale(${ratio})`);
      $("canvas").css("transform-origin", "0 0");
    },
    setupGameData(){
      Vars.common.currentStage = 2;
      envSetting.setupEnv(this.gameContainer, Vars);
      this.resizeCanvas();
      game2Setup(Vars);
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
      Vars.common.currentStage = 2;
      envSetting.setupEnv(gameContainerSelector, Vars);
      this.resizeCanvas();
      game2Setup(Vars);
      game2Init(Vars);
      resetData();
    }
  },
  computed: {
    ...mapState(['debug']),
  },
  beforeDestroy: function() {
    
  },
  destroyed: function() {
    //移除 vue instance 之後
    delete Vars.common.app;

  },
  watch:{
    
  },
  data(){
    return {
      gameContainer: ".game2 .game-container"
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
    canvas
      transform-origin: 0 0
</style>
