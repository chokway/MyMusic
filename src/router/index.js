import Vue from 'vue'
import Router from 'vue-router'
import charts from '@/components/charts/charts.vue'
import recommend from '@/components/recommend/recommend.vue'
import personal from '@/components/personal/personal.vue'
import search from '@/components/search/search.vue'
import mine from '@/components/mine/mine.vue'
import rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: mine
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/charts',
      name: 'charts',
      component: charts
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    }
  ]
})
