import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/Impressum.vue'
import Edit from './views/Edit.vue'
import Letter from './views/Letter.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: About
    },
    {
      path: '/edit/:id&key=:lkey',
      name: 'edit',
      component: Edit,
      props: true
    },
    {
      path: '/letter/:id',
      name: 'letter',
      component: Letter,
      props: true
    }
  ]
})
