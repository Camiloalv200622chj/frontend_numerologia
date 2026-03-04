<template>
  <q-layout view="lHh LpR lFf" class="reading-layout">

    <SidebarNav activeKey="auto_stories" />

    <!-- ── Página ── -->
    <q-page-container>
      <q-page class="reading-page">
        <div class="ornament-bg" />

        <div class="page-content">

          <!-- Hero Header -->
          <header class="q-mb-xl">
            <div class="row items-end justify-between" style="gap:16px;flex-wrap:wrap">
              <div>
                <div class="row items-center q-mb-sm" style="gap:10px">
                  <span class="reading-badge">Lectura Completa</span>
                  <span class="text-grey-5 text-caption" style="font-style:italic">
                    Generada el {{ readingDate }}
                  </span>
                </div>
                <div class="text-h4 text-white text-weight-bold q-mb-xs" style="letter-spacing:-0.02em">
                    {{ userName }}
                  </div>
                <div class="row items-center text-grey-5 text-body2" style="gap:4px">
                  <q-icon name="cake" size="16px" />
                  <span>{{ userBirthdate }}</span>
                </div>
              </div>
              <div class="row items-center" style="gap:10px">
                <button class="hero-btn hero-btn--outline" @click="exportPDF">
                  <q-icon name="download" size="16px" />
                  <span>Exportar PDF</span>
                </button>
                <button class="hero-btn hero-btn--primary" @click="shareReading">
                  <q-icon name="share" size="16px" color="white" />
                  <span>Compartir Lectura</span>
                </button>
              </div>
            </div>
          </header>

          <!-- Grid principal -->
          <div class="main-grid">

            <!-- ════ SIDEBAR IZQUIERDO ════ -->
            <aside class="sidebar-sticky">

              <!-- Número del Alma -->
              <div class="number-card q-mb-md">
                <div class="number-card__bg-icon">
                  <q-icon name="favorite" size="96px" color="purple-3" />
                </div>
                <div class="row items-center justify-between q-mb-md">
                  <span class="number-card__label">Número del Alma</span>
                  <q-icon name="favorite" size="20px" color="purple-4" />
                </div>
                <div class="row items-baseline" style="gap:14px">
                  <span class="number-card__num">7</span>
                  <div>
                    <div class="text-white text-weight-bold" style="font-size:16px">El Buscador</div>
                    <div class="text-grey-5" style="font-size:12px;line-height:1.5">
                      Anhelo de sabiduría profunda y verdad espiritual.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Número de Personalidad -->
              <div class="number-card q-mb-md">
                <div class="number-card__bg-icon">
                  <q-icon name="face" size="96px" color="purple-3" />
                </div>
                <div class="row items-center justify-between q-mb-md">
                  <span class="number-card__label">Personalidad</span>
                  <q-icon name="face" size="20px" color="purple-4" />
                </div>
                <div class="row items-baseline" style="gap:14px">
                  <span class="number-card__num">4</span>
                  <div>
                    <div class="text-white text-weight-bold" style="font-size:16px">El Constructor</div>
                    <div class="text-grey-5" style="font-size:12px;line-height:1.5">
                      Proyectas orden, disciplina y gran fiabilidad.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Número de Destino (destacado) -->
              <div class="number-card number-card--destiny q-mb-md">
                <div class="number-card__bg-icon" style="opacity:0.2">
                  <q-icon name="stars" size="96px" color="white" />
                </div>
                <div class="row items-center justify-between q-mb-md">
                  <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.7)">Número de Destino</span>
                  <q-icon name="stars" size="20px" color="white" />
                </div>
                <div class="row items-baseline" style="gap:14px">
                  <span class="number-card__num" style="color:#fff">11</span>
                  <div>
                    <div class="text-white text-weight-bold" style="font-size:16px">Número Maestro</div>
                    <div style="font-size:12px;line-height:1.5;color:rgba(255,255,255,0.75)">
                      Destinado a iluminar a otros a través de la intuición.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navegación rápida -->
              <div class="sections-nav q-pa-md">
                <div class="sections-nav__title">Secciones de la Lectura</div>
                <div class="column q-gutter-xs q-mt-sm">
                  <a
                    v-for="sec in sections"
                    :key="sec.id"
                    :href="`#${sec.id}`"
                    class="section-link"
                    @click.prevent="scrollTo(sec.id)"
                  >
                    <q-icon :name="sec.icon" size="16px" />
                    <span>{{ sec.label }}</span>
                  </a>
                </div>
              </div>
            </aside>

            <!-- ════ CONTENIDO DERECHO ════ -->
            <div class="content-col">

              <!-- Misión de Vida (Siempre visible) -->
              <section :id="sections[0].id" class="content-card q-mb-md">
                <div class="content-card__header">
                  <div class="row items-center" style="gap:10px">
                    <div class="section-icon section-icon--purple">
                      <q-icon name="explore" size="20px" color="purple-4" />
                    </div>
                    <span class="text-h6 text-white text-weight-bold">Misión de Vida</span>
                  </div>
                  <q-icon name="expand_less" size="22px" color="grey-6" />
                </div>
                <div class="q-pa-lg q-pt-md">
                  <!-- Contenido de la lectura -->
                  <div v-if="loadingLectura" class="row flex-center q-py-xl">
                    <q-spinner color="purple-4" size="42px" />
                  </div>
                  <div v-else-if="errorLectura" class="text-red-4 text-body2 q-pa-md">
                    {{ errorLectura }}
                  </div>
                  <template v-else>
                    <div class="reading-text q-mb-md">
                      {{ lecturaContenido || 'Tu camino de vida está profundamente marcado por la vibración del número 11, lo cual indica que has venido a este plano con una sensibilidad superior.' }}
                    </div>
                  </template>

                  <!-- Barras de atributos -->
                  <div class="attributes-grid q-pt-md" style="border-top:1px solid rgba(127,19,236,0.1)">
                    <div v-for="attr in attributes" :key="attr.label" class="attribute-item">
                      <span class="attribute-label">{{ attr.label }}</span>
                      <div class="progress-track">
                        <div class="progress-fill" :style="{ width: attr.value + '%' }" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- CONTENEDOR DE SECCIONES PREMIUM -->
              <div class="premium-wrapper" :class="{ 'is-locked': !authStore.isPremium }">
                
                <!-- Overlay de Bloqueo (Solo visible si NO es premium) -->
                <div v-if="!authStore.isPremium" class="premium-overlay column flex-center text-center">
                  <div class="lock-icon-wrap q-mb-md">
                    <q-icon name="lock" size="42px" color="amber-4" />
                  </div>
                  <h3 class="text-h5 text-white text-weight-bold q-mb-sm">Desbloquea tu Destino Completo</h3>
                  <p class="text-grey-4 text-body1 q-mb-lg" style="max-width: 400px; line-height: 1.6;">
                    Accede a tus Desafíos Kármicos, Ciclo Anual detallado y Guía de Crecimiento personalizada adquiriendo la versión Premium.
                  </p>
                  <button class="unlock-btn" @click="$router.push('/checkout')">
                    <q-icon name="workspace_premium" size="20px" />
                    <span>Obtener Lectura Premium</span>
                  </button>
                </div>

                <!-- Desafíos Kármicos (colapsable) -->
                <section :id="sections[1].id" class="content-card q-mb-md">
                <div
                  class="content-card__header cursor-pointer"
                  @click="openChallenges = !openChallenges"
                >
                  <div class="row items-center" style="gap:10px">
                    <div class="section-icon section-icon--orange">
                      <q-icon name="warning_amber" size="20px" color="orange-4" />
                    </div>
                    <span class="text-h6 text-white text-weight-bold">Desafíos Kármicos</span>
                  </div>
                  <q-icon
                    :name="openChallenges ? 'expand_less' : 'expand_more'"
                    size="22px"
                    color="grey-6"
                  />
                </div>
                <transition name="collapse">
                  <div v-if="openChallenges" class="q-pa-lg q-pt-md">
                    <div class="reading-text">
                      Los desafíos kármicos representan las lecciones del alma que vienen de vidas anteriores.
                      Tu número kármico principal te pide trabajar la perfección excesiva y aprender a confiar
                      en el proceso sin necesidad de controlar cada resultado.
                    </div>
                  </div>
                </transition>
              </section>

              <!-- Ciclo Anual -->
              <section :id="sections[2].id" class="content-card q-mb-md">
                <div class="content-card__header">
                  <div class="row items-center" style="gap:10px">
                    <div class="section-icon section-icon--blue">
                      <q-icon name="calendar_today" size="20px" color="blue-4" />
                    </div>
                    <span class="text-h6 text-white text-weight-bold">Ciclo Anual 2024: Año 8</span>
                  </div>
                  <q-icon name="expand_less" size="22px" color="grey-6" />
                </div>
                <div class="q-pa-lg q-pt-md">
                  <div class="row q-gutter-lg items-start">
                    <!-- Número visual -->
                    <div class="year-number-box column items-center justify-center">
                      <span class="year-number">8</span>
                      <span class="year-label">PODER</span>
                    </div>
                    <!-- Texto -->
                    <div class="col">
                      <div class="text-white text-weight-bold q-mb-sm" style="font-size:16px">
                        La Cosecha del Esfuerzo
                      </div>
                      <div class="reading-text q-mb-md">
                        Este es un año de manifestación material y justicia. Tras los periodos de introspección,
                        el 2024 te pide que tomes las riendas de tus finanzas y de tu autoridad personal.
                        El número 8 simboliza el equilibrio entre lo espiritual y lo terrenal.
                      </div>
                      <div class="column q-gutter-xs">
                        <div v-for="item in yearItems" :key="item" class="row items-start" style="gap:8px">
                          <q-icon name="check_circle" size="18px" color="green-4" class="q-mt-xs" />
                          <span class="text-grey-4 text-body2">{{ item }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Consejos -->
              <section :id="sections[3].id" class="content-card q-mb-md">
                <div class="content-card__header">
                  <div class="row items-center" style="gap:10px">
                    <div class="section-icon section-icon--purple">
                      <q-icon name="auto_awesome" size="20px" color="purple-4" />
                    </div>
                    <span class="text-h6 text-white text-weight-bold">Consejos de Elevación</span>
                  </div>
                  <q-icon name="expand_less" size="22px" color="grey-6" />
                </div>
                <div class="q-pa-lg q-pt-md">
                  <div class="tips-grid">
                    <div v-for="tip in tips" :key="tip.title" class="tip-card">
                      <div class="row items-center q-mb-sm" style="gap:8px">
                        <q-icon :name="tip.icon" size="20px" color="purple-4" />
                        <span class="text-white text-weight-bold" style="font-size:14px">{{ tip.title }}</span>
                      </div>
                      <p class="text-grey-5 text-caption" style="line-height:1.6">{{ tip.text }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Notas de consulta -->
              <div class="notes-box q-pa-lg">
                <div class="notes-label q-mb-md">Notas de la Consulta</div>
                <textarea
                  v-model="notes"
                  class="notes-textarea"
                  placeholder="Escribe aquí tus reflexiones o notas adicionales del consultor..."
                />
                <div class="row justify-end q-mt-md">
                  <button class="save-btn" :disabled="savingNotes" @click="saveNotes">
                  {{ savingNotes ? 'Guardando...' : 'Guardar Notas' }}
                </button>
                </div>
              </div>
              
              <!-- Fin del contenedor Premium -->
              </div>

            </div>
          </div>

          <!-- Footer -->
          <footer class="reading-footer row items-center justify-between q-mt-xl q-pt-lg">
            <div class="row items-center" style="gap:6px;opacity:0.4">
              <q-icon name="auto_awesome" size="18px" />
              <span class="text-weight-bold text-caption">ASTRONUM v2.4</span>
            </div>
            <p class="text-grey-6 text-caption" style="font-style:italic">
              "Los números no rigen el destino, pero sí revelan el mapa del alma."
            </p>
            <div class="row items-center" style="gap:16px">
              <a href="#" class="footer-icon"><q-icon name="help_outline" size="20px" /></a>
              <a href="#" class="footer-icon"><q-icon name="settings" size="20px" /></a>
            </div>
          </footer>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axiosInstance from '../plugins/axios'
import SidebarNav from '../components/SidebarNav.vue'

const router = useRouter()
const authStore = useAuthStore()

// Secciones sidebar
const sections = [
  { id: 'mision',    icon: 'explore',        label: 'Misión de Vida'      },
  { id: 'desafios',  icon: 'warning_amber',  label: 'Desafíos Kármicos'   },
  { id: 'vibracion', icon: 'waves',          label: 'Vibración Anual'     },
  { id: 'consejos',  icon: 'lightbulb',      label: 'Guía de Crecimiento' }
]

// Datos del usuario
const userName = ref(authStore.usuario?.nombre || 'Usuario')
const userInitials = ref((authStore.usuario?.nombre || 'U').substring(0, 2).toUpperCase())
const userBirthdate = ref(
  authStore.usuario?.fecha_nacimiento 
    ? new Date(authStore.usuario.fecha_nacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }) 
    : 'Fecha no registrada'
)

// Lectura principal
const lecturaContenido = ref('')
const loadingLectura = ref(true)
const errorLectura = ref('')
const readingDate = ref(new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }))

// Atributos fijos (se pueden hacer dinámicos con más desarrollo)
const attributes = [
  { label: 'Intuición',  value: 95 },
  { label: 'Liderazgo',  value: 70 },
  { label: 'Empatía',    value: 85 },
  { label: 'Estructura', value: 60 }
]

// Año personal
const yearItems = [
  'Momento ideal para inversiones de largo plazo.',
  'Reconocimiento profesional inminente.'
]

// Consejos
const tips = [
  {
    icon: 'spa',
    title: 'Meditación de Enraizamiento',
    text: 'Tu número maestro 11 potencia la energía hacia arriba. Practica caminar descalzo o meditar visualizando raíces para mantener el contacto con la realidad.'
  },
  {
    icon: 'diamond',
    title: 'Cristal Recomendado',
    text: 'La Amatista te ayudará a potenciar tu número del alma, facilitando la conexión con tu yo superior y calmando la mente analítica.'
  }
]

const openChallenges = ref(false)
const notes = ref('')
const savingNotes = ref(false)

onMounted(async () => {
  const userId = authStore.userId
  if (!userId) {
    loadingLectura.value = false
    errorLectura.value = 'Debes iniciar sesión.'
    return
  }

  try {
    // Obtener lecturas del usuario
    const { data: lecturas } = await axiosInstance.get(`/lecturas/${userId}`)
    let principal = lecturas.find(l => l.tipo === 'principal')

    // Si no existe, generarla
    if (!principal) {
      const { data } = await axiosInstance.post(`/lecturas/principal/${userId}`)
      principal = data
    }

    if (principal?.fecha_lectura || principal?.createdAt) {
      readingDate.value = new Date(principal.fecha_lectura || principal.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    lecturaContenido.value = principal?.contenido || ''
  } catch (err) {
    errorLectura.value = 'No se pudo cargar la lectura principal.'
    console.error(err)
  } finally {
    loadingLectura.value = false
  }
})

function scrollTo (id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function exportPDF ()    { console.log('Exportar PDF') }
function shareReading () { console.log('Compartir lectura') }

async function saveNotes () {
  if (!notes.value.trim()) return
  savingNotes.value = true
  // Por ahora guardamos en localStorage hasta que el backend tenga endpoint de notas
  localStorage.setItem(`notes_${authStore.userId}`, notes.value)
  setTimeout(() => { savingNotes.value = false }, 600)
}
</script>


<style scoped lang="scss">
/* ─── Premium Upsell ─── */
.premium-wrapper {
  position: relative;
  transition: all 0.3s ease;

  &.is-locked {
    /* Difuminar todo el contenido interno */
    & > section, & > div.notes-box {
      filter: blur(8px) contrast(0.8);
      opacity: 0.6;
      pointer-events: none;
      user-select: none;
    }
  }
}

.premium-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(25,16,34,0.1) 0%, rgba(25,16,34,0.9) 30%, #191022 100%);
  padding: 40px 20px;
  border-radius: 12px;
  display: flex;
}

.lock-icon-wrap {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
}

.unlock-btn {
  display: flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, #d4af37 0%, #b5952f 100%);
  color: #1a1a1a; font-size: 15px; font-weight: 700;
  padding: 16px 32px; border: none; border-radius: 12px;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
    background: linear-gradient(135deg, #e5c150 0%, #c4a133 100%);
  }
  
  &:active { transform: translateY(0); }
}

/* ─── Layout ─── */
.reading-layout {
  background: #191022;
}

/* ─── Navbar ─── */
.reading-header {
  background: rgba(25, 16, 34, 0.85) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(127, 19, 236, 0.1);
}

.reading-toolbar {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  min-height: 56px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: linear-gradient(to right, #a855f7, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;

  &:hover     { color: #a855f7; }
  &--active   {
    color: #a855f7;
    border-bottom: 2px solid #7f13ec;
    padding-bottom: 2px;
  }
}

.user-avatar {
  width: 32px; height: 32px;
  background: #7f13ec;
  border-radius: 50%;
}

/* ─── Página ─── */
.reading-page {
  background: #191022;
  min-height: 100vh;
  position: relative;
}

.ornament-bg {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(127,19,236,0.12) 1px, transparent 0);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

.page-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px;

  @media (max-width: 900px) {
    padding: 24px 16px 100px;
  }
}

/* ─── Hero buttons ─── */
.hero-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &--outline {
    background: rgba(25,16,34,0.8);
    border: 1px solid rgba(127,19,236,0.2);
    color: #cbd5e1;
    &:hover { border-color: #7f13ec; }
  }
  &--primary {
    background: #7f13ec;
    border: none;
    color: #fff;
    box-shadow: 0 4px 14px rgba(127,19,236,0.3);
    &:hover { background: #6e0fd4; }
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
}

.reading-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  background: rgba(127,19,236,0.2);
  color: #a855f7;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ─── Grid principal ─── */
.main-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

/* ─── Sidebar sticky ─── */
.sidebar-sticky {
  position: sticky;
  top: 80px;

  @media (max-width: 1100px) {
    position: relative;
    top: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
}

/* ─── Number cards ─── */
.number-card {
  background: #21172b;
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover { border-color: rgba(127,19,236,0.35); }

  &__bg-icon {
    position: absolute;
    top: -8px; right: -8px;
    opacity: 0.05;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  &:hover &__bg-icon { opacity: 0.1; }

  &__label {
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
  }

  &__num {
    font-size: 56px;
    font-weight: 900;
    color: #a855f7;
    line-height: 1;
  }

  &--destiny {
    background: linear-gradient(135deg, #7f13ec 0%, #4a0a8e 100%);
    border-color: rgba(127,19,236,0.5);
    box-shadow: 0 8px 30px rgba(127,19,236,0.25);
  }
}

/* ─── Navegación rápida ─── */
.sections-nav {
  background: rgba(127,19,236,0.05);
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 12px;

  @media (max-width: 1100px) {
    display: none;
  }

  &__title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #a855f7;
  }
}

.section-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(127,19,236,0.1);
    color: #a855f7;
  }
}

/* ─── Content cards ─── */
.content-card {
  background: #21172b;
  border: 1px solid rgba(127,19,236,0.12);
  border-radius: 12px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(127,19,236,0.08);
    transition: background 0.15s;

    &.cursor-pointer:hover {
      background: rgba(127,19,236,0.04);
    }

    @media (max-width: 600px) {
      padding: 12px 16px;
    }
  }
}

/* ─── Section icons ─── */
.section-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--purple { background: rgba(127,19,236,0.12); }
  &--orange  { background: rgba(249,115,22,0.12); }
  &--blue    { background: rgba(59,130,246,0.12); }
}

/* ─── Texto de lectura ─── */
.reading-text {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.75;
}

/* ─── Cita ─── */
.quote-block {
  background: rgba(127,19,236,0.06);
  border-left: 3px solid #7f13ec;
  border-radius: 0 8px 8px 0;
  padding: 16px 18px;
  font-size: 13px;
  font-style: italic;
  font-weight: 500;
  color: #e2e8f0;
}

/* ─── Atributos ─── */
.attributes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.attribute-item { text-align: center; }

.attribute-label {
  font-size: 11px;
  color: #64748b;
  display: block;
  margin-bottom: 6px;
}

.progress-track {
  width: 100%;
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #7f13ec;
  border-radius: 99px;
  transition: width 0.6s ease;
}

/* ─── Año personal ─── */
.year-number-box {
  width: 130px;
  min-width: 130px;
  aspect-ratio: 1;
  border-radius: 16px;
  background: linear-gradient(135deg, #7f13ec 0%, #4a0a8e 100%);
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 120px;
    margin-bottom: 16px;
  }
}

.year-number {
  font-size: 64px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.year-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.8);
}

/* ─── Tips ─── */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.tip-card {
  background: rgba(127, 19, 236, 0.04);
  border: 1px solid rgba(127, 19, 236, 0.1);
  border-radius: 10px;
  padding: 16px;
}

/* ─── Notas ─── */
.notes-box {
  background: rgba(127, 19, 236, 0.03);
  border: 1px dashed rgba(127, 19, 236, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.notes-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a855f7;
}

.notes-textarea {
  width: 100%;
  min-height: 100px;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(127,19,236,0.1);
  border-radius: 8px;
  padding: 12px;
  color: #cbd5e1;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  resize: vertical;

  &:focus { border-color: #a855f7; }
}

.save-btn {
  background: rgba(127, 19, 236, 0.1);
  border: 1px solid rgba(127, 19, 236, 0.2);
  color: #a855f7;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(127, 19, 236, 0.2);
    border-color: #a855f7;
  }
}

/* ─── Footer ─── */
.reading-footer {
  border-top: 1px solid rgba(127, 19, 236, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
}

.footer-icon {
  color: #64748b;
  transition: color 0.15s;
  &:hover { color: #a855f7; }
}

.collapse-enter-active, .collapse-leave-active { transition: all 0.3s ease; }
.collapse-enter-from, .collapse-leave-to { opacity: 0; max-height: 0; }
</style>