
/**
 * Importar todas las librerias
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
//bootstrap , IconsPlugin
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Datatable
import { VuejsDatatableFactory } from 'vuejs-datatable';
//general css
import "@/assets/css/general.css";

/**
 * Usar librerias
 */
 Vue.use(VueAxios, axios)
 Vue.use(VuejsDatatableFactory);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
