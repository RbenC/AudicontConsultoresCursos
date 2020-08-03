import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/opiniones',
    name: 'Opiniones',
    component: () => import(/* webpackChunkName: "opiniones" */ '../views/Opiniones.vue')
  },
  {
    path: '/misfavoritos',
    name: 'MisFavoritos',
    component: () => import(/* webpackChunkName: "misfavoritos" */ '../views/MisFavoritos.vue')
  },
  {
    path: '/miscursos',
    name: 'MisCursos',
    component: () => import(/* webpackChunkName: "miscursos" */ '../views/MisCursos.vue')
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: () => import(/* webpackChunkName: "administracion" */ '../views/Administracion.vue')
  },
  {
    path: '/administracionacceso',
    name: 'AdministacionAcceso',
    component: () => import(/* webpackChunkName: "modaladministracionacceso" */ '../views/AdministacionAcceso.vue')
  },
  {
    path: '/editarcurso/:id',
    name: 'EditarCurso',
    component: () => import(/* webpackChunkName: "editcurso" */ '../views/EditarCurso.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
