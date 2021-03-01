import Home from '@/views/Home'
import NestedRoute from '@/components/NestedRoute'

export default [
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
    path: '/nested-route',
    component: NestedRoute,
    meta: {
      shouldBustCache: true
    }
  }
]