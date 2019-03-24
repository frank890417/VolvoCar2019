import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    setLoading(state,val){
      state.loading= val
    }
  },
  actions: {

  }
})
