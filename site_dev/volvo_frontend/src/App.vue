<template>
  <div id="app" :class="{loading: loading}">
    <!-- <HelloWorld></HelloWorld> -->
    <transition name="fade">
      <Loading v-if="loading"></Loading>
    </transition>
    <div id="nav">
      <router-link to="/">首頁</router-link>
      <router-link to="/about">活動辦法</router-link>
      <router-link to="/award">得獎公告</router-link>
      <router-link to="/game">遊戲測試</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :key= "$route.path" />
    </transition>
  </div>
</template>
<script>
import Loading from './views/Loading'
import {mapState,mapMutations} from 'vuex'
import sceneData from './sceneData.js'
import preloader from 'monoame-preloader'
export default {
  data() {
    return {}    
  },
  components: {Loading},
  mounted(){
    let counter = 0
    var startGame = ()=>{
      this.setLoading(false)
      let a = new Audio("Audio/explode.wav")
      a.play()
      clearInterval(c)

    }
    var c = setInterval(()=>{
      counter++
      if (counter>10 ){
        startGame()
      }
    },10)

    this.setLoading(true)
    let pics = sceneData.scenes.map(item=>(item.layers || []).concat(item.audios || []) ).reduce((all,item)=>[...all,...item],[]).map(k=>typeof k !="string"?k.src:k)
    pics = pics.filter((d,i,arr)=>arr.indexOf(d)==i)
    console.log(pics)
    preloader.load(pics).then(()=>{
      console.log("image all preloaded!")
      if (counter>5){
        startGame()
      }else{
        setTimeout(()=>{
          startGame()

        },1000*(5-counter))
      }
    }).catch((t)=>{
      console.warn(t)
      console.log("image preload fail.")
    })
  },
  computed:{
    ...mapState(['loading','debug'])
  },
  methods:{
    ...mapMutations(['setLoading'])
  }
}
</script>
<style lang="sass">
html,body
  width: 100%
  margin: 0
  overflow-x: hidden

a
  cursor: pointer
.page
  .jumbotron
    min-height: 70vh
@for $i from 1 through 100
  .ani-delay-#{$i}
    animation-delay: $i*0.1s
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0
.loading
  overflow: hidden
  height: 100vh
#nav
  position: absolute
  background-color: black
  z-index: 5000
  color: white
  right: 10px
  top: 10px
  a
    display: inline-block
    color: white
    padding: 15px 30px
</style>
