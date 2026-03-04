<template>
  <div class="register-page flex flex-center">
    <!-- Fondo degradado y estrellas -->
    <div class="orb orb--purple" />
    <div class="orb orb--gold" />
    <div class="stars-bg" />

    <!-- Overlay oscuro de fondo -->
    <div class="page-overlay" />

    <!-- Modal Card -->
    <div class="modal-card">
      <!-- Barra de brillo inferior -->
      <div class="bottom-glow-bar" />

      <!-- Botón cerrar -->
      <button class="close-btn" @click="$router.back()">
        <q-icon name="close" size="20px" />
      </button>

      <div class="modal-inner">
        <!-- ── Panel izquierdo decorativo ── -->
        <div class="left-panel gt-sm">
          <div class="left-panel__overlay" />
          <div class="left-panel__content">
            <q-icon name="auto_awesome" size="52px" class="text-purple-4 q-mb-md" />
            <p class="text-uppercase text-weight-bold text-purple-4 tracking-wide text-caption">
              Iniciación
            </p>
            <p class="text-grey-4 text-body2 q-mt-sm text-center">
              Tu fecha de nacimiento es la llave de tu alma.
            </p>
          </div>
        </div>

        <!-- ── Formulario ── -->
        <div class="form-side">
          <div class="q-mb-lg">
            <div class="text-h5 text-white text-weight-bold q-mb-xs">Crea tu Perfil Astral</div>
            <div class="text-caption text-grey-5">
              Ingresa tus datos para calcular tu mapa numerológico personalizado.
            </div>
          </div>

          <!-- Mensajes de backend -->
          <div v-if="successMsg" class="success-banner q-mb-md q-pa-md row items-center" style="gap:10px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);border-radius:8px">
            <q-icon name="check_circle_outline" color="green-4" size="20px" />
            <span class="text-green-4 text-body2 text-weight-medium">{{ successMsg }}</span>
          </div>
          <div v-if="errorMsg" class="error-banner q-mb-md q-pa-md row items-center" style="gap:10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:8px">
            <q-icon name="error_outline" color="red-4" size="20px" />
            <span class="text-red-4 text-body2 text-weight-medium">{{ errorMsg }}</span>
          </div>

          <q-form @submit.prevent="handleSubmit" greedy class="form-fields">
            <!-- Nombre -->
            <div class="q-mb-md">
              <div class="field-label">Nombre Completo</div>
              <div class="custom-input-wrap">
                <q-icon name="person" class="input-icon" size="18px" color="grey-6" />
                <input
                  v-model="form.name"
                  type="text"
                  class="custom-input"
                  placeholder="Ej. Luna Valiente"
                />
              </div>
            </div>

            <!-- Fecha de Nacimiento -->
            <div class="q-mb-xs">
              <div class="field-label">Fecha de Nacimiento</div>
              <div class="custom-input-wrap input-date">
                <q-icon name="calendar_month" class="input-icon" size="18px" color="purple-4" />
                <input
                  v-model="form.birthdate"
                  type="date"
                  class="custom-input custom-input--date"
                />
              </div>
            </div>
            <div class="field-hint q-mb-md">
              Esencial para calcular tu Número de Camino de Vida.
            </div>

            <!-- Email -->
            <div class="q-mb-md">
              <div class="field-label">Correo Electrónico</div>
              <div class="custom-input-wrap">
                <q-icon name="email" class="input-icon" size="18px" color="grey-6" />
                <input
                  v-model="form.email"
                  type="email"
                  class="custom-input"
                  placeholder="luna@cosmos.com"
                />
              </div>
            </div>

            <!-- Contraseña -->
            <div class="q-mb-lg">
              <div class="field-label">Contraseña</div>
              <div class="custom-input-wrap">
                <q-icon name="lock" class="input-icon" size="18px" color="grey-6" />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="custom-input"
                  placeholder="••••••••"
                />
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  class="input-icon-right cursor-pointer"
                  size="18px"
                  color="grey-6"
                  @click="showPassword = !showPassword"
                />
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="submit-btn"
              :class="{ loading }"
              :disabled="loading"
            >
              <span v-if="!loading" class="submit-btn__content">
                <span>REVELAR MI DESTINO</span>
                <q-icon name="auto_fix_high" size="18px" />
              </span>
              <q-spinner v-else color="white" size="20px" />
            </button>

            <!-- Divider -->
            <div class="divider q-my-md">
              <div class="divider__line" />
              <span class="divider__text">o continuar con</span>
              <div class="divider__line" />
            </div>

            <!-- Social Buttons -->
            <div class="row" style="gap:12px">
              <button type="button" class="social-btn col" @click="loginWithGoogle">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button type="button" class="social-btn col" @click="loginWithApple">
                <q-icon name="apple" size="20px" color="white" />
                <span>Apple</span>
              </button>
            </div>

            <!-- Footer -->
            <p class="text-center text-caption text-grey-6 q-mt-lg">
              ¿Ya tienes una cuenta?
              <router-link to="/" class="text-purple-4 text-weight-semibold q-ml-xs" style="text-decoration:none">
                Inicia sesión
              </router-link>
            </p>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../plugins/axios'

const router = useRouter()

const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const form = reactive({
  name: '',
  birthdate: '',
  email: '',
  password: ''
})

async function handleSubmit () {
  errorMsg.value = ''
  successMsg.value = ''

  if (!form.name || !form.birthdate || !form.email || !form.password) {
    errorMsg.value = 'Por favor completa todos los campos.'
    return
  }

  loading.value = true
  try {
    await axiosInstance.post('/usuarios', {
      nombre: form.name,
      email: form.email,
      password: form.password,
      fecha_nacimiento: form.birthdate
    })

    successMsg.value = '¡Cuenta creada! Tu perfil está siendo revisado. Inicia sesión cuando sea activado.'
    setTimeout(() => router.push('/'), 2500)

  } catch (error) {
    const msg = error?.response?.data?.msg
    errorMsg.value = msg || 'Error al crear la cuenta. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

function loginWithGoogle () {
  console.log('Google OAuth — pendiente de implementar')
}

function loginWithApple () {
  console.log('Apple OAuth — pendiente de implementar')
}
</script>


<style scoped lang="scss">
/* ─── Página ─── */
.register-page {
  background-color: #191022;
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
    width: 500px;
    height: 500px;
    top: -15%;
    left: -10%;
    background: rgba(127, 19, 236, 0.18);
  }
  &--gold {
    width: 400px;
    height: 400px;
    bottom: -15%;
    right: -10%;
    background: rgba(212, 175, 55, 0.08);
  }
}

/* ─── Fondo estrellado ─── */
.stars-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(127,19,236,0.15) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.page-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}

/* ─── Modal Card ─── */
.modal-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 680px;
  margin: 24px 16px;
  background: #1d1429;
  border: 1px solid rgba(127, 19, 236, 0.3);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0,0,0,0.6);
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bottom-glow-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #7f13ec, transparent);
  opacity: 0.5;
  z-index: 2;
}

/* ─── Botón cerrar ─── */
.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 20;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
}

/* ─── Layout interno ─── */
.modal-inner {
  display: flex;
}

/* ─── Panel izquierdo ─── */
.left-panel {
  width: 200px;
  min-width: 200px;
  position: relative;
  background: rgba(127, 19, 236, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(127,19,236,0.2), transparent);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 20px;
    text-align: center;
  }
}

.tracking-wide {
  letter-spacing: 0.15em;
}

/* ─── Panel formulario ─── */
.form-side {
  flex: 1;
  padding: 32px 28px;
}

/* ─── Labels ─── */
.field-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 6px;
}

.field-hint {
  font-size: 10px;
  color: rgba(127, 19, 236, 0.7);
  font-style: italic;
  padding-left: 2px;
}

/* ─── Input wrapper ─── */
.custom-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(25, 16, 34, 0.6);
  border: 1px solid rgba(127, 19, 236, 0.2);
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: #7f13ec;
    box-shadow: 0 0 0 2px rgba(127, 19, 236, 0.15);
  }
}

.input-icon {
  position: absolute;
  left: 10px;
  pointer-events: none;
}

.input-icon-right {
  position: absolute;
  right: 10px;
}

.custom-input {
  width: 100%;
  padding: 10px 36px 10px 36px;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 13px;
  font-family: inherit;

  &::placeholder {
    color: rgba(100, 116, 139, 0.6);
  }

  &--date {
    color-scheme: dark;
  }
}

/* ─── Submit ─── */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: #7f13ec;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(127, 19, 236, 0.35);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &:hover:not(:disabled) {
    background: #6e0fd4;
    box-shadow: 0 0 30px rgba(127, 19, 236, 0.5);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
}

/* ─── Divider ─── */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;

  &__line {
    flex: 1;
    height: 1px;
    background: rgba(127, 19, 236, 0.12);
  }

  &__text {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    white-space: nowrap;
  }
}

/* ─── Sociales ─── */
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(127, 19, 236, 0.2);
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(127, 19, 236, 0.08);
    border-color: rgba(127, 19, 236, 0.4);
  }
}

/* ─── Responsive: ocultar panel izquierdo en mobile ─── */
.gt-sm {
  @media (max-width: 599px) {
    display: none !important;
  }
}
</style>