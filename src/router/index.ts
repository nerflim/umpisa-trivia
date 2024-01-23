import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import QuizView from '@/views/QuizView.vue'
import ReviewAnswers from '@/views/ReviewAnswers.vue'
import AttemptsView from '@/views/AttemptsView.vue'
import { requireAuth } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: requireAuth
    },
    {
      path: '/quiz/:id/review',
      name: 'reviewAnswers',
      component: ReviewAnswers,
      beforeEnter: requireAuth
    },
    {
      path: '/quiz/:id/:question',
      name: 'quiz',
      component: QuizView,
      beforeEnter: requireAuth
    },
    {
      path: '/attempts',
      name: 'attempts',
      component: AttemptsView,
      beforeEnter: requireAuth
    }
  ]
})

export default router
