import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: () => import('../pages/Home.vue')},
    {path: '/chatbot', component: () => import('../pages/Chatbot.vue')},
    {path: '/game', component: () => import('../pages/Game.vue')},
    {path: '/summary', component: () => import('../pages/Summary.vue')},
    {path: '/credits', component: () => import('../pages/Credits.vue')}
  ],
})

export default router
