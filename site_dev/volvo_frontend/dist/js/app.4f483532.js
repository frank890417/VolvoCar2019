(function(t){function e(e){for(var a,o,r=e[0],l=e[1],u=e[2],d=0,g=[];d<r.length;d++)o=r[d],i[o]&&g.push(i[o][0]),i[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);c&&c(e);while(g.length)g.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},i={app:0},s=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var c=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0cfb":function(t,e,n){},"20bd":function(t,e,n){"use strict";var a=n("ad72"),i=n.n(a);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{loading:t.loading},attrs:{id:"app"}},[n("transition",{attrs:{name:"fade"}},[t.loading?n("Loading"):t._e()],1),n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("首頁")]),n("router-link",{attrs:{to:"/about"}},[t._v("活動辦法")]),n("router-link",{attrs:{to:"/award"}},[t._v("得獎公告")])],1),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view",{key:t.$route.path})],1)],1)},s=[],o=n("cebc"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page loading"},[n("div",{staticClass:"jumbotron fadeIn animated ani-delay-5",style:{"background-image":"url(_loading/loading_首頁.png)"}},[n("div",{staticClass:"part p1"},[n("div",{staticClass:"title-area"},[n("img",{staticClass:"title fadeIn animated ani-delay-15 mt-5",attrs:{src:"_loading/volvo_laoding_v2_safety guardian.png"}}),n("img",{staticClass:"fadeIn animated ani-delay-15 mt-5",staticStyle:{width:"450px"},attrs:{src:"_loading/volvo_laoding_v2_loadingbar.png"}}),n("img",{staticClass:"fadeIn animated ani-delay-15 mt-3",staticStyle:{width:"200px"},attrs:{src:"_loading/volvo_laoding_v2_loading.png"}})]),n("div",[n("img",{staticClass:"fadeIn animated ani-delay-15",staticStyle:{width:"400px"},attrs:{src:"_loading/volvo_laoding_v2_explain.png"}})])])])])},l=[],u={mounted:function(){}},c=u,d=(n("20bd"),n("2877")),g=Object(d["a"])(c,r,l,!1,null,null,null),p=g.exports,f=n("2f62"),_={data:function(){return{}},components:{Loading:p},mounted:function(){var t=this;this.setLoading(!0),setTimeout(function(){t.setLoading(!1)},5e3)},computed:Object(o["a"])({},Object(f["c"])(["loading"])),methods:Object(o["a"])({},Object(f["b"])(["setLoading"]))},v=_,m=(n("cf25"),Object(d["a"])(v,i,s,!1,null,null,null)),h=m.exports,b=n("8c4f"),y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("StoryIndex")],1)},C=[],w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[t.debug?n("div",{staticClass:"currentSection"},[n("span",[t._v(t._s(t.currentSection))]),n("br"),n("span",[t._v(t._s(t.scrollY))])]):t._e(),t._l(t.scenes,function(e,a){return n("section",{ref:"sceneObj"+a,refInFor:!0,attrs:{id:"sec_"+a}},[n("h2",[t._v(t._s(e.title))]),n("div",{staticClass:"img-layers"},t._l(e.layers,function(e,i){return n("div",{staticClass:"img-layer",style:{"z-index":i,transform:"translateY("+t.getPan(e,a,i)+"px) scale("+(0==i?1:1.05)+")",filter:"brightness("+(1-.1/i)+")"}},[n("img",{staticClass:"wow",class:t.getLayerClass(e,i),style:{"animation-delay":i+"s"},attrs:{src:e}})])}),0)])})],2)},I=[],A=n("e814"),H=n.n(A),E=n("4a26"),j=n.n(E),x=n("cffa"),G={name:"HelloWorld",props:{msg:String},mounted:function(){var t=this;(new j.a).init(),this.scrollY=window.scrollY,window.addEventListener("scroll",function(){t.scrollY=window.scrollY,t.getSectionHeightList()}),setTimeout(function(){t.$forceUpdate(),t.getSectionHeightList()},500)},methods:{getPan:function(t,e,n){if(0==n)return 0;var a=-(this.scrollY-(this.sectionPositionList[e]+.7*window.outerHeight))/(5-n);return a},getLayerClass:function(t,e){return{wow:!0,zoomIn:-1!=t.indexOf("對白")||-1!=t.indexOf("dialog"),slideInRight:-1!=t.indexOf("A02_man")||-1!=t.indexOf("I02_box"),slideInBottom:-1!=t.indexOf("D04_car"),frontItem:0!=e}},getSectionHeightList:function(){this.sectionHeightList=this.scenes.map(function(t,e){var n=document.getElementById("sec_"+e),a=0;return n&&(a=n.offsetHeight),a})}},computed:Object(o["a"])({},Object(f["c"])(["debug"]),{currentSection:function(){var t=this.sectionPositionList;if(t)for(var e=0;e<t.length;e++)if(this.scrollY<t[e])return this.scenes[e-1];return null},currentPreSection:function(){var t=this.sectionPositionList;if(t)for(var e=0;e<t.length;e++)if(this.scrollY+300<t[e])return this.scenes[e-1];return null},sectionPositionList:function(){return this.sectionHeightList.reduce(function(t,e){return t.lastHeight=H()(t.all.slice(-1))||0,t.all.push(t.lastHeight+e),t},{lastHeight:0,all:[0]}).all}}),watch:{currentPreSection:function(t,e){var n=this;t&&e&&(t.title!=e.title&&this.currentPreSection.audios&&this.currentPreSection.audios.forEach(function(t){var e=new Audio(t);console.log(t),e.volume=.5,e.play(),n.audioElList.push({scene:n.currentPreSection,element:e,paused:!1})}),this.audioElList.forEach(function(t){t.scene===n.currentPreSection||t.scene===n.currentSection||t.paused||(t.paused=!0,x["TweenMax"].to(t.element,1,{volume:0}),setTimeout(function(){t.element.pause()},1e3))}))}},data:function(){return{sectionHeightList:[],audioElList:[],scrollY:0,sectionHeight:window.outerWidth/1920*1080,scenes:[{title:"A01",layers:["A/A01/A01.png"],audios:["Audio/explode.wav"]},{title:"A02",layers:["A/A02/A02_bg.png","A/A02/A02_man.png"],audios:["Audio/evillaugh.mp3"]},{title:"A03",layers:["A/A03/A03_bg.png","A/A03/A03_man.png"],audios:["Audio/cardoor.wav"]},{title:"B01",layers:["B/B01/B01.png"]},{title:"B02",layers:["B/B02/B02.png"],audios:["Audio/datasound.wav"]},{title:"B03",layers:["B/B03/B03.png"],audios:["Audio/cheer.mp3"]},{title:"B04",layers:["B/B04/B04.png"]},{title:"C01",layers:["C/C01/C01_bg.png","C/C01/C01_fire.png","C/C01/C01_man.png","C/C01/C01_speedline.png"],audios:["Audio/hey.wav"]},{title:"C02",layers:["C/C02/C02_bg.png","C/C02/C02_man.png"],audios:["Audio/evillaugh.mp3"]},{title:"C03",layers:["C/C03/C03_bg.png","C/C03/C03_car.png","C/C03/C03_man.png"]},{title:"C04",layers:["C/C04/C04.png","C/C04/C04_對白.png"],audios:["Audio/seatbelt.wav"]},{title:"C05",layers:["C/C05/C05.png","C/C05/C05_對白.png"],audios:["Audio/engine_car.wav"]},{title:"D01",layers:["D/D01/D01.png"],audios:["Audio/busycity.wav"]},{title:"D02",layers:["D/D02/D02.png"],audios:["Audio/car_stopping.wav"]},{title:"D03",layers:["D/D03/D03.png"],audios:["Audio/car_crash.wav"]},{title:"D04",layers:["D/D04/D04_bg.png","D/D04/D04_car.png"]},{title:"E01",layers:["E/E01/E01_bg.png","E/E01/E01_bike.png","E/E01/E01_對白.png"]},{title:"E02",layers:["E/E02/E02_bg_v2.jpg","E/E02/E02_dialog_a.png","E/E01/E02_dialog_b.png"]},{title:"F01",layers:["F/F01/F01_bg.png","F/F01/F01_對白.png"]},{title:"F02",layers:["F/F02/F02.png"]},{title:"F03",layers:["F/F03/F03.png"],audios:["Audio/gun2.mp3"]},{title:"F04",layers:["F/F04/F04.png"]},{title:"G01",layers:["G/G01/G01.png","G/G01/G01_對白.png"]},{title:"G02",layers:["G/G02/G02.png","G/G02/G02_car_1.png","G/G02/G02_car_2.png"],audios:["Audio/carspeedup.wav"]},{title:"G03",layers:["G/G03/G03.png","G/G03/G03_car.png"],audios:["Audio/carspeedup.wav"]},{title:"G04",layers:["G/G04/G04.png","G/G04/G04_對白.png"]},{title:"H01",layers:["H/H01/H01.png"],audios:["Audio/gun.mp3"]},{title:"H02",layers:["H/H02/H02_bg.png"],audios:["Audio/car_stopping.wav"]},{title:"H02",layers:["H/H03/H03.jpg","H/H03/H03_dialog_a.png"],audios:["Audio/evillaugh.mp3"]},{title:"H04",layers:["H/H04/H04_v3.jpg"],audios:["Audio/carspeedup.wav"]},{title:"H05",layers:["H/H05/H05_bg.jpg","H/H05/H05_dialog_a.png","H/H05/H05_dialog_b.png"],audios:["Audio/beep.wav"]},{title:"I01",layers:["I/I01/I01.png"],audios:["Audio/gun.mp3"]},{title:"I02",layers:["I/I02/I02.jpg","I/I02/I02_box.png"],audios:["Audio/gun.mp3","Audio/car_crash.wav"]},{title:"I03",layers:["I/I03/I03.png"]},{title:"I04",layers:["I/I04/I04.png"],audios:["Audio/car_stopping.wav"]},{title:"I05",layers:["I/I05/I05.png"],audios:["Audio/carcrash2.wav"]},{title:"I06",layers:["I/I06/I06_bg.jpg","I/I06/I06_man.png"],audios:["Audio/car_crash.wav"]},{title:"I07",layers:["I/I07/I07_bg.jpg","I/I07/I07_villan.png"]},{title:"I09",layers:["I/I09/I09.jpg","I/I09/I09_保護文字.png"]}]}}},O=G,L=(n("ad66"),Object(d["a"])(O,w,I,!1,null,"ee1d48b8",null)),S=L.exports,D={name:"home",components:{StoryIndex:S},mounted:function(){var t=this;this.setLoading(!0),setTimeout(function(){var t=new Audio("Audio/guilt.wav");t.volume=.6,t.play()},2e3),setTimeout(function(){t.setLoading(!1);var e=new Audio("Audio/explode.wav");e.play()},5e3)},methods:Object(o["a"])({},Object(f["b"])(["setLoading"]))},F=D,B=Object(d["a"])(F,y,C,!1,null,null,null),P=B.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page about"},[n("section",{staticClass:"jumbotron",style:{"background-image":"url(_loading/loading_首頁.png)"}}),t._m(0)])},$=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"content"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("h1",{staticClass:"text-center"},[t._v("活動辦法")])])])])])}],Y={},T=Y,M=Object(d["a"])(T,k,$,!1,null,null,null),z=M.exports,J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page award"},[n("section",{staticClass:"jumbotron",style:{"background-image":"url(_loading/loading_首頁.png)"}}),t._m(0)])},W=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"content"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12"},[n("h1",{staticClass:"text-center"},[t._v("得獎公告")])])])])])}],R={},U=R,q=Object(d["a"])(U,J,W,!1,null,null,null),K=q.exports;a["a"].use(b["a"]);var N=new b["a"]({routes:[{path:"/",name:"home",component:P},{path:"/about",name:"about",component:z},{path:"/award",name:"award",component:K}]});a["a"].use(f["a"]);var Q=new f["a"].Store({state:{loading:!0,debug:!1},mutations:{setLoading:function(t,e){t.loading=e},setDebug:function(t,e){t.debug=e}},actions:{}}),V=(n("4b3c"),n("ab8b"),n("8251"));V["a"].init(),a["a"].config.productionTip=!1,new a["a"]({router:N,store:Q,render:function(t){return t(h)}}).$mount("#app"),window.addEventListener("keydown",function(t){68==t.keyCode&&(Q.commit("setDebug",!Q.state.debug),console.log(Q.state.debug))})},ad66:function(t,e,n){"use strict";var a=n("fe8a"),i=n.n(a);i.a},ad72:function(t,e,n){},cf25:function(t,e,n){"use strict";var a=n("0cfb"),i=n.n(a);i.a},fe8a:function(t,e,n){}});
//# sourceMappingURL=app.4f483532.js.map