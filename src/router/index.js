import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import Users from '../components/Users'
import Roles from '../components/Roles'
import Rights from '../components/Rights'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'index' },
  {
    path: '/index', component: Index, children: [{ path: '/users', component: Users }, { path: '/roles', component: Roles }, { path: '/rights', component: Rights }]
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to)
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
