<template>
  <div class="recover-page flex flex-center">
    <!-- Fondo -->
    <div class="orb orb--purple" />
    <div class="orb orb--gold" />
    <div class="stars-bg" />
    <div class="page-overlay" />

    <!-- Card -->
    <div class="recover-card">
      <div class="top-glow" />

      <!-- Botón volver -->
      <button class="back-btn" @click="$router.push('/')">
        <q-icon name="arrow_back" size="18px" />
        <span>Volver al login</span>
      </button>

      <div class="card-inner">
        <!-- Icono -->
        <div class="icon-wrap flex flex-center q-mx-auto q-mb-md">
          <q-icon name="password" size="32px" color="purple-4" />
        </div>

        <div class="text-h5 text-white text-weight-bold text-center q-mb-xs">
          Nueva Contraseña
        </div>
        <div class="text-caption text-grey-5 text-center q-mb-xl">
          Ingresa tu nueva contraseña para acceder a tu cuenta.
        </div>

        <!-- Banner éxito -->
        <div v-if="successMsg" class="success-banner q-mb-lg q-pa-md row items-center" style="gap:10px">
          <q-icon name="check_circle_outline" color="green-4" size="20px" />
          <div>
            <div class="text-green-4 text-weight-bold text-body2">¡Contraseña Actualizada!</div>
            <div class="text-green-4 text-caption" style="opacity:0.8">{{ successMsg }}</div>
          </div>
        </div>

        <!-- Banner error -->
        <div v-if="errorMsg" class="error-banner q-mb-lg q-pa-md row items-center" style="gap:10px">
          <q-icon name="error_outline" color="red-4" size="20px" />
          <div class="text-red-4 text-body2 text-weight-medium">{{ errorMsg }}</div>
        </div>

        <!-- Formulario -->
        <q-form @submit.prevent="handleSubmit" v-if="!successMsg">
          <div class="q-mb-md">
            <div class="field-label q-mb-xs">Nueva Contraseña</div>
            <div class="custom-input-wrap">
              <q-icon name="lock_outline" class="input-icon" color="grey-6" size="20px" />
              <input
                v-model="password"
                type="password"
                class="custom-input"
                placeholder="Ingresa tu nueva contraseña"
                required
              />
            </div>
          </div>

          <div class="q-mb-lg">
            <div class="field-label q-mb-xs">Confirmar Contraseña</div>
            <div class="custom-input-wrap">
              <q-icon name="lock" class="input-icon" color="grey-6" size="20px" />
              <input
                v-model="confirmPassword"
                type="password"
                class="custom-input"
                placeholder="Repite tu nueva contraseña"
                required
              />
            </div>
          </div>

          <q-btn
            type="submit"
            unelevated
            class="full-width submit-btn"
            :loading="loading"
            :disable="loading || !password || !confirmPassword"
            no-caps
          >
            Actualizar Contraseña
            <q-icon name="check" size="18px" class="q-ml-sm" />
          </q-btn>
        </q-form>

        <q-btn
          v-if="successMsg"
          unelevated
          class="full-width submit-btn q-mt-md"
          @click="$router.push('/')"
          no-caps
        >
          Ir a Iniciar Sesión
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '../plugins/axios'

const route = useRoute()
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

async function handleSubmit () {
  errorMsg.value = ''
  successMsg.value = ''

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Las contraseñas no coinciden.'
    return
  }

  if (password.value.length < 6) {
    errorMsg.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  const token = route.params.token
  if (!token) {
    errorMsg.value = 'Token inválido o faltante en la URL'
    return
  }

  loading.value = true
  try {
    await axiosInstance.post(`/auth/reset-password/${token}`, { password: password.value })
    successMsg.value = 'Tu contraseña ha sido actualizada con éxito.'
  } catch (err) {
    const msg = err?.response?.data?.msg
    errorMsg.value = msg || 'No se pudo actualizar la contraseña. Intenta de nuevo o solicita otro enlace.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
/* ─── Página ─── */
.recover-page {
  background-color: #0a060e;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* ─── Orbs ─── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;

  &--purple {
    width: 400px; height: 400px;
    top: -10%; left: -10%;
    background: rgba(127, 19, 236, 0.18);
  }
  &--gold {
    width: 300px; height: 300px;
    bottom: -10%; right: -10%;
    background: rgba(212, 175, 55, 0.08);
  }
}

/* ─── Fondo estrellado ─── */
.stars-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

.page-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1;
}

/* ─── Card ─── */
.recover-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  margin: 24px 16px;
  background: rgba(25, 16, 34, 0.9);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(127, 19, 236, 0.2);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0,0,0,0.5);
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.top-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(127,19,236,0.6), transparent);
}

/* ─── Botón volver ─── */
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  padding: 14px 20px 0;
  transition: color 0.2s;

  &:hover { color: #a855f7; }
}

.card-inner {
  padding: 24px 28px 32px;
}

/* ─── Ícono ─── */
.icon-wrap {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: rgba(127, 19, 236, 0.15);
  border: 1px solid rgba(127, 19, 236, 0.3);
}

/* ─── Labels ─── */
.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #cbd5e1;
}

/* ─── Input ─── */
.custom-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(10, 6, 14, 0.55);
  border: 1px solid rgba(127, 19, 236, 0.25);
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #7f13ec;
    box-shadow: 0 0 0 2px rgba(127, 19, 236, 0.15);
  }
}

.input-icon {
  position: absolute;
  left: 12px;
  pointer-events: none;
}

.custom-input {
  width: 100%;
  padding: 12px 14px 12px 40px;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-family: inherit;

  &::placeholder { color: rgba(100, 116, 139, 0.7); }
}

/* ─── Botón submit ─── */
.submit-btn {
  background: #7f13ec !important;
  color: #fff !important;
  border-radius: 8px !important;
  padding: 12px 16px !important;
  box-shadow: 0 6px 24px rgba(127, 19, 236, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #6e0fd4 !important;
    box-shadow: 0 10px 30px rgba(127, 19, 236, 0.4);
    transform: translateY(-1px);
  }
}

/* ─── Banners ─── */
.success-banner {
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 8px;
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 8px;
}
</style>
