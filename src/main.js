import Vue from 'vue'
import App from './App.vue'
import uView from "uview-ui";
// 引入全局uView
Vue.use(uView)

Vue.config.productionTip = false

new App().$mount()