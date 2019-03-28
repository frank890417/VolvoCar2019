<template lang="pug">
  .page.game 
    game1(ref="game1")
    .nav
      li(@click="loadG1") 開始 G1
      li(@click="resetG1Data") G1 重置
</template>

<script>

import game1 from "../components/Game1"

export default {
  name: "Game",
  mounted(){

  },
  components: {
    game1
  },
  data(){
    return{

    }
  },
  methods: {
    loadG1(){
      this.$refs.game1.loadAsset(()=>{
        this.$refs.game1.setUp(".game1 .game-container");
      });
    },
    resetG1Data(){
      this.$refs.game1.resetData();
    }
  }
}
</script>

<style scoped lang="sass">
  .nav
    position: absolute
    left: 10px
    bottom: 10px
    background-color: black
    li
      display: inline-block
      color: white
      padding: 15px 30px
</style>
