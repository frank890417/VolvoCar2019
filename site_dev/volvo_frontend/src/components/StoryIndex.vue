<template lang="pug">
  .hello

    .currentSection(v-if="debug")
      span {{currentSection}}
      br
      span {{ scrollY}}
    
    //- h3 {{sectionPositionList}}
    section(v-for="(scene,sceneId) in scenes",
            :ref=" 'sceneObj'+sceneId ",
            :id="'sec_'+sceneId" )
      h2 {{scene.title}}
      .img-layers
        .img-layer(
          v-for="(layer,layerId) in scene.layers",
          :style="{'z-index': layerId,'transform': 'translateY('+getPan(layer,sceneId,layerId)+'px) scale('+(layerId==0?1:1.05)+')', 'filter': 'brightness('+(1-0.1/layerId)+')' }")
          img.wow(
              :src="layer", 
              :style="{ 'animation-delay': layerId+'s' }",
              :class="getLayerClass(layer,layerId)")
      //- div(v-if="scene && scene.audios")
      //-   audio( v-for="audioSrc in scene.audios" :volume="0.1" :autoplay="currentPreSection===scene?true:false" preload)
      //-       source( :src="audioSrc")

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
import {mapState} from 'vuex'
import {TweenMax} from 'gsap'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    new WOW().init();
    this.scrollY=window.scrollY
    window.addEventListener("scroll",()=>{
      this.scrollY=window.scrollY
      this.getSectionHeightList()
    })
    setTimeout(()=>{
      this.$forceUpdate()
      this.getSectionHeightList()
    // document.getElementById("bgsound").volume=0.6
    // document.getElementById("bgsound").play()
    },500)
    // console.log(this.$refs.sceneObj2)
  },
  methods: {
    getPan(layer, sceneId, layerId){
      if (layerId==0) return 0
      // if (layer.indexOf('對白')!=-1 || layer.indexOf('dialog')!=-1 ) return 0
      let layerPan = -(this.scrollY- (this.sectionPositionList[sceneId] + window.outerHeight*0.7) ) /(-layerId+5) 
      return layerPan
    },
    getLayerClass(layer,layerId){
      return {
        wow: true, 
        zoomIn: layer.indexOf('對白')!=-1 || layer.indexOf('dialog')!=-1,
        slideInRight: layer.indexOf('A02_man')!=-1 || layer.indexOf('I02_box')!=-1 ,
        slideInBottom: layer.indexOf('D04_car')!=-1,
        // pulse: layer.indexOf('C01_fire')!=-1,
        frontItem: layerId!=0
      }
    },
    getSectionHeightList(){
      this.sectionHeightList= this.scenes.map((d,i)=>{
        let element = document.getElementById('sec_' + i)
        let offsetTop = 0
        if (element){
          offsetTop = element.offsetHeight
        }
        return offsetTop
      })
    },
  },
  computed: {
    ...mapState(['debug']),
    currentSection(){
      let hList = this.sectionPositionList
      if (hList){
        for(var i=0;i<hList.length;i++){
          if (this.scrollY<hList[i]){
            return this.scenes[i-1]
          }
        }

      }
      return null
    },
    //提前播放音訊用
    currentPreSection(){
      let hList = this.sectionPositionList
      if (hList){
        for(var i=0;i<hList.length;i++){
          if (this.scrollY+300<hList[i]){
            return this.scenes[i-1]
          }
        }

      }
      return null
    },
    sectionPositionList(){
      return this.sectionHeightList.reduce((obj,i)=>{
        obj.lastHeight= parseInt(obj.all.slice(-1)) || 0
        obj.all.push( obj.lastHeight + i)
        return obj
      },{lastHeight: 0, all: [0]}).all
    }

  },
  watch:{
    currentPreSection(pre,post){
      if (!pre || !post) return 
      if ( pre.title != post.title && this.currentPreSection.audios){
        this.currentPreSection.audios.forEach(audioSrc=>{
          let a = new Audio(audioSrc)
          console.log(audioSrc)
          a.volume=0.5
          a.play()
          this.audioElList.push({
            scene: this.currentPreSection,
            element: a,
            paused: false
          })
        })
      }
      this.audioElList.forEach(audioItem=>{
        if (audioItem.scene!==this.currentPreSection && audioItem.scene!==this.currentSection && !audioItem.paused){
          audioItem.paused=true
          TweenMax.to(audioItem.element,1,{volume:0})
          setTimeout(()=>{
            audioItem.element.pause()
          },1000)
        }
      })
    }
  },
  data(){
    return {
      sectionHeightList: [],
      audioElList: [],
      scrollY: 0,
      sectionHeight: window.outerWidth/1920*1080 ,
      scenes: [
        {
          title: "A01",
          layers: ["A/A01/A01.png"],
          audios: ["Audio/explode.wav"]
        },{
          title: "A02",
          layers: ["A/A02/A02_bg.png","A/A02/A02_man.png"],
          audios: ["Audio/evillaugh.mp3"]
        },{
          title: "A03",
          layers: ["A/A03/A03_bg.png","A/A03/A03_man.png"],
          audios: ["Audio/cardoor.wav"]
        },
        {
          title: "B01",
          layers: ["B/B01/B01.png"]
        },{
          title: "B02",
          layers: ["B/B02/B02.png"],
          audios: ["Audio/datasound.wav"]
        },{
          title: "B03",
          layers: ["B/B03/B03.png"],
          audios: ["Audio/cheer.mp3"]
        },{
          title: "B04",
          layers: ["B/B04/B04.png"]
        },
        {
          title: "C01",
          layers: ["C/C01/C01_bg.png","C/C01/C01_fire.png","C/C01/C01_man.png","C/C01/C01_speedline.png",],
          audios: ["Audio/hey.wav"]
        },{
          title: "C02",
          layers: ["C/C02/C02_bg.png","C/C02/C02_man.png"],
          audios: ["Audio/evillaugh.mp3"]
        },{
          title: "C03",
          layers: ["C/C03/C03_bg.png","C/C03/C03_car.png","C/C03/C03_man.png",]
        },{
          title: "C04",
          layers: ["C/C04/C04.png","C/C04/C04_對白.png"],
          audios: ["Audio/seatbelt.wav"]
        },{
          title: "C05",
          layers: ["C/C05/C05.png","C/C05/C05_對白.png"],
          audios: ["Audio/engine_car.wav"]
        },

        {
          title: "D01",
          layers: ["D/D01/D01.png"],
          audios: ["Audio/busycity.wav"]
        },{
          title: "D02",
          layers: ["D/D02/D02.png"],
          audios: ["Audio/car_stopping.wav"]
        },{
          title: "D03",
          layers: ["D/D03/D03.png"],
          audios: ["Audio/car_crash.wav"]
        },{
          title: "D04",
          layers: ["D/D04/D04_bg.png","D/D04/D04_car.png"]
        },

        {
          title: "E01",
          layers: ["E/E01/E01_bg.png","E/E01/E01_bike.png","E/E01/E01_對白.png"]
        },

        {
          title: "E02",
          layers: ["E/E02/E02_bg_v2.jpg","E/E02/E02_dialog_a.png","E/E01/E02_dialog_b.png"]
        },

        {
          title: "F01",
          layers: ["F/F01/F01_bg.png","F/F01/F01_對白.png"]
        },
        {
          title: "F02",
          layers: ["F/F02/F02.png"]
        },
        {
          title: "F03",
          layers: ["F/F03/F03.png"],
          audios: ["Audio/gun2.mp3"]
        },
        {
          title: "F04",
          layers: ["F/F04/F04.png"]
        },


        {
          title: "G01",
          layers: ["G/G01/G01.png","G/G01/G01_對白.png"]
        },
        {
          title: "G02",
          layers: ["G/G02/G02.png","G/G02/G02_car_1.png","G/G02/G02_car_2.png"],
          audios: ["Audio/carspeedup.wav"]
        },
        {
          title: "G03",
          layers: ["G/G03/G03.png","G/G03/G03_car.png"],
          audios: ["Audio/carspeedup.wav"]
        },
        {
          title: "G04",
          layers: ["G/G04/G04.png","G/G04/G04_對白.png"]
        },


        {
          title: "H01",
          layers: ["H/H01/H01.png"],
          audios: ["Audio/gun.mp3"]
        },
        {
          title: "H02",
          layers: ["H/H02/H02_bg.png"],
          audios: ["Audio/car_stopping.wav"]
        },
        {
          title: "H02",
          layers: ["H/H03/H03.jpg","H/H03/H03_dialog_a.png"],
          audios: ['Audio/evillaugh.mp3']
        },
        {
          title: "H04",
          layers: ["H/H04/H04_v3.jpg"],
          audios: ["Audio/carspeedup.wav"]
        },
        {
          title: "H05",
          layers: ["H/H05/H05_bg.jpg","H/H05/H05_dialog_a.png","H/H05/H05_dialog_b.png"],
          audios: ["Audio/beep.wav"]
        },


        {
          title: "I01",
          layers: ["I/I01/I01.png"],
          audios: ["Audio/gun.mp3"]
        },
        {
          title: "I02",
          layers: ["I/I02/I02.jpg","I/I02/I02_box.png"],
          audios: ["Audio/gun.mp3","Audio/car_crash.wav"]
        },
        {
          title: "I03",
          layers: ["I/I03/I03.png"]
        },
        {
          title: "I04",
          layers: ["I/I04/I04.png"],
          audios: ["Audio/car_stopping.wav"]
        },
        {
          title: "I05",
          layers: ["I/I05/I05.png"],
          audios: ["Audio/carcrash2.wav"]
        },
        {
          title: "I06",
          layers: ["I/I06/I06_bg.jpg","I/I06/I06_man.png"],
          audios: ["Audio/car_crash.wav"]
        },
        {
          title: "I07",
          layers: ["I/I07/I07_bg.jpg","I/I07/I07_villan.png"]
        },
        {
          title: "I09",
          layers: ["I/I09/I09.jpg","I/I09/I09_保護文字.png"]
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
  width: 100%
.img-layers
  position: relative
  overflow: hidden
  .img-layer
    position: absolute
    left: 0
    top: 0
  .img-layer:first-child
    position: relative
section
  // border: solid 1px blue
  position: relative
  background-color: #222
  // padding-bottom: calc(1080/1920*100%)
  h2
    padding: 5px 20px
    position: relative
    font-size: 15px
    // border: solid 2px white
    // box-shadow: 0px 0px 5px black
    z-index: 10000
    background-color: #000
    color: white
    position: absolute
    top: 10px
    left: 20px
.currentSection
  position: fixed
  top: 10px
  left: 10px
  background-color: yellow
  color: black
  padding: 2px 10px
  z-index: 1000
</style>
