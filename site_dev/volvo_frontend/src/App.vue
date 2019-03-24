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
    </div>
    <transition name="fade" mode="out-in">
      <router-view :key= "$route.path" />
    </transition>
  </div>
</template>
<script>
import Loading from './views/Loading'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {}    
  },
  components: {Loading},
  mounted(){
    this.setLoading(true)
    setTimeout(()=>{
      this.setLoading(false)
    },5000)

  },
  computed:{
    ...mapState(['loading'])
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
