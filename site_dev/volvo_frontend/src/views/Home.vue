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
    this.setLoading(true)
    setTimeout(()=>{
      this.setLoading(false)
    },5000)

  },
  computed:{
    ...mapMutations(['setLoading'])
  }
}
</script>
