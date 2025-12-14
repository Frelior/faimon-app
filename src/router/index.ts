import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },

    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
    {
      path: '/tierlist',
      name: 'tierlist',
      component: () => import('../views/TierListView.vue'),
    },
  ],
})

export default router
