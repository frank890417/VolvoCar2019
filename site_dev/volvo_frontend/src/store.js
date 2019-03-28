import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    debug: false
  },
  mutations: {
    setLoading(state,val){
      state.loading= val
    },
    setDebug(state,val){
      state.debug= val
    }
  },
  actions: {
    
  }
})
