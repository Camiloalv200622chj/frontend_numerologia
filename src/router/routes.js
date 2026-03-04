import { useAuthStore } from '../stores/auth.js'

const routes = [
  {
    path: '/',
    component: () => import('../views/LoginView.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    component: () => import('../views/RegisterUser.vue'),
    meta: { guest: true }
  },
  {
    path: '/recuperar',
    component: () => import('../views/RecuperarContraseña.vue'),
    meta: { guest: true }
  },
  {
    path: '/reset-password/:token',
    component: () => import('../views/ResetPassword.vue'),
    // No meta: { guest: true } to allow logged-in users to still access this specifically if they click a link
  },
  {
    path: '/dashboard',
    component: () => import('../views/PrincipalPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lectura',
    component: () => import('../views/LecturaPrincipal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    component: () => import('../views/PerfilUser.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: () => import('../views/AdminUser.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/checkout',
    component: () => import('../views/CheckoutView.vue'),
    meta: { requiresAuth: true }
  }
]

export default routes

// Guard de navegación — se registra en main.js con router.beforeEach
export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      return next('/')
    }
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      return next('/dashboard')
    }
    if (to.meta.guest && authStore.isLoggedIn) {
      return next(authStore.isAdmin ? '/admin' : '/dashboard')
    }
    next()
  })
}