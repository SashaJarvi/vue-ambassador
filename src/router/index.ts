import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/ProductsFrontend.vue'),
      },
      {
        path: '/backend',
        component: () => import('@/views/ProductsBackend.vue'),
      },
      {
        path: '/profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: '/stats',
        component: () => import('@/views/Stats.vue'),
      },
      {
        path: '/rankings',
        component: () => import('@/views/Rankings.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
