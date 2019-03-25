<template lang="pug">
  div.home
    StoryIndex
</template>

<script>
// @ is an alias to /src
import StoryIndex from '@/components/StoryIndex.vue'

import {mapState,mapMutations} from 'vuex'
export default {
  name: 'home',
  components: {
    StoryIndex
  },
  mounted(){
    // this.setLoading(true)
    setTimeout(()=>{
      
      let a = new Audio("Audio/guilt.wav")
      a.volume=0.1
      a.play()
    },2000)
    setTimeout(()=>{
      // this.setLoading(false) 
      let a = new Audio("Audio/explode.wav")
      a.play()
    },5000)
   

  },
  methods:{
    ...mapMutations(['setLoading'])
  }
}
</script>
