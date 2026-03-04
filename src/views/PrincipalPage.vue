     <template>
  <q-layout view="lHh LpR lFf" class="dashboard-layout">

    <!-- ── Fondo cósmico ── -->
    <div class="cosmic-bg">
      <div class="nebula nebula--1" />
      <div class="nebula nebula--2" />
      <div class="nebula nebula--3" />
      <div class="stars-layer" />
    </div>

    <!-- ── Sidebar ── -->
    <SidebarNav activeKey="dashboard" />

    <!-- ── Página principal ── -->
    <q-page-container>
      <q-page class="dashboard-page">
        <div class="page-content">

          <!-- Header -->
          <header class="page-header row justify-between items-center q-mb-xl">
            <div>
              <div class="greeting-tag">✨ Bienvenido de vuelta</div>
              <div class="greeting-name">Hola, {{ userName }}</div>
              <div class="greeting-sub">Tu energía vibra hoy en sintonía con el universo.</div>
            </div>
            <div class="header-date-chip row items-center" style="gap:6px">
              <q-icon name="calendar_today" size="14px" />
              <span>{{ currentDate }}</span>
            </div>
          </header>

          <!-- Grid principal -->
          <div class="main-grid">

            <!-- ════ COL IZQUIERDA ════ -->
            <div class="col-main">

              <!-- Lectura del día -->
              <div class="reading-card q-mb-lg">
                <!-- Decoración de fondo -->
                <div class="reading-bg-star">
                  <svg width="340" height="340" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 0L122.5 77.5L200 100L122.5 122.5L100 200L77.5 122.5L0 100L77.5 77.5Z"
                          fill="currentColor" />
                  </svg>
                </div>
                <div class="reading-glow" />

                <div class="row q-gutter-lg items-start relative-position" style="z-index:1">
                  <!-- Número del día -->
                  <div class="daily-num-box column items-center justify-center">
                    <div class="pulse-ring" />
                    <div class="pulse-ring pulse-ring--slow" />
                    <span class="daily-num-label">Energía de Hoy</span>
                    <span class="daily-num">{{ diaryNumber }}</span>
                    <span class="daily-num-title">{{ diaryTitle }}</span>
                  </div>

                  <!-- Texto lectura -->
                  <div class="col">
                    <div class="reading-title row items-center q-mb-md" style="gap:8px">
                      <div class="reading-title-icon">
                        <q-icon name="visibility" size="16px" color="purple-4" />
                      </div>
                      Lectura del Día
                    </div>
                    <div v-if="loadingLectura" class="row flex-center q-py-md">
                      <q-spinner color="purple-4" size="36px" />
                    </div>
                    <template v-else>
                      <div class="reading-text q-mb-md">
                        {{ lecturaDiaria?.contenido || 'Hoy el número 7 te invita a la pausa y el análisis profundo. Es un día ideal para retirarte del ruido externo y escuchar tu propia sabiduría interna.' }}
                      </div>
                      <div class="affirmation-box">
                        <q-icon name="format_quote" size="16px" color="purple-5" class="q-mb-xs" />
                        <div class="affirmation-text">
                          "En la quietud de mi mente, encuentro las respuestas que mi alma busca."
                        </div>
                        <div class="affirmation-label q-mt-xs">— Afirmación del día</div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Forecast grid -->
              <div class="forecast-grid">
                <div
                  v-for="item in forecastItems"
                  :key="item.title"
                  class="forecast-card"
                  :class="`forecast-card--${item.key}`"
                >
                  <div class="forecast-card__glow" />
                  <div class="row items-center q-mb-sm" style="gap:10px; position:relative; z-index:1">
                    <div class="forecast-icon" :style="{ background: item.bg }">
                      <q-icon :name="item.icon" :color="item.color" size="18px" />
                    </div>
                    <span class="forecast-title">{{ item.title }}</span>
                    <span class="forecast-score" :style="{ color: item.scoreColor }">{{ item.score }}</span>
                  </div>
                  <p class="forecast-text">{{ item.text }}</p>
                  <div class="forecast-track">
                    <div class="forecast-fill" :style="{ width: item.pct + '%', background: item.fillColor }" />
                  </div>
                </div>
              </div>
            </div>

            <!-- ════ COL DERECHA ════ -->
            <div class="col-side">

              <!-- Perfil esencial -->
              <div class="profile-card q-mb-lg">
                <div class="profile-header">
                  <div class="profile-header__bg" />
                  <div class="profile-header__content relative-position" style="z-index:1">
                    <div class="profile-avatar flex flex-center">
                      <q-icon name="person" size="32px" color="purple-3" />
                    </div>
                    <div class="profile-tag">Carta Natal</div>
                    <div class="profile-title">Perfil Esencial</div>
                    <div class="profile-birth">Nacido el {{ userBirthdate }}</div>
                  </div>
                </div>

                <div class="q-pa-md q-gutter-y-md">
                  <!-- Camino de vida -->
                  <div class="life-path-row">
                    <div>
                      <div class="life-path-label">Camino de Vida</div>
                      <div class="life-path-name">El Constructor</div>
                    </div>
                    <div class="life-path-number">22</div>
                  </div>

                  <!-- Atributos -->
                  <div>
                    <div class="attr-section-label">Atributos Clave</div>
                    <div class="column q-gutter-sm q-mt-sm">
                      <div v-for="attr in attributes" :key="attr.label" class="attr-row">
                        <div class="attr-badge">{{ attr.num }}</div>
                        <div>
                          <div class="attr-name">{{ attr.label }}</div>
                          <div class="attr-desc">{{ attr.desc }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Cita -->
                  <div class="interpretation-box">
                    <p class="interpretation-text">
                      "Como un 22, tienes la capacidad de manifestar grandes visiones en la realidad física.
                      Tu reto es equilibrar la ambición práctica con tus ideales elevados."
                    </p>
                  </div>

                  <button class="full-analysis-btn" @click="viewFullAnalysis">
                    <span>Ver Análisis Completo</span>
                    <q-icon name="arrow_forward" size="16px" />
                  </button>
                </div>
              </div>

              <!-- Año Personal -->
              <div class="year-card">
                <div class="row justify-between items-center q-mb-sm">
                  <div class="row items-center" style="gap:8px">
                    <q-icon name="loop" size="16px" color="purple-4" />
                    <span class="year-title">Año Personal: 1</span>
                  </div>
                  <span class="year-badge">Activo</span>
                </div>
                <div class="year-sub q-mb-sm">Ciclo de Nuevos Comienzos</div>
                <div class="progress-track q-mb-sm">
                  <div class="progress-fill" style="width:75%" />
                  <div class="progress-label">75%</div>
                </div>
                <p class="year-text">
                  Estás en el 75% de tu ciclo. Es momento de sembrar para el futuro.
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex flex-center q-mt-xl q-pb-lg">
            <div class="footer-bar">
              <q-icon name="auto_awesome" size="14px" color="purple-5" />
              <span class="footer-text">¿Quieres profundizar en un tema?</span>
              <button class="oracle-btn" @click="consultOracle">Consultar al Oráculo</button>
              <div class="footer-divider" />
              <q-btn flat round dense class="footer-share-btn" @click="shareReading">
                <q-icon name="share" size="16px" />
              </q-btn>
            </div>
          </div>

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

const currentDate = new Date().toLocaleDateString('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric'
})

// ── Данные del usuario ──
const userName = ref(authStore.userName || 'Usuario')
const userBirthdate = ref(
  authStore.usuario?.fecha_nacimiento 
    ? new Date(authStore.usuario.fecha_nacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC' }) 
    : 'Fecha no registrada'
)

// ── Lectura diaria ──
const lecturaDiaria   = ref(null)
const loadingLectura  = ref(true)
const diaryNumber     = ref(7)
const diaryTitle      = ref('Introspección')

// ── Perfil numerológico ──
const attributes = ref([
  { num: '3',  label: 'Expresión',      desc: 'Creatividad y Auto-expresión' },
  { num: '11', label: 'Deseo del Alma', desc: 'Maestría espiritual e intuición' },
  { num: '9',  label: 'Personalidad',   desc: 'Compasión y Humanitarismo' }
])

const forecastItems = [
  {
    key: 'love',
    title: 'Amor',
    icon: 'favorite',
    color: 'pink-4',
    bg: 'rgba(236,72,153,0.15)',
    fillColor: 'linear-gradient(to right, #be185d, #ec4899)',
    scoreColor: '#ec4899',
    score: '82%',
    pct: 82,
    text: 'Momento de sanar heridas pasadas a través de la comunicación honesta.'
  },
  {
    key: 'finance',
    title: 'Finanzas',
    icon: 'payments',
    color: 'green-4',
    bg: 'rgba(16,185,129,0.15)',
    fillColor: 'linear-gradient(to right, #059669, #34d399)',
    scoreColor: '#34d399',
    score: '65%',
    pct: 65,
    text: 'Evita gastos impulsivos hoy. La estabilidad requiere planificación consciente.'
  },
  {
    key: 'health',
    title: 'Salud',
    icon: 'bolt',
    color: 'amber-4',
    bg: 'rgba(245,158,11,0.15)',
    fillColor: 'linear-gradient(to right, #b45309, #fbbf24)',
    scoreColor: '#fbbf24',
    score: '70%',
    pct: 70,
    text: 'Tu energía física es moderada. Prioriza el descanso reparador esta noche.'
  }
]

onMounted(async () => {
  const userId = authStore.userId
  if (!userId) {
    loadingLectura.value = false
    return
  }
  try {
    const { data: lecturas } = await axiosInstance.get(`/lecturas/${userId}`)
    let diaria = lecturas.find(l => l.tipo === 'diaria')

    if (!diaria) {
      const { data } = await axiosInstance.post(`/lecturas/diaria/${userId}`)
      diaria = data
    }

    lecturaDiaria.value = diaria

    if (diaria?.contenido) {
      const match = diaria.contenido.match(/número\s+(\d+)/i)
      if (match) diaryNumber.value = parseInt(match[1])
    }

  } catch (err) {
    console.error('Error cargando lectura diaria:', err)
  } finally {
    loadingLectura.value = false
  }
})


function viewFullAnalysis () { router.push('/lectura') }
function consultOracle ()    { console.log('Consultar oráculo') }
function shareReading ()     { console.log('Compartir') }
</script>


<style scoped lang="scss">
/* ─── Layout ─── */
.dashboard-layout {
  background-color: #08050d;
}

/* ─── Fondo cósmico ─── */
.cosmic-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);

  &--1 {
    width: 700px; height: 700px;
    top: -200px; right: -150px;
    background: radial-gradient(circle, rgba(127,19,236,0.14), transparent 70%);
    animation: nebulaFloat 10s ease-in-out infinite;
  }
  &--2 {
    width: 500px; height: 500px;
    bottom: -100px; left: 50px;
    background: radial-gradient(circle, rgba(88,28,135,0.1), transparent 70%);
    animation: nebulaFloat 14s ease-in-out infinite reverse;
  }
  &--3 {
    width: 350px; height: 350px;
    top: 50%; left: 30%;
    background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);
    animation: nebulaFloat 18s ease-in-out infinite;
  }
}

.stars-layer {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,0.2), transparent),
    radial-gradient(1.5px 1.5px at 80% 30%, rgba(200,150,255,0.25), transparent),
    radial-gradient(1px 1px at 25% 65%, rgba(255,255,255,0.15), transparent),
    radial-gradient(1.5px 1.5px at 70% 80%, rgba(200,150,255,0.2), transparent),
    radial-gradient(1px 1px at 90% 55%, rgba(255,255,255,0.25), transparent),
    radial-gradient(1px 1px at 40% 90%, rgba(255,255,255,0.15), transparent);
}

@keyframes nebulaFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-40px) scale(1.05); }
}



/* ─── Página ─── */
.dashboard-page {
  background: transparent;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.page-content {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin: 0 auto;
  padding: 36px 32px;

  @media (max-width: 900px) {
    padding: 24px 16px 100px;
  }
}

/* ─── Header ─── */
.page-header {
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}

.greeting-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #a855f7;
  background: rgba(127,19,236,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  padding: 3px 10px;
  border-radius: 99px;
  margin-bottom: 10px;
}

.greeting-name {
  font-size: 28px;
  font-weight: 900;
  color: #f1f5f9;
  letter-spacing: -0.03em;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 24px;
  }
}

.greeting-sub {
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
}

.header-date-chip {
  background: rgba(127,19,236,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  border-radius: 10px;
  padding: 8px 14px;
  color: #a855f7;
  font-size: 12px;
  font-weight: 600;
}

/* ─── Grid ─── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

/* ─── Reading card ─── */
.reading-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(25,16,34,0.9) 0%, rgba(20,12,30,0.9) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);

  @media (max-width: 640px) {
    padding: 20px;
  }
}

.reading-bg-star {
  position: absolute;
  top: -100px; right: -100px;
  opacity: 0.05;
  color: #7f13ec;
  pointer-events: none;
  animation: starSpin 40s linear infinite;
}

@keyframes starSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.reading-glow {
  position: absolute;
  top: 0; right: 0;
  width: 300px; height: 300px;
  background: radial-gradient(circle at top right, rgba(127,19,236,0.12), transparent 70%);
  pointer-events: none;
}

/* ─── Número del día ─── */
.daily-num-box {
  width: 170px; min-width: 170px;
  aspect-ratio: 1;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(127,19,236,0.2), rgba(88,28,135,0.1));
  border: 1px solid rgba(127,19,236,0.3);
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 20px;
  }
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(127,19,236,0.15);
  border-radius: 20px;
  animation: ringOscillate 2.5s ease-in-out infinite;

  &--slow {
    inset: -8px;
    border-radius: 28px;
    animation-duration: 3.5s;
    animation-delay: 0.5s;
    opacity: 0.5;
  }
}

@keyframes ringOscillate {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.9; transform: scale(1.04); }
}

.daily-num-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #a855f7;
  margin-bottom: 4px;
}

.daily-num {
  font-size: 76px;
  font-weight: 900;
  color: #c084fc;
  line-height: 1;
  text-shadow: 0 0 30px rgba(127,19,236,0.8), 0 0 60px rgba(127,19,236,0.3);
  letter-spacing: -0.05em;
}

.daily-num-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5);
  margin-top: 4px;
}

/* ─── Texto lectura ─── */
.reading-title {
  font-size: 15px;
  font-weight: 700;
  color: #e2e8f0;
}

.reading-title-icon {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: rgba(127,19,236,0.15);
  display: flex; align-items: center; justify-content: center;
}

.reading-text {
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.75;
}

.affirmation-box {
  background: linear-gradient(135deg, rgba(127,19,236,0.1), rgba(88,28,135,0.05));
  border-left: 3px solid rgba(168,85,247,0.5);
  border-radius: 0 10px 10px 0;
  padding: 14px 16px;
}

.affirmation-text {
  font-size: 13px;
  color: #c4b5fd;
  font-style: italic;
  line-height: 1.6;
}

.affirmation-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #6b7280;
  margin-top: 6px;
}

/* ─── Forecast grid ─── */
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.forecast-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &--love    { background: linear-gradient(135deg, #1a0b16 0%, #160910 100%); border-color: rgba(236,72,153,0.15); }
  &--finance { background: linear-gradient(135deg, #0b1a13 0%, #091510 100%); border-color: rgba(52,211,153,0.12); }
  &--health  { background: linear-gradient(135deg, #1a140b 0%, #150f08 100%); border-color: rgba(251,191,36,0.12); }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
}

.forecast-card__glow {
  position: absolute;
  top: -30px; right: -30px;
  width: 100px; height: 100px;
  border-radius: 50%;
  filter: blur(25px);
  pointer-events: none;

  .forecast-card--love    & { background: rgba(236,72,153,0.18); }
  .forecast-card--finance & { background: rgba(52,211,153,0.15); }
  .forecast-card--health  & { background: rgba(251,191,36,0.14); }
}

.forecast-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.forecast-title {
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  flex: 1;
}

.forecast-score {
  font-size: 12px;
  font-weight: 800;
}

.forecast-text {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 10px;
  position: relative;
  z-index: 1;
}

.forecast-track {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.forecast-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 1s cubic-bezier(0.4,0,0.2,1);
}

/* ─── Profile card ─── */
.profile-card {
  background: linear-gradient(160deg, #1a0f28 0%, #14081e 100%);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.profile-header {
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-header__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(127,19,236,0.35) 0%, rgba(88,28,135,0.2) 50%, rgba(20,8,30,0.8) 100%);
}

.profile-header__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.profile-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(127,19,236,0.4), rgba(168,85,247,0.2));
  border: 2px solid rgba(168,85,247,0.4);
  margin-bottom: 6px;
  box-shadow: 0 4px 24px rgba(127,19,236,0.4);
}

.profile-tag {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #a855f7;
}

.profile-title {
  font-size: 16px;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.profile-birth {
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}

/* ─── Camino de vida ─── */
.life-path-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(127,19,236,0.1), rgba(88,28,135,0.05));
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 10px;
  padding: 12px 14px;
}

.life-path-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
}

.life-path-name {
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  margin-top: 2px;
}

.life-path-number {
  font-size: 30px;
  font-weight: 900;
  color: #c084fc;
  text-shadow: 0 0 16px rgba(192,132,252,0.5);
}

/* ─── Atributos ─── */
.attr-section-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4b5563;
  border-bottom: 1px solid rgba(127,19,236,0.1);
  padding-bottom: 6px;
}

.attr-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attr-badge {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(127,19,236,0.25), rgba(168,85,247,0.1));
  border: 1px solid rgba(168,85,247,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #a855f7;
  flex-shrink: 0;
}

.attr-name {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
}

.attr-desc {
  font-size: 10px;
  color: #4b5563;
  margin-top: 1px;
}

/* ─── Página ─── */
.dashboard-page {
  background: transparent;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.page-content {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin: 0 auto;
  padding: 36px 32px;

  @media (max-width: 900px) {
    padding: 24px 16px 100px;
  }
}

/* ─── Header ─── */
.page-header {
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}

.greeting-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #a855f7;
  background: rgba(127,19,236,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  padding: 3px 10px;
  border-radius: 99px;
  margin-bottom: 10px;
}

.greeting-name {
  font-size: 28px;
  font-weight: 900;
  color: #f1f5f9;
  letter-spacing: -0.03em;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 24px;
  }
}

.greeting-sub {
  font-size: 13px;
  color: #4b5563;
  margin-top: 4px;
}

.header-date-chip {
  background: rgba(127,19,236,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  border-radius: 10px;
  padding: 8px 14px;
  color: #a855f7;
  font-size: 12px;
  font-weight: 600;
}

/* ─── Grid ─── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

/* ─── Reading card ─── */
.reading-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(25,16,34,0.9) 0%, rgba(20,12,30,0.9) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);

  @media (max-width: 640px) {
    padding: 20px;
  }
}

.reading-bg-star {
  position: absolute;
  top: -100px; right: -100px;
  opacity: 0.05;
  color: #7f13ec;
  pointer-events: none;
  animation: starSpin 40s linear infinite;
}

@keyframes starSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.reading-glow {
  position: absolute;
  top: 0; right: 0;
  width: 300px; height: 300px;
  background: radial-gradient(circle at top right, rgba(127,19,236,0.12), transparent 70%);
  pointer-events: none;
}

/* ─── Número del día ─── */
.daily-num-box {
  width: 170px; min-width: 170px;
  aspect-ratio: 1;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(127,19,236,0.2), rgba(88,28,135,0.1));
  border: 1px solid rgba(127,19,236,0.3);
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 20px;
  }
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(127,19,236,0.15);
  border-radius: 20px;
  animation: ringOscillate 2.5s ease-in-out infinite;

  &--slow {
    inset: -8px;
    border-radius: 28px;
    animation-duration: 3.5s;
    animation-delay: 0.5s;
    opacity: 0.5;
  }
}

@keyframes ringOscillate {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.9; transform: scale(1.04); }
}

.daily-num-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #a855f7;
  margin-bottom: 4px;
}

.daily-num {
  font-size: 76px;
  font-weight: 900;
  color: #c084fc;
  line-height: 1;
  text-shadow: 0 0 30px rgba(127,19,236,0.8), 0 0 60px rgba(127,19,236,0.3);
  letter-spacing: -0.05em;
}

.daily-num-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5);
  margin-top: 4px;
}

/* ─── Texto lectura ─── */
.reading-title {
  font-size: 15px;
  font-weight: 700;
  color: #e2e8f0;
}

.reading-title-icon {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: rgba(127,19,236,0.15);
  display: flex; align-items: center; justify-content: center;
}

.reading-text {
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.75;
}

.affirmation-box {
  background: linear-gradient(135deg, rgba(127,19,236,0.1), rgba(88,28,135,0.05));
  border-left: 3px solid rgba(168,85,247,0.5);
  border-radius: 0 10px 10px 0;
  padding: 14px 16px;
}

.affirmation-text {
  font-size: 13px;
  color: #c4b5fd;
  font-style: italic;
  line-height: 1.6;
}

.affirmation-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #6b7280;
  margin-top: 6px;
}

/* ─── Forecast grid ─── */
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.forecast-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &--love    { background: linear-gradient(135deg, #1a0b16 0%, #160910 100%); border-color: rgba(236,72,153,0.15); }
  &--finance { background: linear-gradient(135deg, #0b1a13 0%, #091510 100%); border-color: rgba(52,211,153,0.12); }
  &--health  { background: linear-gradient(135deg, #1a140b 0%, #150f08 100%); border-color: rgba(251,191,36,0.12); }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
}

.forecast-card__glow {
  position: absolute;
  top: -30px; right: -30px;
  width: 100px; height: 100px;
  border-radius: 50%;
  filter: blur(25px);
  pointer-events: none;

  .forecast-card--love    & { background: rgba(236,72,153,0.18); }
  .forecast-card--finance & { background: rgba(52,211,153,0.15); }
  .forecast-card--health  & { background: rgba(251,191,36,0.14); }
}

.forecast-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.forecast-title {
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  flex: 1;
}

.forecast-score {
  font-size: 12px;
  font-weight: 800;
}

.forecast-text {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 10px;
  position: relative;
  z-index: 1;
}

.forecast-track {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.forecast-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 1s cubic-bezier(0.4,0,0.2,1);
}

/* ─── Profile card ─── */
.profile-card {
  background: linear-gradient(160deg, #1a0f28 0%, #14081e 100%);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.profile-header {
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-header__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(127,19,236,0.35) 0%, rgba(88,28,135,0.2) 50%, rgba(20,8,30,0.8) 100%);
}

.profile-header__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.profile-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(127,19,236,0.4), rgba(168,85,247,0.2));
  border: 2px solid rgba(168,85,247,0.4);
  margin-bottom: 6px;
  box-shadow: 0 4px 24px rgba(127,19,236,0.4);
}

.profile-tag {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #a855f7;
}

.profile-title {
  font-size: 16px;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.profile-birth {
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}

/* ─── Camino de vida ─── */
.life-path-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(127,19,236,0.1), rgba(88,28,135,0.05));
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 10px;
  padding: 12px 14px;
}

.life-path-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
}

.life-path-name {
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  margin-top: 2px;
}

.life-path-number {
  font-size: 30px;
  font-weight: 900;
  color: #c084fc;
  text-shadow: 0 0 16px rgba(192,132,252,0.5);
}

/* ─── Atributos ─── */
.attr-section-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4b5563;
  border-bottom: 1px solid rgba(127,19,236,0.1);
  padding-bottom: 6px;
}

.attr-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attr-badge {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(127,19,236,0.25), rgba(168,85,247,0.1));
  border: 1px solid rgba(168,85,247,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #a855f7;
  flex-shrink: 0;
}

.attr-name {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
}

.attr-desc {
  font-size: 10px;
  color: #4b5563;
  margin-top: 1px;
}

/* ─── Interpretación ─── */
.interpretation-box {
  background: rgba(0,0,0,0.25);
  border-radius: 12px;
  padding: 14px;
  margin-top: 16px;
}

.interpretation-text {
  font-size: 11px;
  color: #94a3b8;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
}

.full-analysis-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #7f13ec 0%, #6009c8 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, #9020ff 0%, #7310de 100%);
    box-shadow: 0 4px 16px rgba(127,19,236,0.4);
  }
}

/* ─── Año Personal ─── */
.year-card {
  background: linear-gradient(160deg, #14081e 0%, #0d0414 100%);
  border: 1px solid rgba(127,19,236,0.15);
  border-radius: 18px;
  padding: 20px;
}

.year-title {
  font-size: 14px;
  font-weight: 700;
  color: #e2e8f0;
}

.year-badge {
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  background: rgba(16,185,129,0.1);
  padding: 2px 8px;
  border-radius: 99px;
}

.year-sub {
  font-size: 12px;
  color: #4b5563;
}

.progress-track {
  height: 20px;
  background: rgba(255,255,255,0.04);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  background: linear-gradient(135deg, #7f13ec, #c084fc);
  border-radius: 8px;
}

.progress-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  font-weight: 800;
  color: #fff;
  text-align: center;
  line-height: 20px;
}

.year-text {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

/* ─── Footer bar ─── */
.footer-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(25,16,34,0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(127,19,236,0.2);
  border-radius: 16px;
  padding: 8px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
}

.footer-text {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
}

.oracle-btn {
  background: #7f13ec;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: #9020ff; }
}

.footer-divider {
  width: 1px;
  height: 24px;
  background: rgba(127,19,236,0.2);

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
}

.footer-share-btn {
  color: #94a3b8;
  &:hover { color: #a855f7; }
}
</style>
