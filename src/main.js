import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import GlobalMixins from "./mixins/GlobalMixins"

Vue.config.productionTip = false

// EVENT BUS
export const eventBus = new Vue();

// GLOBAL MIXINS
Vue.mixin(GlobalMixins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
