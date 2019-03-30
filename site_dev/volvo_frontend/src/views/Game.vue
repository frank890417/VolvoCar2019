<template lang="pug">
  .page.game 
    game1(ref="game1" v-show="currentGame==1")
    game2(ref="game2" v-show="currentGame==2")
    game3(ref="game3" v-show="currentGame==3")
    .nav-bar.active 
      li(@click="handleStageChange(1)", :class="{active: currentGame==1}") Game 1
      li(@click="handleStageChange(2)", :class="{active: currentGame==2}") Game 2
      li(@click="handleStageChange(3)", :class="{active: currentGame==3}") Game 3
      //- li(@click="startGame") {{"開始"}}
      li(@click="resetData") {{"重置"}}
      li(@click="toggleMenu") <

</template>

<script>

import game1 from "../components/Game1"
import game2 from "../components/Game2"
import game3 from "../components/Game3"

export default {
  name: "Game",
  mounted(){
    this.refGroup["1"] = this.$refs.game1;
    this.refGroup["2"] = this.$refs.game2;
    this.refGroup["3"] = this.$refs.game3;
  },
  components: {
    game1,
    game2,
    game3
  },
  data(){
    return{
      currentGame: 0,
      isLoaded: false,
      refGroup: {}
    }
  },
  methods: {
    loadGame(){
      if(!this.isLoaded){
        this.isLoaded = true;
        this.refGroup[this.currentGame].loadAsset(()=>{
          this.refGroup[this.currentGame].setUp(`.game${this.currentGame} .game-container`);
          this.refGroup[this.currentGame].start();
        });
      }else{
        this.refGroup[this.currentGame].setUp(`.game${this.currentGame} .game-container`);
        this.refGroup[this.currentGame].start();  
      }

    },
    startGame(){
      this.refGroup[this.currentGame].start();
    },
    resetData(){
      this.refGroup[this.currentGame].resetData();
    },
    toggleMenu(){
      $(".nav-bar").toggleClass("active");
    },
    handleStageChange(stage){
      if(this.currentGame==stage) return; 
      if(this.currentGame != 0){
        this.refGroup[this.currentGame].pause();
      }
      this.currentGame = stage;
      this.loadGame();
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="sass">
  .nav-bar
    position: absolute
    left: -350px
    bottom: 10px
    color: white
    background-color: black
    transition: 0.5s left
    li
      display: inline-block
      color: white
      padding: 10px 20px
      background-color: rgba(white,0)
      cursor: pointer
      &:hover
        background-color: rgba(white,0.1)
      &:active
        background-color: rgba(white,0.3)

    &.active
      left: 10px
    .btn-default
      background-color: #eee
  .game
    overflow: hidden
    canvas
      width: 100%
</style>
