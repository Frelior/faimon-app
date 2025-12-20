import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/',
      redirect: '/characters',
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
    },

    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
    {
      path: '/characters/:id(\\d+)',
      name: 'character',
      component: () => import('../views/CharacterPageView.vue'),
      props: true,
    },
    {
      path: '/tierlist',
      name: 'tierlist',
      component: () => import('../views/TierListView.vue'),
    },
  ],
})

export default router
