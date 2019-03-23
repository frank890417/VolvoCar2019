<template lang="pug">
  .hello
    section(v-for="(scene,sceneId) in scenes")
      h2 {{scene.title}}
      .img-layers
        img(v-for="(layer,layerId) in scene.layers",
            :src="layer", 
            :style="{'z-index': layerId, 'animation-delay': layerId+'s', 'transform': 'translateY('+getPan(sceneId,layerId)+'px)'}",
            :class="{wow: true, 'zoomIn': layer.indexOf('對白')!=-1}")
        
    //- <h1>{{ msg }}</h1>
    
    //- <p>
    //-   For a guide and recipes on how to configure / customize this project,<br>
    //-   check out the
    //-   <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    //- </p>
    //- <h3>Installed CLI Plugins</h3>
    //- <ul>
    //-   <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    //- </ul>
    //- <h3>Essential Links</h3>
    //- <ul>
    //-   <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
    //-   <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
    //-   <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
    //-   <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
    //-   <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    //- </ul>
    //- <h3>Ecosystem</h3>
    //- <ul>
    //-   <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
    //-   <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
    //-   <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
    //-   <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
    //-   <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    //- </ul>
  //- </div>
</template>

<script>
import WOW from 'wow.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    new WOW().init();
    window.addEventListener("scroll",()=>{
      this.scrollY=window.scrollY
    })
  },
  methods: {
    getPan(sceneId, layerId){
      if (layerId==0){
        return 0
      }
      return (this.scrollY- this.sectionHeight * (parseInt(sceneId)-0.3) ) /(layerId+5) 
    }
  },
  data(){
    return {
      scrollY: 0,
      sectionHeight: window.outerWidth/1920*1080 ,
      scenes: [
        {
          title: "A01",
          layers: ["A/A01/A01.png"]
        },{
          title: "A02",
          layers: ["A/A02/A02_bg.png","A/A02/A02_man.png"]
        },{
          title: "A03",
          layers: ["A/A03/A03_bg.png","A/A03/A03_man.png"]
        },
        {
          title: "B01",
          layers: ["B/B01/B01.png"]
        },{
          title: "B02",
          layers: ["B/B02/B02.png"]
        },{
          title: "B03",
          layers: ["B/B03/B03.png"]
        },{
          title: "B04",
          layers: ["B/B04/B04.png"]
        },
        {
          title: "C01",
          layers: ["C/C01/C01_bg.png","C/C01/C01_fire.png","C/C01/C01_man.png","C/C01/C01_speedline.png",]
        },{
          title: "C02",
          layers: ["C/C02/C02_bg.png","C/C02/C02_man.png"]
        },{
          title: "C03",
          layers: ["C/C03/C03_bg.png","C/C03/C03_car.png","C/C03/C03_man.png",]
        },{
          title: "C04",
          layers: ["C/C04/C04.png","C/C04/C04_對白.png"]
        },{
          title: "C05",
          layers: ["C/C05/C05.png","C/C05/C05_對白.png"]
        },

        {
          title: "D01",
          layers: ["D/D01/D01.png"]
        },{
          title: "D02",
          layers: ["D/D02/D02.png"]
        },{
          title: "D03",
          layers: ["D/D03/D03.png"]
        },{
          title: "D04",
          layers: ["D/D04/D04_bg.png","D/D04/D04_car.png"]
        },

        {
          title: "E01",
          layers: ["E/E01/E01_bg.png","E/E01/E01_bike.png","E/E01/E01_對白.png"]
        },

        {
          title: "E02_bg_v2",
          layers: ["E/E02/E02_bg_v2.jpg","E/E02/E02_dialog_a.png","E/E01/E02_dialog_b.png"]
        },


      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
img
  max-width: 100%
.img-layers
  position: relative
  overflow: hidden
  img
    position: absolute
    left: 0
    top: 0
  img:first-child
    position: relative
section
  border: solid 1px blue
  position: relative
  background-color: #222
  // padding-bottom: calc(1080/1920*100%)
  h2
    padding: 10px 30px
    position: relative
    z-index: 10000
    background-color: #222
    color: white
    position: absolute
    top: 30px
    left: 30px
</style>
