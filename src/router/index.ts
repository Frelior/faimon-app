import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

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
      path: '/character/:id(\\d+)',
      name: 'character',
      component: () => import('../views/CharacterPageView.vue'),
      props: true,
    },
    {
      path: '/tierlist',
      name: 'tierlist',
      component: () => import('../views/TierListView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'edit-info',
          name: 'edit-info',
          component: () => import('../views/EditInfoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'edit-character',
          name: 'edit-character',
          component: () => import('../views/EditCharacterView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!requiresAuth) {
    next()
    return
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    next({ name: 'auth' })
    return
  }

  next()
})

export default router
