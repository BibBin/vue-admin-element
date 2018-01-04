import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
Vue.use(ElementUI)

// register global utility filters.
import * as filters from './filters' // 全局filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//import echarts from 'echarts' //有需要可以开启全局加载echarts
//Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
