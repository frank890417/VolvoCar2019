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
import {game1Init, resetData,game1Start,game1Pause} from "../gamejs/game1Init.js"

export default {
  name: 'Game1',
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
      Vars.common.currentStage = 1;
      envSetting.setupEnv(gameContainerSelector, Vars);
      this.resizeCanvas();
      game1Setup(Vars);
      game1Init(Vars);
      resetData();
    },
    start(){
      game1Start();

    },
    pause(){
      game1Pause();
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
    delete Vars.common.app;
    console.log('destroyed');
  },
  watch:{
    
  },
  data(){
    return {
      gameContainer: ".game1 .game-container"
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
