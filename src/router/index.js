import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Importar todas las vistas
 */
import Inscriptions from '../views/inscriptions/inscriptions.uve'
  

Vue.use(VueRouter)

const routes = [
  /**
   * Declarar las rutas para cada vista
   */
  {
    path: '/',
    name: 'inscriptions',
    component: Inscriptions
  }

]

/**
 * Exportar las rutas
 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
