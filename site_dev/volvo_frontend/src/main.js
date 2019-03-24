import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "../node_modules/animate.css/animate.min.css"
import "wow.js"

import softscroll from 'monoame-softscroll'
softscroll.init()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
