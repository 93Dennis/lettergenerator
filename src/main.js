import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false

Vue.use(VueClipboard);
Vue.use(VueScrollTo, {
  offset: -65
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
