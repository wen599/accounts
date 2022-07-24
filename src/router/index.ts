import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => {
        return import(/* webpackChunkName: "home" */ '@/view/Home.vue')
      }

    },
    {
      path: '/create',
      component: () => {
        return import(/* webpackChunkName: "create" */ '@/view/Create.vue')
      }
    },
    {
      path: '/detail',
      name:'detail',
      component: () => {
        return import(/* webpackChunkName: "detail" */ '@/view/Detail.vue')
      }

    },
    {
      path: '/statistics',
      component: () => {
        return import(/* webpackChunkName: "detail" */ '@/view/Statistics.vue')
      }
    }
  ]
})
