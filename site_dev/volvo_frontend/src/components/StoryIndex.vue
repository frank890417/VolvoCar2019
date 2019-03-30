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

      div(v-if="scene.type=='game' && scene.title=='Game1'", @click="refGroup['1'].start()")
        Game1(ref="game1")
      div(v-if="scene.type=='game' && scene.title=='Game2'",  @click="refGroup['2'].start()")
        Game2(ref="game2")
      div(v-if="scene.type=='game' && scene.title=='Game3'", @click="refGroup['3'].start()")
        Game3(ref="game3")
        
      div(v-else)
        h2 {{scene.title}}
        .img-layers
          .img-layer(
            v-for="(layer,layerId) in scene.layers",
            :style="getLayerStyle(getLayerObject(layer),layerId,scene,sceneId)",
            )
            img.wow(
                :src="getLayerObject(layer).src", 
                :style="{ 'animation-delay': layerId/2+'s' }",
                :class="getLayerClass(getLayerObject(layer),layerId)",
                :title="getLayerObject(layer).src")
          
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
import sceneData from '../sceneData.js'
import Game1 from './Game1'
import Game2 from './Game2'
import Game3 from './Game3'

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

      console.log("Init game")
      // console.log(this.refGroup)
      // init game 
      this.$set(this,'refGroup',{
        '1': this.$refs.game1[0],
        '2': this.$refs.game2[0],
        '3': this.$refs.game3[0]
      })
      console.log(this.refGroup)
      
      setTimeout(()=>{
       this.loadGame();

      },2000)


    },500)

    $( "body" ).keydown(function(e) {
        let k = e.keyCode;
        if(k==65){
          for(let i=1;i<=3;i++){
            this.refGroup[i].resetData();
          }
        }
    });
    // console.log(this.$refs.sceneObj2)
  },
  components: {
    Game1,Game2,Game3
  },
  methods: {

    //根據塗層跟資料算出應該要的偏移量
    getTransform(layer, sceneId, layerId){
      if (layerId==0) return 0
      if (layer.src.indexOf('speedline')!=-1 ) return 0
      if (layer.src.indexOf('dialog')!=-1) return 0.4
      
      //滾動位置跟這個區塊的相對差距
      let delta = (this.scrollY- (this.sectionPositionList[sceneId] + window.outerHeight*0.6) ) * 0.95

      //滾動位置佔區塊的百分比
      let deltaPercent = ((this.scrollY- this.sectionPositionList[sceneId]) / (this.sectionHeightList[sceneId] || 0) )

      let layerPanX = layer.getPanX ? layer.getPanX(delta,deltaPercent): 0
      let layerPanY = layer.getPanY ? layer.getPanY(delta,deltaPercent): (-delta/(-layerId*0.6+5) )
      let layerScale = layer.getScale? layer.getScale(delta,deltaPercent):  (layerId==0?1:1.03)
      
      return {x: layerPanX,y: layerPanY, scale: layerScale}
    },
    getLayerStyle(layer,layerId,scene,sceneId){
      let trans = this.getTransform(layer,sceneId,layerId)
      return {
        'z-index': layerId,
        'transform': 'scale('+trans.scale+') translate('+trans.x+'px,'+trans.y+'px)',
        
      }
    },

    //根據資料算出應該要加的class
    getLayerClass(layer,layerId){
      let addClasses = layer.class?layer.classes:[]
      let result = {
        wow: true, 
        zoomIn: layer.src.indexOf('dialog')!=-1 || layer.src.indexOf('explode')!=-1,
        tada: layer.src.indexOf('C01_speedline')!=-1,
        slideInRight: layer.src.indexOf('A02_man')!=-1 || layer.src.indexOf('I02_box')!=-1 || layer.src.indexOf('I06_man')!=-1,
        slideInBottom: layer.src.indexOf('D04_car')!=-1,
        frontItem: layerId!=0,
       
      }
      addClasses.forEach(cls=>result[cls]=true)
      return result
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
    getLayerObject(obj){
      if (typeof obj == "string"){
        return {
          src: obj
        }
      }
      return obj
      
    },
    loadGame(){
      
      this.refGroup['1'].loadAsset(()=>{
        this.refGroup['1'].setUp(`.game1 .game-container`);
        this.refGroup['2'].setUp(`.game2 .game-container`);
        this.refGroup['3'].setUp(`.game3 .game-container`);
      });

     
      
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

      
      
      if ( pre.title != post.title ){
        if (post.type=="game") {
          // return;
          if (post.title=="Game1"  ){
            console.log("遊戲一開始");
            this.gameStatus['1']=true
            this.gameStatus['2']=false
            this.gameStatus['3']=false
            this.refGroup['1'].resetData();
            this.refGroup['1'].start();
            // this.refGroup['1'].loadAsset(()=>{
            //   this.refGroup['1'].setUp(`.game${'1'} .game-container`);
            //   this.refGroup['1'].start()
            // });
          }
          if (post.title=="Game2"  ){
            console.log("遊戲二開始");
            this.gameStatus['2']=true
            this.gameStatus['1']=false
            this.gameStatus['3']=false
            this.refGroup['2'].resetData();
            this.refGroup['2'].start();
            // this.refGroup['2'].loadAsset(()=>{
            //   this.refGroup['2'].setUp(`.game${'2'} .game-container`);
            //   this.refGroup['2'].start()
            // });
          }
          if (post.title=="Game3" ){
            console.log("遊戲三開始");
            this.gameStatus['3']=true
            this.gameStatus['2']=false
            this.gameStatus['1']=false
            this.refGroup['3'].resetData();
            this.refGroup['3'].start();
            // this.refGroup['3'].loadAsset(()=>{
            //   this.refGroup['3'].setUp(`.game${'3'} .game-container`);
            //   this.refGroup['3'].start()
            // });
          }
        }

      }
    },
    currentSection(pre, post){
    }
  },
  data(){
    return {
      sectionHeightList: [],
      audioElList: [],
      scrollY: 0,
      sectionHeight: window.outerWidth/1920*1080 ,
      scenes: sceneData.scenes,
      refGroup: {},
      gameStatus: {'1': false,'2': false,'3':false}
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
    transform-origin: center center
  .img-layer:first-child
    position: relative
section
  // border: solid 1px blue
  position: relative
  // background-color: #fff
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
