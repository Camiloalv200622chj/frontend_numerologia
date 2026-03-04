import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import axiosInstance from './plugins/axios.js'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/material-icons'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import routes, { setupGuards } from './router/routes'
import App from './App.vue'
import { useAuthStore } from './stores/auth.js'

// Limpiar clave legacy de pinia-plugin-persistedstate
if (localStorage.getItem('auth')) {
  localStorage.removeItem('auth')
  localStorage.removeItem('nx_token')
  localStorage.removeItem('nx_usuario')
}

; (async () => {
  const app = createApp(App)

  // PINIA — instalar primero para poder usar stores
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  // Validar token persistido contra el backend ANTES de montar
  const authStore = useAuthStore()
  const savedToken = localStorage.getItem('nx_token')
  if (savedToken) {
    try {
      const { data } = await axiosInstance.get('/auth/me', {
        headers: { 'x-token': savedToken }
      })
      // Token válido: refrescar datos del usuario desde la BD
      authStore.setSession({ token: savedToken, usuario: data.usuario })
    } catch {
      // Token inválido o expirado → limpiar sesión, irá al login
      authStore.clearSession()
    }
  }

  // ROUTER
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  setupGuards(router)
  app.use(router)

  // QUASAR
  app.use(Quasar, {
    plugins: {},
    lang: quasarLang,
    iconSet: quasarIconSet
  })

  app.mount('#app')
})()