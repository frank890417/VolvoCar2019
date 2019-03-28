<template lang="pug">
  .page.game 
    game1(ref="game1" v-show="currentGame==1")
    game2(ref="game2" v-show="currentGame==2")
    game3(ref="game3" v-show="currentGame==3")
    .nav.active
      li(@click="loadGame") {{"開始 Game" +currentGame}}
      li(@click="resetData") {{"重置 Game" +currentGame}}
      li 
        input(v-model="currentGame")
      li(@click="toggleMenu") 開合

</template>

<script>

import game1 from "../components/Game1"
import game2 from "../components/Game2"
import game3 from "../components/Game3"

export default {
  name: "Game",
  mounted(){
    this.refGriup["1"] = this.$refs.game1;
    this.refGriup["2"] = this.$refs.game2;
    this.refGriup["3"] = this.$refs.game3;
  },
  components: {
    game1,
    game2,
    game3
  },
  data(){
    return{
      currentGame: 1,
      refGriup: {}
    }
  },
  methods: {
    loadGame(){
      this.refGriup[this.currentGame].loadAsset(()=>{
        this.refGriup[this.currentGame].setUp(`.game${this.currentGame} .game-container`);
      });
    },
    resetData(){
      this.refGriup[this.currentGame].resetData();
    },
    toggleMenu(){
      $(".nav").toggleClass("active");
    }
  }
}
</script>

<style scoped lang="sass">
  .nav
    position: absolute
    left: -450px
    bottom: 200px
    color: white
    background-color: black
    transition: 0.5s left
    li
      display: inline-block
      color: white
      padding: 10px 20px
    &.active
      left: 10px
  .game
    overflow: hidden
</style>
