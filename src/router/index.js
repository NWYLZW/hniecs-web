import Vue from 'vue'
import VueRouter from 'vue-router'

if (process.env.NODE_ENV === '') {
} else if (process.env.NODE_ENV === 'production') {
} else if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter)
} else {
}

const Home = _ => import(
  /* webchunkName: "Home" */
  '../views/Home.vue'
)
const About = _ => import(
  /* webchunkName: "About" */
  '../views/About.vue'
)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/about',
  name: 'About',
  component: About
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
