import Vue from 'vue'
import Router from 'vue-router'
import bcrypt from 'bcryptjs';

const routerOptions = [
  { path: '/', component: 'Login' },
  { path: '/signin', component: 'Login' },
  { path: '/signup', component: 'Register' },
  { path: '/home', component: 'Users' }
]


const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})