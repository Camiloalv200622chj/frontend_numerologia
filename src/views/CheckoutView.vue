<template>
  <q-layout view="lHh LpR fFf" class="checkout-layout">
    <q-page-container>
      <q-page class="checkout-page flex flex-center">
        <!-- Fondo Cósmico (Mismo estilo que Login/Register) -->
        <div class="orb orb--purple" />
        <div class="orb orb--gold" />
        <div class="stars-bg" />
        <div class="page-overlay" />

        <!-- Tarjeta de Pago -->
        <div class="checkout-card">
          <div class="top-glow" />

          <button class="back-btn" @click="$router.push('/lectura')">
            <q-icon name="arrow_back" size="18px" />
            <span>Volver a mi lectura</span>
          </button>

          <div class="card-inner flex column flex-center text-center q-pa-xl">
            <!-- Ícono y Loading -->
            <div class="icon-wrap q-mb-lg flex flex-center relative-position">
              <q-icon name="workspace_premium" size="48px" color="amber-4" />
              <q-spinner-puff class="spinner-overlay" color="amber-4" size="90px" />
            </div>

            <!-- Textos -->
            <h2 class="text-h4 text-white text-weight-bold q-mb-sm">Pasarela de Pago</h2>
            <p class="text-body1 text-grey-4 q-mb-md" style="max-width:300px">
              Esta sección está en desarrollo. Pronto podrás desbloquear tu carta natal completa usando nuestros métodos de pago seguros.
            </p>
            <div class="q-mb-xl text-amber-4 text-h5 text-weight-bold">
              Valor a pagar: $4,000 COP <span class="text-body2 text-grey-5">(~$1 USD)</span>
            </div>

            <!-- Botón Wompi -->
            <div class="payment-methods full-width column q-gutter-y-md">
              <button class="payment-btn wompi-btn" @click="payWithWompi" :disabled="loading" style="border:none">
                <q-icon name="payments" size="24px" />
                <span>{{ loading ? 'Configurando pago...' : 'Pagar con Wompi' }}</span>
              </button>
            </div>
            
            <p class="text-caption text-grey-6 q-mt-xl">
              <q-icon name="lock" size="14px" class="q-mr-xs" /> Pagos procesados de forma segura.
            </p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import axiosInstance from '../plugins/axios'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const loading = ref(false)

const payWithWompi = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const monto = 4000 // Ejemplo: 4,000 COP (~1 USD)
    
    // Obtener firma del backend
    const { data } = await axiosInstance.post('/pagos/wompi-signature', {
      usuario_id: authStore.userId,
      monto
    })
    
    if (!data.signature) throw new Error("No se pudo obtener la firma")

    // Iniciar el widget de Wompi
    const checkout = new window.WidgetCheckout({
      currency: data.currency,
      amountInCents: data.montoInCents,
      reference: data.referencia,
      publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
      signature: { integrity: data.signature }
    })

    checkout.open(function (result) {
      const transaction = result.transaction
      if (transaction.status === 'APPROVED') {
        // Actualizar sesión local inmediatamente al plan VIP Ancestral
        authStore.updateUser({ plan: 'VIP Ancestral', estado: 'activo' })
        $q.notify({ type: 'positive', message: '¡Pago aprobado! Bienvenido al VIP Ancestral. Redirigiendo...' })
        setTimeout(() => router.push('/lectura'), 2000)
      } else {
        $q.notify({ type: 'warning', message: 'El pago no fue aprobado o fue cancelado.' })
      }
    })
  } catch (error) {
    console.error("Error al iniciar pago:", error)
    $q.notify({ type: 'negative', message: 'Hubo un error al conectar con la pasarela de pago. Intenta de nuevo.' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
/* ─── Layout y Fondo ─── */
.checkout-layout { background: #0a060e; }
.checkout-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* ─── Orbs y Estrellas ─── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;

  &--purple {
    width: 500px; height: 500px;
    top: -10%; left: -10%;
    background: rgba(127, 19, 236, 0.15);
  }
  &--gold {
    width: 400px; height: 400px;
    bottom: -10%; right: -10%;
    background: rgba(212, 175, 55, 0.1);
  }
}

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
  background: rgba(0,0,0,0.4);
  z-index: 1;
}

/* ─── Tarjeta ─── */
.checkout-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  margin: 24px;
  background: rgba(20, 12, 28, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.1);
}

.top-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
}

.back-btn {
  position: absolute;
  top: 20px; left: 20px;
  display: flex; align-items: center; gap: 8px;
  background: transparent; border: none;
  color: #94a3b8; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: color 0.2s;
  z-index: 20;

  &:hover { color: #fff; }
}

/* ─── Controles internos ─── */
.icon-wrap {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.2);
}

.spinner-overlay {
  position: absolute;
  opacity: 0.5;
}

.payment-methods {
  width: 100%;
  max-width: 320px;
}

.payment-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: not-allowed;
  opacity: 0.8;
  transition: opacity 0.2s, transform 0.2s;

  &.wompi-btn {
    background: #0044cc;
    color: white;
    cursor: pointer;
  }
  &.wompi-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  &:hover { opacity: 1; transform: scale(1.02); }
}
</style>
