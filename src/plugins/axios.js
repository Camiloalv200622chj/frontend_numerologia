import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'
const axiosInstance = axios.create({
  baseURL: apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para añadir el header x-token en cada petición
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const authStore = useAuthStore()
      // Pinia expone el valor directamente; no usar .value aquí
      const token = authStore.token

      if (token) {
        config.headers['x-token'] = token
      }
    } catch (err) {
      // Si Pinia no está listo, no bloqueamos la petición
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance