<template>
  <q-layout view="lHh LpR lFf" class="profile-layout">
    <SidebarNav activeKey="person" />

    <!-- ── Página ── -->
    <q-page-container>
      <q-page class="profile-page">
        <div class="page-content">

          <!-- Grid principal -->
          <div class="main-grid">

            <!-- ════ SIDEBAR IZQUIERDO ════ -->
            <aside class="column q-gutter-md">

              <!-- Profile Card -->
              <div class="profile-card">
                <div class="profile-card__bg-icon">
                  <q-icon name="nights_stay" size="96px" color="purple-3" />
                </div>
                <div class="column items-center text-center relative-position" style="z-index:1">
                  <!-- Avatar con indicador online -->
                  <div class="avatar-wrap">
                    <div class="profile-avatar flex flex-center">
                      <q-icon name="person" size="40px" color="purple-4" />
                    </div>
                    <span class="online-dot" />
                  </div>

                  <div class="text-h6 text-white text-weight-bold q-mt-md">{{ userNombre }}</div>
                  <div class="text-purple-4 text-weight-medium text-body2 q-mt-xs">Buscadora de Estrellas</div>

                  <!-- Mini stats -->
                  <div class="profile-stats-grid q-mt-lg">
                    <div class="profile-stat">
                      <div class="profile-stat__label">Signo</div>
                      <div class="profile-stat__value">Escorpio</div>
                    </div>
                    <div class="profile-stat">
                      <div class="profile-stat__label">Elemento</div>
                      <div class="profile-stat__value">Agua</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Camino de Vida -->
              <div class="life-path-card column items-center text-center">
                <div class="life-path-card__glow" />
                <div class="relative-position" style="z-index:1">
                  <div class="text-caption text-white text-uppercase text-weight-medium q-mb-sm"
                       style="opacity:.8;letter-spacing:.15em">Camino de Vida</div>
                  <div class="life-path-number">11</div>
                  <div class="text-h6 text-white text-weight-bold text-uppercase q-mt-sm q-mb-md"
                       style="letter-spacing:.06em">El Maestro Espiritual</div>
                  <p class="text-caption text-white q-mb-lg"
                     style="opacity:.9;line-height:1.6;font-style:italic;max-width:220px">
                    "Posees una intuición profunda y un potencial espiritual excepcional.
                    Viniste a iluminar el camino de otros."
                  </p>
                  <button class="life-path-btn" @click="viewFullAnalysis">Ver Análisis Completo</button>
                </div>
              </div>

              <!-- Datos de nacimiento -->
              <div class="data-card q-pa-md">
                <div class="data-card__title row items-center q-mb-md" style="gap:6px">
                  <q-icon name="fingerprint" size="18px" color="purple-4" />
                  <span>Datos de Nacimiento</span>
                </div>
                <div class="column q-gutter-sm">
                  <div v-for="item in birthData" :key="item.label" class="birth-row">
                    <span class="text-grey-5 text-caption">{{ item.label }}</span>
                    <span class="text-white text-weight-medium text-caption">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </aside>

            <!-- ════ CONTENIDO DERECHO ════ -->
            <div class="column q-gutter-lg">

              <!-- Welcome -->
              <div class="row items-end justify-between" style="gap:12px;flex-wrap:wrap">
                <div>
                  <div class="text-h5 text-white text-weight-bold q-mb-xs" style="letter-spacing:-.02em">
                    Bienvenido, {{ userNombre }}
                  </div>
                  <div class="text-grey-5 text-body2">
                    Hoy es un día vibracional 7. Momento ideal para la introspección.
                  </div>
                </div>
                <div class="row items-center" style="gap:8px">
                  <q-btn flat round dense class="icon-action-btn" @click="openSettings">
                    <q-icon name="settings" size="20px" color="grey-5" />
                  </q-btn>
                  <q-btn flat round dense class="icon-action-btn" @click="openNotifs">
                    <q-icon name="notifications_none" size="20px" color="grey-5" />
                  </q-btn>
                </div>
              </div>

              <!-- Stats grid -->
              <div class="stats-grid">
                <div v-for="stat in stats" :key="stat.label" class="stat-card">
                  <div class="row items-center q-mb-sm" style="gap:8px">
                    <q-icon :name="stat.icon" size="20px" color="purple-4" />
                    <span class="stat-card__label">{{ stat.label }}</span>
                  </div>
                  <div class="stat-card__value">{{ stat.value }}</div>
                  <div class="text-grey-6" style="font-size:11px;margin-top:2px">{{ stat.sub }}</div>
                </div>
              </div>

              <!-- Historial de lecturas -->
              <div class="table-card">
                <div class="table-card__header row items-center justify-between q-pa-md">
                  <div class="row items-center" style="gap:8px">
                    <q-icon name="auto_stories" size="20px" color="purple-4" />
                    <span class="text-white text-weight-bold text-body1">Historial de Lecturas</span>
                  </div>
                  <button class="see-all-btn" @click="seeAll">Ver todas</button>
                </div>

                <div v-if="loadingReadings" class="row flex-center q-pa-xl">
                  <q-spinner color="purple-4" size="36px" />
                </div>

                <div class="table-scroll">
                  <table class="readings-table">
                    <thead>
                      <tr>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th class="text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="reading in readings" :key="reading.id" class="reading-row">
                        <td>
                          <div class="row items-center" style="gap:10px">
                            <div class="reading-icon flex flex-center">
                              <q-icon :name="reading.icon" size="18px" color="purple-4" />
                            </div>
                            <div>
                              <div class="text-white text-weight-semibold" style="font-size:13px">
                                {{ reading.title }}
                              </div>
                              <div class="text-grey-6" style="font-size:11px">{{ reading.sub }}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="text-grey-4" style="font-size:13px">{{ reading.date }}</span>
                        </td>
                        <td>
                          <span class="status-badge status-badge--done">{{ reading.status }}</span>
                        </td>
                        <td class="text-right">
                          <q-btn flat round dense class="view-btn" @click="viewReading(reading)">
                            <q-icon name="visibility" size="18px" />
                            <q-tooltip>Ver lectura</q-tooltip>
                          </q-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Ajustes de cuenta -->
              <div class="settings-card q-pa-lg">
                <div class="row items-center q-mb-lg" style="gap:8px">
                  <q-icon name="manage_accounts" size="22px" color="purple-4" />
                  <span class="text-white text-weight-bold text-body1">Ajustes de Cuenta</span>
                </div>

                <div class="settings-grid">
                  <!-- Campos -->
                  <div class="column q-gutter-md">
                    <div>
                      <div class="field-label q-mb-xs">Correo Electrónico</div>
                      <div class="custom-input-wrap">
                        <input
                          v-model="form.email"
                          type="email"
                          class="custom-input"
                          placeholder="tu@correo.com"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="field-label q-mb-xs">Contraseña</div>
                      <div class="custom-input-wrap">
                        <input
                          v-model="form.password"
                          :type="showPassword ? 'text' : 'password'"
                          class="custom-input"
                          placeholder="••••••••••••"
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
                  </div>

                  <!-- Toggles -->
                  <div class="column q-gutter-sm">
                    <div v-for="toggle in toggles" :key="toggle.label" class="toggle-row">
                      <div>
                        <div class="text-white text-weight-semibold" style="font-size:13px">
                          {{ toggle.label }}
                        </div>
                        <div class="text-grey-6" style="font-size:11px">{{ toggle.sub }}</div>
                      </div>
                      <div
                        class="toggle-switch"
                        :class="{ 'toggle-switch--on': toggle.value }"
                        @click="toggle.value = !toggle.value"
                      >
                        <div class="toggle-knob" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div v-if="settingsMsg" class="text-green-4 text-body2 text-weight-medium q-mt-sm">
                  ✓ {{ settingsMsg }}
                </div>
                <div v-if="settingsError" class="text-red-4 text-body2 q-mt-sm">
                  {{ settingsError }}
                </div>
                <div class="row justify-end items-center q-mt-lg q-pt-md settings-actions" style="gap:12px">
                  <button class="cancel-btn" @click="cancelSettings">Cancelar</button>
                  <button class="save-btn" :disabled="savingSettings" @click="saveSettings">
                    {{ savingSettings ? 'Guardando...' : 'Guardar Cambios' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <footer class="profile-footer q-mt-xl q-pt-lg text-center">
            <div class="row justify-center q-mb-sm" style="gap:16px;opacity:.4;color:#a855f7">
              <q-icon name="spa" size="20px" />
              <q-icon name="diamond" size="20px" />
              <q-icon name="self_improvement" size="20px" />
            </div>
            <p class="text-grey-7 text-caption" style="letter-spacing:.18em;text-transform:uppercase">
              © 2024 Portal de Numerología Aetheria. Fluye con el Universo.
            </p>
          </footer>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axiosInstance from '../plugins/axios'
import SidebarNav from '../components/SidebarNav.vue'

const router = useRouter()
const authStore = useAuthStore()

// Datos del usuario desde el store
const userNombre = ref(authStore.usuario?.nombre || 'Usuario')
const userEmail  = ref(authStore.usuario?.email  || '')

// Datos de nacimiento — se muestran estáticos si no hay endpoint de perfil completo
const userFechaNacimiento = ref(authStore.usuario?.fecha_nacimiento ? new Date(authStore.usuario.fecha_nacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No registrada')

const birthData = ref([
  { label: 'Usuario', value: userNombre.value },
  { label: 'Email',   value: userEmail.value  },
  { label: 'Rol',     value: authStore.usuario?.rol || 'usuario' },
  { label: 'Nacimiento', value: userFechaNacimiento.value }
])

// Stats
const stats = ref([
  { icon: 'history_edu', label: 'Lecturas',  value: '0',         sub: 'Realizadas en total' },
  { icon: 'stars',       label: 'Karma',     value: 'Favorable', sub: 'Periodo actual' },
  { icon: 'insights',    label: 'Destino',   value: '–',         sub: 'Meta final de alma' }
])

// Historial de lecturas
const readings = ref([])
const loadingReadings = ref(true)

// Formulario de ajustes
const form = reactive({
  email: authStore.usuario?.email || '',
  password: ''
})
const showPassword = ref(false)
const savingSettings = ref(false)
const settingsMsg = ref('')
const settingsError = ref('')

// Toggles de preferencias (guardadas en localStorage)
const toggles = reactive([
  { label: 'Notificaciones Diarias', sub: 'Recibe tu consejo del día',    value: true  },
  { label: 'Perfil Público',         sub: 'Permitir que otros te vean',    value: false }
])

onMounted(async () => {
  const userId = authStore.userId
  if (!userId) return

  try {
    const { data: lecturas } = await axiosInstance.get(`/lecturas/${userId}`)
    readings.value = lecturas.map((l, i) => ({
      id: l._id || i,
      icon: l.tipo === 'principal' ? 'psychology' : 'calendar_today',
      title: l.tipo === 'principal' ? 'Lectura Principal' : 'Lectura Diaria',
      sub: l.tipo === 'principal' ? 'Mapa numerológico completo' : 'Energía del día',
      date: new Date(l.fecha_lectura || Date.now()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Completada'
    }))
    stats.value[0].value = lecturas.length.toString()
  } catch (err) {
    console.error('Error cargando lecturas:', err)
  } finally {
    loadingReadings.value = false
  }
})

function newReading () { router.push('/lectura') }
function viewFullAnalysis () { router.push('/lectura') }
function openSettings () { }
function openNotifs () { }
function seeAll () { router.push('/lectura') }
function viewReading (r) { console.log('Ver lectura', r.title) }

async function saveSettings () {
  settingsMsg.value = ''
  settingsError.value = ''
  savingSettings.value = true

  try {
    const payload = { email: form.email }
    if (form.password) payload.password = form.password

    // PUT /api/usuarios/:id
    await axiosInstance.put(`/usuarios/${authStore.userId}`, payload)

    // Actualizar store si cambió el email
    if (authStore.usuario) authStore.usuario.email = form.email

    settingsMsg.value = '¡Cambios guardados correctamente!'
    form.password = ''
    setTimeout(() => { settingsMsg.value = '' }, 3000)
  } catch (err) {
    settingsError.value = err?.response?.data?.msg || 'Error al guardar cambios.'
  } finally {
    savingSettings.value = false
  }
}

function cancelSettings () {
  form.email = authStore.usuario?.email || ''
  form.password = ''
  settingsMsg.value = ''
  settingsError.value = ''
}
</script>


<style scoped lang="scss">
/* ─── Layout ─── */
.profile-layout {
  background: #191022;
}

/* ─── Navbar ─── */
.profile-header {
  background: rgba(25, 16, 34, 0.8) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(127, 19, 236, 0.1);
}

.profile-toolbar {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  min-height: 56px;
}

.logo-icon {
  width: 30px; height: 30px;
  background: #7f13ec;
  border-radius: 6px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #a855f7;
}

.nav-link {
  font-size: 14px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;

  &:hover    { color: #a855f7; }
  &--active  { color: #a855f7; font-weight: 500; }
}

.nav-cta {
  background: #7f13ec;
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 4px 14px rgba(127,19,236,0.3);
  transition: background 0.2s;

  &:hover { background: #6e0fd4; }
}

/* ─── Página ─── */
.profile-page {
  background: #191022;
  min-height: 100vh;
}

.page-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* ─── Grid principal ─── */
.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

/* ─── Profile card ─── */
.profile-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(127, 19, 236, 0.12);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &__bg-icon {
    position: absolute;
    top: 0; right: 0;
    padding: 8px;
    opacity: 0.06;
    pointer-events: none;
  }
}

.avatar-wrap {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  width: 88px; height: 88px;
  border-radius: 50%;
  border: 2px solid #7f13ec;
  background: rgba(127, 19, 236, 0.15);
  padding: 4px;
}

.online-dot {
  position: absolute;
  bottom: 4px; right: 4px;
  width: 14px; height: 14px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid #191022;
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.profile-stat {
  background: rgba(127, 19, 236, 0.06);
  border: 1px solid rgba(127, 19, 236, 0.1);
  border-radius: 8px;
  padding: 10px;
  text-align: center;

  &__label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
    margin-bottom: 3px;
  }

  &__value {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
  }
}

/* ─── Camino de vida ─── */
.life-path-card {
  background: linear-gradient(135deg, #7f13ec 0%, #4a0a8e 100%);
  border-radius: 12px;
  padding: 32px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(127, 19, 236, 0.35);

  &__glow {
    position: absolute;
    top: -20%; left: -20%;
    width: 60%; height: 60%;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
}

.life-path-number {
  font-size: 80px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0 30px rgba(255,255,255,0.3);
}

.life-path-btn {
  background: #fff;
  color: #7f13ec;
  padding: 8px 22px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;

  &:hover { background: #f1f5f9; }
}

/* ─── Datos nacimiento ─── */
.data-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 12px;

  &__title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #a855f7;
  }
}

.birth-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(127,19,236,0.06);

  &:last-child { border-bottom: none; }
}

/* ─── Stats ─── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.stat-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 10px;
  padding: 16px;

  &__label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
  }

  &__value {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-top: 4px;
  }
}

/* ─── Tabla lecturas ─── */
.table-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 12px;
  overflow: hidden;

  &__header {
    border-bottom: 1px solid rgba(127,19,236,0.1);
  }
}

.see-all-btn {
  background: transparent;
  border: none;
  color: #a855f7;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  padding: 0;

  &:hover { text-decoration: underline; }
}

.table-scroll {
  overflow-x: auto;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(127,19,236,0.2);
    border-radius: 10px;
  }
}

.readings-table {
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background: rgba(127,19,236,0.04);
    th {
      padding: 10px 20px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      text-align: left;

      &.text-right { text-align: right; }
    }
  }

  tbody .reading-row {
    border-bottom: 1px solid rgba(127,19,236,0.05);
    transition: background 0.15s;

    &:hover { background: rgba(127,19,236,0.04); }
    &:last-child { border-bottom: none; }

    td { padding: 12px 20px; vertical-align: middle; }
  }
}

.reading-icon {
  width: 36px; height: 36px;
  background: rgba(127,19,236,0.15);
  border-radius: 8px;
  flex-shrink: 0;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  &--done {
    background: rgba(34,197,94,0.1);
    color: #22c55e;
    border: 1px solid rgba(34,197,94,0.2);
  }
}

.view-btn {
  color: #a855f7 !important;
  border-radius: 8px !important;
  transition: background 0.15s !important;

  &:hover { background: rgba(127,19,236,0.12) !important; }
}

/* ─── Settings ─── */
.settings-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 12px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 640px) { grid-template-columns: 1fr; }
}

.field-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
}

.custom-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(127,19,236,0.05);
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus-within { border-color: rgba(127,19,236,0.45); }
}

.input-icon-right {
  position: absolute;
  right: 10px;
}

.custom-input {
  width: 100%;
  padding: 10px 36px 10px 12px;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 13px;
  font-family: inherit;

  &::placeholder { color: #64748b; }
}

/* ─── Toggles ─── */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(127,19,236,0.05);
  border: 1px solid rgba(127,19,236,0.1);
  border-radius: 8px;
  padding: 12px 14px;
  gap: 12px;
}

.toggle-switch {
  width: 38px;
  height: 22px;
  background: rgba(100,116,139,0.4);
  border-radius: 99px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;

  &--on {
    background: #7f13ec;
  }
}

.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;

  .toggle-switch--on & {
    transform: translateX(16px);
  }
}

/* ─── Settings actions ─── */
.settings-actions {
  border-top: 1px solid rgba(127,19,236,0.1);
}

.cancel-btn {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 16px;
  transition: color 0.2s;

  &:hover { color: #a855f7; }
}

.save-btn {
  background: #7f13ec;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 9px 24px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 4px 14px rgba(127,19,236,0.3);
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: #6e0fd4;
    box-shadow: 0 6px 20px rgba(127,19,236,0.4);
  }
}

/* ─── Footer ─── */
.profile-footer {
  border-top: 1px solid rgba(127,19,236,0.1);
}

/* ─── Icon action buttons ─── */
.icon-action-btn {
  background: rgba(255,255,255,0.06) !important;
  border: 1px solid rgba(127,19,236,0.15) !important;
  border-radius: 8px !important;
  transition: background 0.2s !important;

  &:hover { background: rgba(127,19,236,0.12) !important; }
}
</style>