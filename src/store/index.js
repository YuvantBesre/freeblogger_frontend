import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from "./modules/SnackBar"
import mainStore from "./modules/MainStore"

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced : true,
  modules : {
    snackBar,
    mainStore
  }
})
