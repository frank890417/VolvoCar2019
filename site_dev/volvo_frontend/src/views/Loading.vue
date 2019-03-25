<template lang="pug">
.page.loading
  .jumbotron.fadeIn.animated.ani-delay-5(:style="{'background-image':'url('+'_loading/loading_首頁.png'+')'}")
    div.part.p1
      div.title-area
        img.title.fadeIn.animated.ani-delay-15(src="_loading/volvo_laoding_v2_safety guardian.png").mt-5
        img.fadeIn.animated.ani-delay-15(src="_loading/volvo_laoding_v2_loadingbar.png" , style="width:450px").mt-5
        img.fadeIn.animated.ani-delay-15(src="_loading/volvo_laoding_v2_loading.png", style="width:200px").mt-3
      div
        img.fadeIn.animated.ani-delay-15(src="_loading/volvo_laoding_v2_explain.png", style="width:400px")
    //div.part.p2
      img(src="_loading/volvo_laoding_v2_phone.png", style="width:450px")
</template>

<script>
export default {
  mounted(){
    
  }

}
</script>

<style lang='sass'>
.page.loading
  background-color: black
  height: 100vh
  width: 100vw
  position: fixed
  left: 0
  top: 0
  z-index: 5000
  .jumbotron
    background-size: cover
    
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
  .part
    height: 100%

  .part.p1
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column
    .title-area
      flex: 8
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
  img
    width: initial
  .title
    width: 90%
    max-width: 550px
  img
    display: block
</style>
