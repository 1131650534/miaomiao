import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cnimaRouter from './cnima'
import mineRouter from './mine'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cnimaRouter,
    mineRouter,
    
  ]
})
