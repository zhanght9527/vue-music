import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/js/font'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
