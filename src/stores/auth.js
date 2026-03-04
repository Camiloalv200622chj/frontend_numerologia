import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // Inicializar desde localStorage si existe
    const savedToken = localStorage.getItem('nx_token') || ''
    const savedUsuario = JSON.parse(localStorage.getItem('nx_usuario') || 'null')

    const token = ref(savedToken)
    const usuario = ref(savedUsuario)

    const isAdmin = computed(() => usuario.value?.rol === 'admin')
    const isPremium = computed(() => usuario.value?.plan === 'Premium' || usuario.value?.plan === 'VIP Ancestral' || isAdmin.value)
    const isLoggedIn = computed(() => !!token.value)
    const userId = computed(() => usuario.value?.id || null)
    const userName = computed(() => usuario.value?.nombre || '')

    function setSession(data) {
        token.value = data.token
        usuario.value = data.usuario
        // Guardar en localStorage con clave propia
        localStorage.setItem('nx_token', data.token)
        localStorage.setItem('nx_usuario', JSON.stringify(data.usuario))
    }

    function updateUser(newData) {
        if (usuario.value) {
            usuario.value = { ...usuario.value, ...newData }
            localStorage.setItem('nx_usuario', JSON.stringify(usuario.value))
        }
    }

    function clearSession() {
        token.value = ''
        usuario.value = null
        localStorage.removeItem('nx_token')
        localStorage.removeItem('nx_usuario')
    }

    return {
        token,
        usuario,
        isAdmin,
        isPremium,
        isLoggedIn,
        userId,
        userName,
        setSession,
        updateUser,
        clearSession
    }
})
// Sin persist: true — manejamos localStorage manualmente