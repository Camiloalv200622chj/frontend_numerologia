<template>
  <div class="login-root">
    <!-- ── Fondo animado ── -->
    <div class="bg-pattern" />
    <div class="orb orb--tl" />
    <div class="orb orb--br" />
    <div class="orb orb--center" />

    <!-- ── Contenedor principal ── -->
    <div class="login-wrapper">

      <!-- ══ LADO IZQUIERDO — Branding ══ -->
      <div class="brand-panel">
        <div class="brand-panel__inner">
          <div class="brand-logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 35,32 1,32" stroke="rgba(212,175,55,0.9)" stroke-width="1.5" fill="rgba(127,19,236,0.25)"/>
              <polygon points="18,10 28,28 8,28" stroke="rgba(127,19,236,0.6)" stroke-width="1" fill="rgba(212,175,55,0.1)"/>
              <circle cx="18" cy="18" r="3" fill="rgba(212,175,55,0.8)"/>
            </svg>
          </div>
          <h1 class="brand-name">NUMEROLOGÍA<br><span>DIVINA</span></h1>
          <p class="brand-tagline">
            Descifra los secretos de tu destino a través de los números del universo.
          </p>

          <div class="brand-stats">
            <div class="brand-stat">
              <span class="brand-stat__num">14K+</span>
              <span class="brand-stat__label">Almas guiadas</span>
            </div>
            <div class="brand-divider" />
            <div class="brand-stat">
              <span class="brand-stat__num">98%</span>
              <span class="brand-stat__label">Satisfacción</span>
            </div>
            <div class="brand-divider" />
            <div class="brand-stat">
              <span class="brand-stat__num">∞</span>
              <span class="brand-stat__label">Precisión</span>
            </div>
          </div>

          <div class="brand-quote">
            <q-icon name="format_quote" size="24px" style="opacity:.4;color:#d4af37" />
            <p>"Los números son el lenguaje en que el universo habla a tu alma."</p>
          </div>
        </div>

        <!-- Decoración geométrica -->
        <div class="geo-circle geo-circle--1" />
        <div class="geo-circle geo-circle--2" />
      </div>

      <!-- ══ LADO DERECHO — Formulario ══ -->
      <div class="form-panel">
        <div class="form-panel__card">

          <!-- Línea dorada superior -->
          <div class="card-top-line" />

          <!-- Header del form -->
          <div class="form-header">
            <div class="form-icon">
              <q-icon name="auto_awesome" size="22px" color="amber-5" />
            </div>
            <div>
              <h2 class="form-title">Bienvenido de nuevo</h2>
              <p class="form-subtitle">Accede a tu portal de numerología</p>
            </div>
          </div>

          <!-- Banner de error -->
          <transition name="fade-slide">
            <div v-if="showError" class="error-card">
              <q-icon name="error_outline" size="20px" color="red-4" />
              <span>{{ errorMsg }}</span>
            </div>
          </transition>

          <!-- Formulario -->
          <form @submit.prevent="handleSubmit" novalidate>

            <!-- Email -->
            <div class="field-group">
              <label class="field-label">Correo Electrónico</label>
              <div class="field-wrap" :class="{ 'field-wrap--error': fieldErrors.email }">
                <q-icon name="alternate_email" size="18px" class="field-icon" />
                <input
                  v-model.trim="form.email"
                  type="email"
                  class="field-input"
                  placeholder="tu@correo.com"
                  autocomplete="email"
                  @focus="fieldErrors.email = false"
                />
              </div>
              <span v-if="fieldErrors.email" class="field-error">Ingresa un correo válido</span>
            </div>

            <!-- Contraseña -->
            <div class="field-group">
              <div class="row justify-between items-center q-mb-xs">
                <label class="field-label" style="margin:0">Contraseña</label>
                <router-link to="/recuperar" class="forgot-link">¿La olvidaste?</router-link>
              </div>
              <div class="field-wrap" :class="{ 'field-wrap--error': fieldErrors.password }">
                <q-icon name="lock_outline" size="18px" class="field-icon" />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="field-input"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  @focus="fieldErrors.password = false"
                />
                <button type="button" class="toggle-eye" @click="showPassword = !showPassword" tabindex="-1">
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" size="18px" />
                </button>
              </div>
              <span v-if="fieldErrors.password" class="field-error">Ingresa tu contraseña</span>
            </div>

            <!-- Botón submit -->
            <button
              type="submit"
              class="btn-submit"
              :class="{ 'btn-submit--loading': loading }"
              :disabled="loading"
            >
              <span v-if="!loading" class="btn-submit__content">
                <q-icon name="login" size="18px" />
                Entrar al Portal
              </span>
              <span v-else class="btn-submit__content">
                <q-spinner size="18px" color="white" />
                Verificando...
              </span>
            </button>

          </form>

          <!-- Footer del form -->
          <div class="form-footer">
            <span>¿Aún no tienes cuenta?</span>
            <router-link to="/register" class="register-link">Crear cuenta gratis</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../plugins/axios.js'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const showError    = ref(false)
const errorMsg     = ref('')
const loading      = ref(false)

const form = reactive({ email: '', password: '' })
const fieldErrors = reactive({ email: false, password: false })

function validate () {
  let ok = true
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email || !emailRx.test(form.email)) { fieldErrors.email    = true; ok = false }
  if (!form.password)                            { fieldErrors.password = true; ok = false }
  return ok
}

async function handleSubmit () {
  showError.value = false
  if (!validate()) return

  loading.value = true
  try {
    // Llamada con la instancia configurada
    const { data } = await axiosInstance.post('/auth/login', {
      email: form.email,
      password: form.password
    })

    const { token, usuario } = data
    if (!token) throw new Error('Token no recibido')

    // Guardar sesión
    authStore.setSession({ token, usuario })
    // (setSession ya persiste en localStorage con claves nx_token / nx_usuario)

    // Redirigir por rol, enviando a usuarios normales directo a la lectura
    router.replace(usuario.rol === 'admin' ? '/admin' : '/lectura')

  } catch (err) {
    const msg = err?.response?.data?.msg
    errorMsg.value = msg || 'Credenciales incorrectas. Verifica tus datos.'
    showError.value = true
    form.password = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
/* ════ Reset y base ════ */
* { box-sizing: border-box; }

.login-root {
  min-height: 100vh;
  background: #080511;
  position: relative;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

/* ════ Fondo ════ */
.bg-pattern {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 2px 2px, rgba(127,19,236,0.08) 1px, transparent 0);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;

  &--tl {
    width: 500px; height: 500px;
    top: -150px; left: -150px;
    background: rgba(127,19,236,0.18);
  }
  &--br {
    width: 400px; height: 400px;
    bottom: -120px; right: -120px;
    background: rgba(212,175,55,0.07);
  }
  &--center {
    width: 300px; height: 300px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(127,19,236,0.06);
  }
}

/* ════ Wrapper principal ════ */
.login-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* ════ PANEL IZQUIERDO (Branding) ════ */
.brand-panel {
  flex: 1;
  background: linear-gradient(135deg, rgba(127,19,236,0.15) 0%, rgba(10,6,20,0.9) 100%);
  border-right: 1px solid rgba(127,19,236,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 48px;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) { display: none; }
}

.brand-panel__inner {
  position: relative;
  z-index: 1;
  max-width: 380px;
}

.brand-logo {
  width: 64px; height: 64px;
  border-radius: 16px;
  background: rgba(127,19,236,0.15);
  border: 1px solid rgba(127,19,236,0.3);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 28px;
  box-shadow: 0 0 40px rgba(127,19,236,0.2);
}

.brand-name {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #fff;
  margin: 0 0 6px;
  span {
    background: linear-gradient(90deg, #a855f7 0%, #d4af37 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.brand-tagline {
  font-size: 15px;
  color: rgba(203,213,225,0.7);
  line-height: 1.6;
  margin-bottom: 36px;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 36px;
  padding: 20px;
  background: rgba(127,19,236,0.06);
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 12px;
}

.brand-stat {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__num {
    font-size: 22px;
    font-weight: 800;
    color: #a855f7;
    line-height: 1;
  }
  &__label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
    margin-top: 4px;
    white-space: nowrap;
  }
}

.brand-divider {
  width: 1px;
  height: 32px;
  background: rgba(127,19,236,0.2);
}

.brand-quote {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  p {
    font-size: 13px;
    font-style: italic;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }
}

/* Círculos decorativos */
.geo-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(127,19,236,0.1);

  &--1 {
    width: 400px; height: 400px;
    bottom: -100px; right: -100px;
  }
  &--2 {
    width: 250px; height: 250px;
    bottom: -50px; right: -50px;
    border-color: rgba(212,175,55,0.08);
  }
}

/* ════ PANEL DERECHO (Formulario) ════ */
.form-panel {
  width: 480px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  background: rgba(8,5,17,0.6);

  @media (max-width: 900px) {
    width: 100%;
    padding: 40px 20px;
  }
}

.form-panel__card {
  width: 100%;
  max-width: 380px;
  background: rgba(20,12,30,0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(127,19,236,0.18);
  border-radius: 16px;
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(127,19,236,0.05),
    0 25px 80px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.card-top-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7f13ec, #d4af37, transparent);
  opacity: 0.6;
}

/* ── Header del formulario ── */
.form-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.form-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: rgba(127,19,236,0.12);
  border: 1px solid rgba(127,19,236,0.25);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(127,19,236,0.2);
}

.form-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px;
  letter-spacing: -0.01em;
}

.form-subtitle {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

/* ── Error card ── */
.error-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #f87171;
  font-weight: 500;
}

/* ── Campos ── */
.field-group {
  margin-bottom: 18px;
}

.field-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 8px;
}

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: rgba(127,19,236,0.6);
    box-shadow: 0 0 0 3px rgba(127,19,236,0.1);
  }

  &--error {
    border-color: rgba(239,68,68,0.4) !important;
  }
}

.field-icon {
  position: absolute;
  left: 13px;
  color: #475569;
  pointer-events: none;
}

.field-input {
  width: 100%;
  padding: 13px 44px 13px 42px;
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  font-size: 14px;
  font-family: inherit;

  &::placeholder { color: #334155; }
}

.toggle-eye {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: #a855f7; }
}

.field-error {
  display: block;
  font-size: 11px;
  color: #f87171;
  margin-top: 5px;
  padding-left: 2px;
}

.forgot-link {
  font-size: 11px;
  color: #7f13ec;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s;
  &:hover { color: #a855f7; }
}

/* ── Botón submit ── */
.btn-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7f13ec 0%, #6009c8 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  margin-top: 8px;
  box-shadow: 0 4px 24px rgba(127,19,236,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.2s;
  letter-spacing: 0.02em;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #9020ff 0%, #7310de 100%);
    box-shadow: 0 8px 32px rgba(127,19,236,0.55);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) { transform: scale(0.99); }

  &:disabled, &--loading {
    opacity: 0.8;
    cursor: default;
  }
}

/* ── Footer del form ── */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(127,19,236,0.1);
  font-size: 13px;
  color: #475569;
}

.register-link {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s;
  &:hover { color: #c084fc; text-decoration: underline; }
}

/* ── Transición ── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>