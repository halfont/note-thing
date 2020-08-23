import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../views/Notes.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }, 
  {
    path: '/',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import store from '@/store'
router.beforeEach((to, from, next) => {
  let authenticated = store.getters['auth/loggedIn'];
  if (to.name !== 'Login' && to.name !== 'Register' && !authenticated) next({ name: 'Login' })
  else next()
})

export default router
