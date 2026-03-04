<template>
  <q-drawer
    v-if="$q.screen.gt.sm"
    :model-value="true"
    :width="72"
    :breakpoint="0"
    side="left"
    bordered
    class="sidebar"
  >
    <div class="sidebar-inner column items-center full-height q-py-lg">
      <!-- Logo -->
      <div class="sidebar-logo flex flex-center q-mb-xl">
        <q-icon name="auto_awesome" size="26px" color="white" />
        <div class="logo-ring" />
      </div>

      <!-- Nav -->
      <div class="column items-center q-gutter-y-sm flex-1">
        <div
          v-for="item in navItems"
          :key="item.icon"
          class="nav-icon-btn"
          :class="activeNav === item.icon ? 'nav-icon-btn--active' : ''"
          @click="navigateTo(item)"
        >
          <q-icon :name="item.icon" size="20px" />
          <q-tooltip anchor="center right" self="center left" :offset="[14, 0]" class="nav-tooltip">
            {{ item.label }}
          </q-tooltip>
        </div>
      </div>

      <!-- Logout -->
      <div class="nav-icon-btn nav-icon-btn--logout q-mt-auto" @click="handleLogout">
        <q-icon name="logout" size="18px" />
        <q-tooltip anchor="center right" self="center left" :offset="[14, 0]" class="nav-tooltip">Salir</q-tooltip>
      </div>
    </div>
  </q-drawer>

  <!-- Mobile Bottom Nav -->
  <div v-else class="mobile-nav">
    <div
      v-for="item in navItems"
      :key="item.icon"
      class="mobile-nav-item"
      :class="activeNav === item.icon ? 'mobile-nav-item--active' : ''"
      @click="navigateTo(item)"
    >
      <q-icon :name="item.icon" size="24px" />
      <span class="mobile-nav-label">{{ item.label }}</span>
    </div>
    <div class="mobile-nav-item mobile-nav-item--logout" @click="handleLogout">
      <q-icon name="logout" size="24px" />
      <span class="mobile-nav-label">Salir</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps({
  activeKey: {
    type: String,
    default: 'dashboard'
  }
})

const router = useRouter()
const authStore = useAuthStore()
const activeNav = ref(props.activeKey)

const navItems = [
  { icon: 'dashboard',    label: 'Inicio',     route: '/dashboard' },
  { icon: 'auto_stories', label: 'Mi Lectura', route: '/lectura' },
  { icon: 'person',       label: 'Perfil',     route: '/perfil' },
  { icon: 'settings',     label: 'Ajustes',    route: null }
]

function navigateTo(item) {
  if (item.route) {
    activeNav.value = item.icon
    router.push(item.route)
  }
}

function handleLogout() {
  authStore.clearSession()
  router.replace('/')
}
</script>

<style scoped lang="scss">
/* ─── Sidebar (Desktop) ─── */
.sidebar {
  background: linear-gradient(180deg, #130b1e 0%, #0d0716 100%) !important;
  border-right: 1px solid rgba(127, 19, 236, 0.12) !important;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5) !important;
  z-index: 100 !important;
}

/* Force dark background on Quasar drawer internals */
:deep(.q-drawer) {
  background: linear-gradient(180deg, #130b1e 0%, #0d0716 100%) !important;
}
:deep(.q-drawer__content) {
  background: linear-gradient(180deg, #130b1e 0%, #0d0716 100%) !important;
}

.sidebar-inner { padding: 20px 0; }

.sidebar-logo {
  position: relative;
  width: 48px; height: 48px;
  background: linear-gradient(135deg, #7f13ec, #581c87);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(127,19,236,0.4);
}

.logo-ring {
  position: absolute;
  inset: -4px;
  border-radius: 16px;
  border: 1px solid rgba(168,85,247,0.3);
  animation: ringSpin 6s linear infinite;
}

@keyframes ringSpin {
  100% { transform: rotate(360deg); }
}

.nav-icon-btn {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    color: #a855f7;
    background: rgba(127, 19, 236, 0.08);
  }

  &--active {
    color: #fff;
    background: linear-gradient(135deg, rgba(127,19,236,0.3), rgba(168,85,247,0.1));
    border: 1px solid rgba(127,19,236,0.3);
    box-shadow: 0 0 15px rgba(127,19,236,0.2);

    &::before {
      content: '';
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      height: 20px;
      width: 4px;
      background: #a855f7;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 0 10px #a855f7;
    }
  }

  &--logout {
    margin-top: auto;
    &:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }
  }
}

.nav-tooltip {
  background: rgba(13, 7, 22, 0.95);
  border: 1px solid rgba(127, 19, 236, 0.3);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
  backdrop-filter: blur(8px);
}

/* ─── Mobile Nav ─── */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(19, 11, 30, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(127, 19, 236, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 2000;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s;

  &--active {
    color: #a855f7;
    text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
  }

  &--logout:hover {
    color: #ef4444;
  }
}

.mobile-nav-label {
  font-size: 10px;
  font-weight: 600;
}
</style>
