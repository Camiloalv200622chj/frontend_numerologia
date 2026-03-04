<template>
  <q-layout view="lHh LpR lFf" class="admin-layout">

    <!-- ── Fondo atmosférico ── -->
    <div class="bg-orbs">
      <div class="orb orb--1" />
      <div class="orb orb--2" />
      <div class="orb orb--3" />
    </div>

    <!-- Partículas decorativas -->
    <div class="particles">
      <div v-for="i in 12" :key="i" class="particle" :style="particleStyle(i)" />
    </div>

    <!-- ── Sidebar ── -->
    <q-drawer
      :model-value="true"
      :width="256"
      :breakpoint="1024"
      side="left"
      bordered
      class="sidebar"
    >
      <div class="full-height column sidebar-inner">
        <!-- Logo -->
        <div class="sidebar-logo-wrap row items-center q-pa-md">
          <div class="logo-icon flex flex-center">
            <q-icon name="auto_awesome" size="22px" color="white" />
          </div>
          <div class="logo-text-wrap q-ml-sm">
            <div class="logo-title">Numerosia</div>
            <div class="logo-subtitle">Panel Admin</div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="q-px-sm q-pt-md flex-1">
          <div class="nav-section-label q-px-sm q-mb-xs">Principal</div>
          <q-item
            v-for="item in navItems"
            :key="item.route"
            clickable
            :active="activeNav === item.route"
            active-class="nav-item--active"
            class="nav-item rounded-lg q-mb-xs"
            @click="handleNavClick(item)"
          >
            <q-item-section avatar>
              <div class="nav-icon-wrap" :class="activeNav === item.route ? 'nav-icon-wrap--active' : ''">
                <q-icon :name="item.icon" size="18px" />
              </div>
            </q-item-section>
            <q-item-section>
              <q-item-label class="nav-label">{{ item.label }}</q-item-label>
              <q-item-label caption class="nav-caption">{{ item.caption }}</q-item-label>
            </q-item-section>
            <q-item-section side v-if="item.badge">
              <div class="nav-badge">{{ item.badge }}</div>
            </q-item-section>
          </q-item>

          <!-- Sección configuración -->
          <div class="nav-section-label q-px-sm q-mt-lg q-mb-xs">Sistema</div>

          <q-item
            clickable
            :active="activeNav === 'settings'"
            active-class="nav-item--active"
            class="nav-item rounded-lg"
            @click="activeNav = 'settings'"
          >
            <q-item-section avatar>
              <div class="nav-icon-wrap" :class="activeNav === 'settings' ? 'nav-icon-wrap--active' : ''">
                <q-icon name="settings" size="18px" />
              </div>
            </q-item-section>
            <q-item-section>
              <q-item-label class="nav-label">Ajustes</q-item-label>
              <q-item-label caption class="nav-caption">Configuración</q-item-label>
            </q-item-section>
          </q-item>
        </nav>

        <!-- Admin profile -->
        <div class="q-pa-sm">
          <div class="admin-profile-box q-pa-md" style="cursor:pointer" @click="handleLogout">
            <div class="row items-center" style="gap:10px">
              <div class="admin-avatar flex flex-center">
                <q-icon name="manage_accounts" size="20px" color="purple-3" />
              </div>
              <div class="col-grow min-width-0">
                <div class="admin-name text-ellipsis">{{ authStore.userName || 'Admin' }}</div>
                <div class="admin-role">Maestro Numerólogo</div>
              </div>
              <q-icon name="logout" size="16px" color="grey-6" />
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- ── Contenido principal ── -->
    <q-page-container>
      <q-page class="admin-page">

        <!-- Header sticky -->
        <header class="admin-header row items-center justify-between q-px-lg">
          <!-- Breadcrumb -->
          <div class="row items-center" style="gap:6px">
            <div class="breadcrumb-icon flex flex-center">
              <q-icon name="shield" size="14px" color="purple-4" />
            </div>
            <span class="text-grey-5" style="font-size:12px">Admin</span>
            <q-icon name="chevron_right" size="14px" color="grey-7" />
            <span class="breadcrumb-active">Gestión de Usuarios</span>
          </div>

          <!-- Acciones header -->
          <div class="row items-center" style="gap:10px">
            <div class="header-time-wrap row items-center" style="gap:6px">
              <q-icon name="schedule" size="14px" color="grey-6" />
              <span class="text-grey-6" style="font-size:11px">{{ currentTime }}</span>
            </div>
            <div class="header-divider" />
            <q-btn flat round dense class="notif-btn" @click="showNotifs = !showNotifs">
              <q-icon name="notifications" size="20px" color="grey-5" />
              <span class="notif-dot" />
            </q-btn>
            <button class="new-user-btn row items-center" style="gap:6px" @click="openNewUserDialog">
              <q-icon name="person_add" size="16px" color="white" />
              <span>Nuevo Usuario</span>
            </button>
          </div>
        </header>

        <!-- Body -->
        <div class="q-pa-lg">

          <!-- Título de sección -->
          <div class="section-header q-mb-lg">
            <h1 class="section-title">
              {{ activeNav === 'users' ? 'Gestión de Usuarios' : 
                 activeNav === 'dashboard' ? 'Panel de Control' : 
                 activeNav === 'readings' ? 'Historial de Lecturas' : 'Administración' }}
            </h1>
            <p class="section-subtitle">
              {{ activeNav === 'users' ? 'Administra y monitorea las cuentas de tus usuarios' : 
                 activeNav === 'dashboard' ? 'Resumen general del rendimiento de la plataforma' : 
                 activeNav === 'readings' ? 'Registro completo de las revelaciones astrales generadas' : '' }}
            </p>
          </div>

          <!-- ── VISTA DASHBOARD ── -->
          <div v-if="activeNav === 'dashboard'">
            <div class="stats-grid q-mb-lg">
              <div v-for="(stat, idx) in stats" :key="stat.label" class="stat-card" :class="`stat-card--${idx}`">
                <div class="stat-card__glow" />
                <div class="row items-start justify-between q-mb-md">
                  <div>
                    <div class="stat-label">{{ stat.label }}</div>
                    <div class="stat-value">{{ stat.value }}</div>
                  </div>
                  <div class="stat-icon-wrap" :class="`stat-icon-wrap--${idx}`">
                    <q-icon :name="stat.icon" size="22px" />
                  </div>
                </div>
                <div class="row items-center" style="gap:6px">
                  <q-icon :name="stat.trendIcon || 'trending_up'" size="14px" :color="stat.trendIconColor || 'green-4'" />
                  <span :class="stat.trendColor" class="stat-trend">{{ stat.trend || 'Sin cambio' }}</span>
                </div>
              </div>
            </div>
            
            <div class="row q-col-gutter-lg">
              <div class="col-12 col-md-8">
                <div class="table-card q-pa-lg flex flex-center" style="min-height:300px">
                   <div class="text-center">
                     <q-icon name="insights" size="64px" color="purple-9" class="q-mb-md" />
                     <div class="text-h6 text-grey-5">Estadísticas Detalladas</div>
                     <div class="text-caption text-grey-7">Próximamente: Gráficos de crecimiento y actividad.</div>
                   </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="table-card q-pa-lg">
                   <div class="text-weight-bold text-grey-4 q-mb-md">Actividad Reciente</div>
                   <q-list dark separator>
                     <q-item v-for="i in 5" :key="i" class="q-px-none">
                       <q-item-section avatar>
                         <q-avatar size="32px" color="purple-9" text-color="white" icon="history" />
                       </q-item-section>
                       <q-item-section>
                         <q-item-label class="text-caption text-grey-3">Nuevo usuario registrado</q-item-label>
                         <q-item-label caption class="text-grey-6">Hace {{ i * 15 }} minutos</q-item-label>
                       </q-item-section>
                     </q-item>
                   </q-list>
                </div>
              </div>
            </div>
          </div>

          <!-- ── VISTA USUARIOS ── -->
          <div v-if="activeNav === 'users'">
            <!-- Stats -->
            <div class="stats-grid q-mb-lg">
              <div v-for="(stat, idx) in stats" :key="stat.label" class="stat-card" :class="`stat-card--${idx}`">
                <div class="stat-card__glow" />
                <div class="row items-start justify-between q-mb-md">
                  <div>
                    <div class="stat-label">{{ stat.label }}</div>
                    <div class="stat-value">{{ stat.value }}</div>
                  </div>
                  <div class="stat-icon-wrap" :class="`stat-icon-wrap--${idx}`">
                    <q-icon :name="stat.icon" size="22px" />
                  </div>
                </div>
                <div class="row items-center" style="gap:6px">
                  <q-icon :name="stat.trendIcon || 'trending_up'" size="14px" :color="stat.trendIconColor || 'green-4'" />
                  <span :class="stat.trendColor" class="stat-trend">{{ stat.trend || 'Sin cambio' }}</span>
                </div>
              </div>
            </div>

          <!-- Tabla -->
          <div class="table-card">

            <!-- Filtros -->
            <div class="filters-bar row items-center justify-between q-pa-md" style="gap:12px;flex-wrap:wrap">
              <!-- Búsqueda -->
              <div class="search-wrap">
                <q-icon name="search" size="16px" color="grey-6" class="search-icon" />
                <input
                  v-model="search"
                  type="text"
                  class="search-input"
                  placeholder="Buscar por nombre, email o ID..."
                />
              </div>

              <!-- Filtros derecha -->
              <div class="row items-center" style="gap:8px;flex-wrap:wrap">
                <div class="filter-chip-wrap">
                  <q-icon name="calendar_today" size="14px" color="grey-6" />
                  <select v-model="dateFilter" class="filter-select">
                    <option>Últimos 30 días</option>
                    <option>Este mes</option>
                    <option>Año completo</option>
                  </select>
                </div>
                <div class="filter-chip-wrap">
                  <q-icon name="filter_list" size="14px" color="grey-6" />
                  <select v-model="planFilter" class="filter-select">
                    <option>Todos los Planes</option>
                    <option>Gratuito</option>
                    <option>Premium</option>
                    <option>VIP Ancestral</option>
                  </select>
                </div>
                <button class="export-btn row items-center" style="gap:6px" @click="exportData">
                  <q-icon name="download" size="14px" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>

            <!-- Tabla -->
            <div class="table-scroll">
              <table class="users-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Registro</th>
                    <th>Tipo de Plan</th>
                    <th>Estado</th>
                    <th class="text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="user-row"
                    :class="{ 'user-row--suspended': user.status === 'Suspendido' }"
                  >
                    <!-- Usuario -->
                    <td>
                      <div class="row items-center" style="gap:12px">
                        <div
                          class="user-avatar flex flex-center"
                          :class="{ 'user-avatar--suspended': user.status === 'Suspendido' }"
                        >
                          <span class="user-initials">{{ getUserInitials(user.name) }}</span>
                        </div>
                        <div>
                          <div
                            class="user-name"
                            :class="user.status === 'Suspendido' ? 'text-grey-6' : 'text-white'"
                          >
                            {{ user.name }}
                          </div>
                          <div class="user-email">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>

                    <!-- Fecha -->
                    <td :class="{ 'opacity-50': user.status === 'Suspendido' }">
                      <div class="date-main">{{ user.date }}</div>
                      <div class="date-time">{{ user.time }}</div>
                    </td>

                    <!-- Plan -->
                    <td :class="{ 'opacity-50': user.status === 'Suspendido' }">
                      <span class="plan-badge" :class="planClass(user.plan)">
                        <q-icon :name="planIcon(user.plan)" size="10px" class="q-mr-xs" />
                        {{ user.plan }}
                      </span>
                    </td>

                    <!-- Estado -->
                    <td>
                      <div class="status-chip" :class="statusChipClass(user.status)">
                        <div class="status-dot" :class="statusDotClass(user.status)" />
                        <span>{{ user.status }}</span>
                      </div>
                    </td>

                    <!-- Acciones -->
                    <td>
                      <div class="row items-center justify-end" style="gap:4px">
                        <q-btn flat round dense class="action-btn" @click="viewReadings(user)">
                          <q-icon name="auto_fix_normal" size="17px" />
                          <q-tooltip class="tooltip-custom">Ver Lecturas</q-tooltip>
                        </q-btn>

                        <template v-if="user.status !== 'Suspendido'">
                          <q-btn flat round dense class="action-btn" @click="editUser(user)">
                            <q-icon name="edit" size="17px" />
                            <q-tooltip class="tooltip-custom">Editar</q-tooltip>
                          </q-btn>
                          <q-btn flat round dense class="action-btn action-btn--danger" @click="suspendUser(user)">
                            <q-icon name="block" size="17px" />
                            <q-tooltip class="tooltip-custom">Suspender</q-tooltip>
                          </q-btn>
                        </template>

                        <template v-else>
                          <q-btn flat round dense class="action-btn action-btn--success" @click="reactivateUser(user)">
                            <q-icon name="check_circle" size="17px" />
                            <q-tooltip class="tooltip-custom">Reactivar</q-tooltip>
                          </q-btn>
                          <q-btn flat round dense class="action-btn action-btn--delete" @click="deleteUser(user)">
                            <q-icon name="delete" size="17px" />
                            <q-tooltip class="tooltip-custom">Eliminar</q-tooltip>
                          </q-btn>
                        </template>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Estado vacío -->
              <div v-if="filteredUsers.length === 0" class="empty-state">
                <q-icon name="search_off" size="48px" color="grey-8" />
                <div class="text-grey-6 q-mt-sm">No se encontraron usuarios</div>
              </div>
            </div>

            <!-- Paginación -->
            <div class="pagination-bar row items-center justify-between q-px-md q-py-sm">
              <span class="pag-info">
                Mostrando
                <strong class="text-grey-3">{{ filteredUsers.length }}</strong>
                de
                <strong class="text-grey-3">{{ users.length }}</strong>
                usuarios
              </span>

              <div class="row items-center" style="gap:4px">
                <button class="page-btn" @click="currentPage > 1 && currentPage--">
                  <q-icon name="chevron_left" size="16px" />
                </button>
                <button
                  v-for="p in visiblePages"
                  :key="p"
                  class="page-btn"
                  :class="{ 'page-btn--active': p === currentPage, 'page-btn--dots': p === '...' }"
                  :disabled="p === '...'"
                  @click="p !== '...' && (currentPage = p)"
                >
                  {{ p }}
                </button>
                <button class="page-btn" @click="currentPage < totalPages && currentPage++">
                  <q-icon name="chevron_right" size="16px" />
                </button>
              </div>
            </div>
          </div>
        </div>

          <!-- ── VISTA LECTURAS ── -->
          <div v-if="activeNav === 'readings'">
            <div class="table-card q-pa-xl flex flex-center" style="min-height:500px">
              <div class="text-center">
                <q-icon name="auto_fix_high" size="80px" color="purple-6" class="q-mb-lg glow-icon" />
                <h2 class="text-h5 text-white q-mb-sm">Historial de Lecturas Global</h2>
                <p class="text-grey-5 max-width-xs q-mx-auto">
                  Aquí aparecerán todas las lecturas generadas por el sistema. 
                  Esta sección está en mantenimiento para optimizar la carga de datos masivos.
                </p>
                <q-btn label="Refrescar Datos" color="purple-7" flat icon="refresh" class="q-mt-md" />
              </div>
            </div>
          </div>

          <!-- ── VISTA PAGOS ── -->
          <div v-if="activeNav === 'pagos'">
            <!-- KPIs de Pagos -->
            <div class="stats-grid q-mb-lg">
              <div v-for="(kpi, idx) in paymentKpis" :key="kpi.label" class="stat-card" :class="`stat-card--${idx % 3}`">
                <div class="stat-card__glow" />
                <div class="row items-start justify-between q-mb-md">
                  <div>
                    <div class="stat-label">{{ kpi.label }}</div>
                    <div class="stat-value">{{ kpi.value }}</div>
                  </div>
                  <div class="stat-icon-wrap" :class="`stat-icon-wrap--${idx % 3}`">
                    <q-icon :name="kpi.icon" size="22px" />
                  </div>
                </div>
                <div class="row items-center" style="gap:6px">
                  <q-icon :name="kpi.trendIcon" size="14px" :color="kpi.trendIconColor" />
                  <span :class="kpi.trendColor" class="stat-trend">{{ kpi.trend }}</span>
                </div>
              </div>
            </div>

            <!-- Tabla de Pagos -->
            <div class="table-card">
              <!-- Filtros de Pagos -->
              <div class="filters-bar row items-center justify-between q-pa-md" style="gap:12px;flex-wrap:wrap">
                <div class="search-wrap">
                  <q-icon name="search" size="16px" color="grey-6" class="search-icon" />
                  <input
                    v-model="paymentSearch"
                    type="text"
                    class="search-input"
                    placeholder="Buscar por usuario o referencia..."
                  />
                </div>

                <div class="row items-center" style="gap:8px;flex-wrap:wrap">
                  <div class="filter-chip-wrap">
                    <q-icon name="filter_list" size="14px" color="grey-6" />
                    <select v-model="paymentStatusFilter" class="filter-select">
                      <option>Todos</option>
                      <option>Completado</option>
                      <option>Pendiente</option>
                      <option>Cancelado</option>
                    </select>
                  </div>
                  <button class="export-btn row items-center" style="gap:6px" @click="exportPaymentsCSV">
                    <q-icon name="download" size="14px" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              <!-- Tabla -->
              <div class="table-scroll">
                <table class="users-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Usuario</th>
                      <th>Referencia</th>
                      <th>Monto</th>
                      <th>Estado</th>
                      <th class="text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tx in filteredTransactions" :key="tx.id" class="user-row">
                      <td>
                        <div class="date-main">{{ tx.date }}</div>
                        <div class="date-time">{{ tx.time }}</div>
                      </td>
                      <td>
                        <div class="row items-center" style="gap:10px">
                          <div class="user-avatar flex flex-center" style="width:32px; height:32px">
                            <span class="user-initials" style="font-size:10px">{{ tx.initials }}</span>
                          </div>
                          <div>
                            <div class="text-white text-weight-semibold" style="font-size:13px">{{ tx.user }}</div>
                            <div class="user-email">{{ tx.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="text-purple-3 font-mono" style="font-size:12px">
                        {{ tx.referencia }}
                      </td>
                      <td class="text-amber-4 text-weight-bold">
                        {{ tx.amount }}
                      </td>
                      <td>
                        <div class="status-chip" :class="paymentStatusChipClass(tx.status)">
                          <div class="status-dot" :class="paymentStatusDotClass(tx.status)" />
                          <span>{{ tx.status }}</span>
                        </div>
                      </td>
                      <td class="text-right">
                        <q-btn flat round dense class="action-btn" @click="viewTransaction(tx)">
                          <q-icon name="visibility" size="17px" />
                          <q-tooltip class="tooltip-custom">Ver Detalle</q-tooltip>
                        </q-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="filteredTransactions.length === 0" class="empty-state">
                  <q-icon name="search_off" size="48px" color="grey-8" />
                  <div class="text-grey-6 q-mt-sm">No se encontraron transacciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>

      <!-- ── Diálogos ── -->
      <!-- Detalle de Transacción -->
      <q-dialog v-model="paymentDetailDialog">
        <q-card class="bg-dark text-white" style="width: 450px; border: 1px solid rgba(168, 85, 247, 0.3)">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Detalle de Transacción</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-md">
            <div class="column q-gutter-y-sm">
              <div class="row justify-between border-b q-pb-xs" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span class="text-grey-5">Referencia</span>
                <span class="text-purple-3 text-weight-bold">{{ selectedTx?.referencia || 'N/A' }}</span>
              </div>
              <div class="row justify-between border-b q-pb-xs" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span class="text-grey-5">Usuario</span>
                <span class="text-white">{{ selectedTx?.user }}</span>
              </div>
              <div class="row justify-between border-b q-pb-xs" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span class="text-grey-5">Email</span>
                <span class="text-white">{{ selectedTx?.email }}</span>
              </div>
              <div class="row justify-between border-b q-pb-xs" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span class="text-grey-5">Monto</span>
                <span class="text-amber-4 text-h6 text-weight-bold">{{ selectedTx?.amount }}</span>
              </div>
              <div class="row justify-between border-b q-pb-xs" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                <span class="text-grey-5">Estado</span>
                <div class="status-chip" :class="paymentStatusChipClass(selectedTx?.status)">
                  <div class="status-dot" :class="paymentStatusDotClass(selectedTx?.status)" />
                  <span>{{ selectedTx?.status }}</span>
                </div>
              </div>
              <div class="row justify-between">
                <span class="text-grey-5">Fecha y Hora</span>
                <span class="text-white">{{ selectedTx?.date }} {{ selectedTx?.time }}</span>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="grey-5" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Nuevo/Editar Usuario -->
      <q-dialog v-model="editUserDialog">
        <q-card class="bg-dark text-white" style="width: 400px; border: 1px solid rgba(168, 85, 247, 0.3)">
          <q-card-section>
            <div class="text-h6">{{ isNewUser ? 'Nuevo Usuario' : 'Editar Usuario' }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none column q-gutter-y-md">
            <q-input v-model="userFormData.name" label="Nombre" dark color="purple-4" outlined dense />
            <q-input v-model="userFormData.email" label="Email" dark color="purple-4" type="email" outlined dense />
            <q-input v-if="isNewUser" v-model="userFormData.password" label="Contraseña" dark color="purple-4" type="password" outlined dense />
            <q-input v-model="userFormData.fecha_nacimiento" label="Fecha Nacimiento" dark color="purple-4" type="date" outlined dense stack-label />
            <q-select v-model="userFormData.plan" :options="['Gratuito', 'Premium', 'VIP Ancestral']" label="Plan" dark color="purple-4" outlined dense />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey-5" v-close-popup />
            <q-btn label="Guardar" color="purple-6" @click="saveUser" :loading="savingUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Eliminar Usuario -->
      <q-dialog v-model="deleteUserDialog">
        <q-card class="bg-dark text-white" style="width: 350px; border: 1px solid rgba(248, 113, 113, 0.4)">
          <q-card-section class="row items-center">
            <q-icon name="warning" color="red-4" size="32px" class="q-mr-sm" />
            <div class="text-h6">Eliminar Usuario</div>
          </q-card-section>
          <q-card-section class="text-grey-4">
            ¿Estás seguro que deseas eliminar a <strong>{{ userToDelete?.name }}</strong>? Esta acción no se puede deshacer.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey-5" v-close-popup />
            <q-btn label="Eliminar" color="red-5" @click="confirmDeleteUser" :loading="deletingUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Ver Lecturas Usuario -->
      <q-dialog v-model="viewReadingsDialog">
        <q-card class="bg-dark text-white" style="width: 500px; max-width: 90vw; border: 1px solid rgba(168, 85, 247, 0.3)">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Lecturas de {{ userToView?.name }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          
          <q-card-section class="q-pt-md">
            <div v-if="loadingReadings" class="flex flex-center q-pa-md">
              <q-spinner-puff color="purple-4" size="40px" />
            </div>
            <div v-else-if="userReadings.length === 0" class="text-center text-grey-5 q-pa-md">
              Este usuario no tiene lecturas generadas aún.
            </div>
            <q-list v-else bordered separator dark class="rounded-borders">
              <q-item v-for="lectura in userReadings" :key="lectura._id">
                <q-item-section>
                  <q-item-label class="text-purple-3 text-weight-bold" style="text-transform: capitalize">
                    Lectura {{ lectura.tipo }}
                  </q-item-label>
                  <q-item-label caption lines="3" class="text-grey-4">
                    {{ lectura.contenido }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption class="text-grey-6">
                    {{ new Date(lectura.fecha_lectura || lectura.createdAt).toLocaleDateString() }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axiosInstance from '../plugins/axios'

const router = useRouter()
const authStore = useAuthStore()

// ── Estado ──
const activeNav = ref('users')
const search = ref('')
const dateFilter = ref('Últimos 30 días')
const planFilter = ref('Todos los Planes')
const currentPage = ref(1)
const totalPages = ref(1)
const showNotifs = ref(false)
const loadingUsers = ref(true)

// Diálogos
const editUserDialog = ref(false)
const deleteUserDialog = ref(false)
const viewReadingsDialog = ref(false)
const isNewUser = ref(false)
const savingUser = ref(false)
const deletingUser = ref(false)
const loadingReadings = ref(false)
const userToDelete = ref(null)
const userToView = ref(null)
const userReadings = ref([])

const userFormData = ref({
  id: null,
  name: '',
  email: '',
  password: '',
  fecha_nacimiento: '',
  plan: 'Gratuito'
})

// ── Hora actual ──
const currentTime = ref(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }))

// ── Nav ──
const navItems = [
  { icon: 'dashboard',     label: 'Dashboard', caption: 'Vista general',  route: 'dashboard' },
  { icon: 'group',         label: 'Usuarios',  caption: 'Gestión de cuentas', route: 'users',    badge: null },
  { icon: 'auto_fix_high', label: 'Lecturas',  caption: 'Historial de lectura', route: 'readings' },
  { icon: 'payments',      label: 'Pagos',     caption: 'Transacciones', route: 'pagos' }
]

function handleNavClick (item) {
  activeNav.value = item.route
  if (item.path) router.push(item.path)
}

function handleLogout () {
  authStore.clearSession()
  router.replace('/')
}

// ── Estilos partículas ──
function particleStyle (i) {
  const sizes  = [2, 3, 2, 4, 2, 3, 2, 3, 2, 4, 3, 2]
  const delays = [0, 1.5, 3, 0.8, 2, 4, 1, 2.5, 0.3, 3.5, 1.8, 4.5]
  const lefts  = [5, 15, 25, 38, 48, 55, 63, 72, 80, 88, 93, 97]
  return {
    width:  sizes[i-1]  + 'px',
    height: sizes[i-1]  + 'px',
    left:   lefts[i-1]  + '%',
    animationDelay: delays[i-1] + 's',
    animationDuration: (6 + (i % 4)) + 's'
  }
}

// ── Iniciales ──
function getUserInitials (name) {
  return name ? name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '?'
}

// ── Stats ──
const stats = ref([
  { label: 'Total Usuarios', icon: 'groups',            value: '–', trend: '', trendColor: 'text-green-4', trendIcon: 'trending_up', trendIconColor: 'green-4', progress: 72 },
  { label: 'Activos',        icon: 'workspace_premium', value: '–', trend: '', trendColor: 'text-green-4', trendIcon: 'trending_up', trendIconColor: 'green-4', progress: 85 },
  { label: 'Inactivos',      icon: 'person_off',        value: '–', trend: '', trendColor: 'text-grey-5',  trendIcon: 'trending_down', trendIconColor: 'grey-5', progress: 28 }
])

// ── Usuarios ──
const users = ref([])

function mapUsuario (u) {
  const fecha = u.fecha_registro ? new Date(u.fecha_registro) : new Date()
  const fechaNac = u.fecha_nacimiento ? new Date(u.fecha_nacimiento).toISOString().split('T')[0] : ''
  return {
    id: u._id,
    name: u.nombre || '–',
    email: u.email || '–',
    fecha_nacimiento: fechaNac,
    date: fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    plan: u.rol === 'admin' ? 'VIP Ancestral' : (u.plan || 'Gratuito'),
    status: u.estado === 'activo' ? 'Activo' : 'Inactivo'
  }
}

async function loadUsers() {
  loadingUsers.value = true
  try {
    const { data } = await axiosInstance.get('/usuarios')
    users.value = data.map(mapUsuario)
    updateStats()
  } catch (err) {
    console.error('Error cargando usuarios:', err)
  } finally {
    loadingUsers.value = false
  }
}

function updateStats() {
  const total    = users.value.length
  const activos  = users.value.filter(u => u.status === 'Activo').length
  const inactivos = total - activos
  stats.value[0].value = total.toString()
  stats.value[1].value = activos.toString()
  stats.value[2].value = inactivos.toString()
  stats.value[0].trend = `+${total} total`
  stats.value[1].trend = `${Math.round(activos / Math.max(total, 1) * 100)}% activos`
  stats.value[2].trend = `${inactivos} offline`
  totalPages.value = Math.max(1, Math.ceil(total / 10))
}


// ── Filtrado ──
const filteredUsers = computed(() => {
  let list = users.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }
  if (planFilter.value !== 'Todos los Planes') {
    list = list.filter(u => u.plan === planFilter.value)
  }
  return list
})

// ── Paginación ──
const visiblePages = computed(() => {
  if (totalPages.value <= 5) return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  return [1, 2, 3, '...', totalPages.value]
})

// ── Clases dinámicas ──
function planClass (plan) {
  if (plan === 'VIP Ancestral') return 'plan-badge--vip'
  if (plan === 'Premium')       return 'plan-badge--premium'
  return 'plan-badge--free'
}

function planIcon (plan) {
  if (plan === 'VIP Ancestral') return 'auto_awesome'
  if (plan === 'Premium')       return 'star'
  return 'circle'
}

function statusChipClass (status) {
  if (status === 'Activo')     return 'status-chip--active'
  if (status === 'Suspendido') return 'status-chip--suspended'
  return 'status-chip--inactive'
}

function statusDotClass (status) {
  if (status === 'Activo')     return 'status-dot--active'
  if (status === 'Suspendido') return 'status-dot--suspended'
  return 'status-dot--inactive'
}

// ── Acciones ──
async function viewReadings(user) { 
  userToView.value = user
  viewReadingsDialog.value = true
  loadingReadings.value = true
  userReadings.value = []
  try {
    const { data } = await axiosInstance.get(`/lecturas/${user.id}`)
    userReadings.value = data
  } catch (err) {
    console.error('Error cargando lecturas:', err)
  } finally {
    loadingReadings.value = false
  }
}


function openNewUserDialog() {
  isNewUser.value = true
  userFormData.value = { id: null, name: '', email: '', password: '', fecha_nacimiento: '', plan: 'Gratuito' }
  editUserDialog.value = true
}

function editUser(user) { 
  isNewUser.value = false
  userFormData.value = { ...user, fecha_nacimiento: user.fecha_nacimiento || '' }
  editUserDialog.value = true
}

// ── Pagos ──
const paymentTransactions = ref([])
const paymentLoading = ref(false)
const paymentSearch = ref('')
const paymentStatusFilter = ref('Todos')
const paymentDetailDialog = ref(false)
const selectedTx = ref(null)

const paymentKpis = ref([
  { label: 'Ingresos Totales',  icon: 'account_balance_wallet', value: '$0.00', trend: 'Total Histórico', trendIcon: 'insights', trendIconColor: 'purple-4', trendColor: 'text-purple-3' },
  { label: 'Ventas Aprobadas', icon: 'shopping_cart',          value: '0',        trend: 'Transacciones', trendIcon: 'check_circle', trendIconColor: 'green-4', trendColor: 'text-green-4' },
  { label: 'Pagos Pendientes',  icon: 'pending_actions',        value: '$0.00',    trend: 'En proceso',     trendIcon: 'schedule', trendIconColor: 'amber-4', trendColor: 'text-amber-4' }
])

function mapPaymentStatus(status) {
  if (status === 'APPROVED') return 'Completado'
  if (status === 'PENDING') return 'Pendiente'
  if (status === 'DECLINED') return 'Cancelado'
  return status
}

async function loadPayments() {
  paymentLoading.value = true
  try {
    const { data } = await axiosInstance.get('/pagos')
    paymentTransactions.value = data.map(p => {
      const fecha = new Date(p.fecha_creacion || p.createdAt)
      const userObj = p.usuario_id || {}
      return {
        id: p._id,
        referencia: p.referencia,
        date: fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        user: userObj.nombre || 'Desconocido',
        email: userObj.email || 'N/A',
        initials: (userObj.nombre || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        amount: `$${p.monto.toLocaleString()}`,
        rawAmount: p.monto,
        status: mapPaymentStatus(p.estado)
      }
    })
    calculatePaymentKPIs()
  } catch (err) {
    console.error('Error cargando pagos:', err)
  } finally {
    paymentLoading.value = false
  }
}

function calculatePaymentKPIs() {
  const completados = paymentTransactions.value.filter(t => t.status === 'Completado')
  const pendientes = paymentTransactions.value.filter(t => t.status === 'Pendiente')
  
  const totalRev = completados.reduce((acc, t) => acc + t.rawAmount, 0)
  const totalPend = pendientes.reduce((acc, t) => acc + t.rawAmount, 0)

  paymentKpis.value[0].value = `$${totalRev.toLocaleString()}`
  paymentKpis.value[1].value = completados.length.toString()
  paymentKpis.value[2].value = `$${totalPend.toLocaleString()}`
}

function viewTransaction(tx) {
  selectedTx.value = tx
  paymentDetailDialog.value = true
}

const filteredTransactions = computed(() => {
  let list = paymentTransactions.value
  if (paymentSearch.value) {
    const q = paymentSearch.value.toLowerCase()
    list = list.filter(t => t.user.toLowerCase().includes(q) || t.referencia.toLowerCase().includes(q))
  }
  if (paymentStatusFilter.value !== 'Todos') {
    list = list.filter(t => t.status === paymentStatusFilter.value)
  }
  return list
})

function paymentStatusChipClass(status) {
  if (status === 'Completado') return 'status-chip--active'
  if (status === 'Pendiente')  return 'status-chip--inactive' // Usamos inactive para naranja
  return 'status-chip--suspended' // Usamos suspended para rojo
}

function paymentStatusDotClass(status) {
  if (status === 'Completado') return 'status-dot--active'
  if (status === 'Pendiente')  return 'status-dot--inactive'
  return 'status-dot--suspended'
}

function exportPaymentsCSV() {
  if (paymentTransactions.value.length === 0) return
  const headers = ['Ref', 'Fecha', 'Usuario', 'Email', 'Monto', 'Estado']
  const rows = paymentTransactions.value.map(t => [
    `"${t.referencia}"`,
    `"${t.date} ${t.time}"`,
    `"${t.user}"`,
    `"${t.email}"`,
    `"${t.amount}"`,
    `"${t.status}"`
  ])
  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `pagos_numeria_${new Date().getTime()}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  loadUsers()
  loadPayments()
})

async function saveUser() {
  savingUser.value = true
  try {
    const payload = {
      nombre: userFormData.value.name,
      email: userFormData.value.email,
      fecha_nacimiento: userFormData.value.fecha_nacimiento,
      rol: userFormData.value.plan === 'VIP Ancestral' ? 'admin' : 'usuario',
      plan: userFormData.value.plan
    }
    if (isNewUser.value) {
      payload.password = userFormData.value.password
      await axiosInstance.post('/usuarios', payload)
    } else {
      await axiosInstance.put(`/usuarios/${userFormData.value.id}`, payload)
    }
    editUserDialog.value = false
    loadUsers()
  } catch (err) {
    console.error('Error guardando usuario:', err)
  } finally {
    savingUser.value = false
  }
}

async function suspendUser (user) {
  try {
    await axiosInstance.patch(`/usuarios/${user.id}/estado`, { estado: 'inactivo' })
    user.status = 'Suspendido'
    updateStats()
  } catch (err) {
    console.error('Error suspendiendo usuario:', err)
  }
}

async function reactivateUser (user) {
  try {
    await axiosInstance.patch(`/usuarios/${user.id}/estado`, { estado: 'activo' })
    user.status = 'Activo'
    updateStats()
  } catch (err) {
    console.error('Error reactivando usuario:', err)
  }
}

function deleteUser (user) {
  userToDelete.value = user
  deleteUserDialog.value = true
}

async function confirmDeleteUser() {
  if (!userToDelete.value) return
  deletingUser.value = true
  try {
    await axiosInstance.delete(`/usuarios/${userToDelete.value.id}`)
    deleteUserDialog.value = false
    loadUsers()
  } catch (err) {
    console.error('Error eliminando usuario:', err)
  } finally {
    deletingUser.value = false
  }
}

function exportData() {
  if (users.value.length === 0) return
  
  const headers = ['Nombre', 'Email', 'Plan', 'Estado', 'Fecha Registro']
  const rows = users.value.map(u => [
    `"${u.name}"`, 
    `"${u.email}"`, 
    `"${u.plan}"`, 
    `"${u.status}"`, 
    `"${u.date} ${u.time}"`
  ])
  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `usuarios_numerosia_${new Date().getTime()}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>



<style scoped lang="scss">
/* ─── Variables ─── */
:root {
  --purple-main: #7f13ec;
  --purple-light: #a855f7;
  --purple-glow: rgba(127, 19, 236, 0.4);
}

/* ─── Layout ─── */
.admin-layout {
  background: #08050d;
  position: relative;
  overflow: hidden;
}

/* ─── Fondo atmosférico ─── */
.bg-orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);

  &--1 {
    width: 600px; height: 600px;
    top: -150px; right: -100px;
    background: radial-gradient(circle, rgba(127,19,236,0.12), transparent 70%);
    animation: orbFloat 8s ease-in-out infinite;
  }
  &--2 {
    width: 500px; height: 500px;
    bottom: -100px; left: 200px;
    background: radial-gradient(circle, rgba(88,28,135,0.1), transparent 70%);
    animation: orbFloat 11s ease-in-out infinite reverse;
  }
  &--3 {
    width: 300px; height: 300px;
    top: 40%; left: 40%;
    background: radial-gradient(circle, rgba(168,85,247,0.05), transparent 70%);
    animation: orbFloat 14s ease-in-out infinite;
  }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-30px) scale(1.05); }
}

/* ─── Partículas ─── */
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.5);
  bottom: -10px;
  animation: particleRise linear infinite;
}

@keyframes particleRise {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.5; }
  100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
}

/* ─── Sidebar ─── */
.sidebar {
  background: linear-gradient(180deg, #130b1e 0%, #0f0918 100%) !important;
  border-right: 1px solid rgba(127, 19, 236, 0.15) !important;
  box-shadow: 4px 0 40px rgba(0, 0, 0, 0.4) !important;
  z-index: 100 !important;
}

/* Force dark background on Quasar drawer internals */
:deep(.q-drawer) {
  background: linear-gradient(180deg, #130b1e 0%, #0f0918 100%) !important;
}

:deep(.q-drawer__content) {
  background: linear-gradient(180deg, #130b1e 0%, #0f0918 100%) !important;
}

.admin-layout :deep(.q-drawer--left) {
  background: #0f0918 !important;
}

:deep(.q-page-container) {
  background: transparent !important;
}

.sidebar-inner {
  position: relative;
}

.sidebar-logo-wrap {
  border-bottom: 1px solid rgba(127, 19, 236, 0.1);
  padding: 20px 16px;
  gap: 10px;
}

.logo-icon {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #7f13ec, #a855f7);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(127, 19, 236, 0.5);
  flex-shrink: 0;
  animation: logoPulse 3s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(127,19,236,0.5); }
  50%       { box-shadow: 0 4px 30px rgba(127,19,236,0.8); }
}

.logo-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #a855f7, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-subtitle {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #64748b;
  margin-top: 1px;
}

.nav-section-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #4b5563;
}

.nav-item {
  color: #6b7280;
  min-height: 46px;
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(127, 19, 236, 0.08) !important;
    color: #a855f7;
    transform: translateX(2px);
  }
}

.nav-item--active {
  background: linear-gradient(135deg, rgba(127, 19, 236, 0.18), rgba(168, 85, 247, 0.08)) !important;
  color: #a855f7 !important;
  border: 1px solid rgba(127, 19, 236, 0.2) !important;
}

.nav-icon-wrap {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;

  &--active {
    background: rgba(127, 19, 236, 0.2);
    box-shadow: 0 0 12px rgba(127,19,236,0.3);
  }
}

.nav-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.nav-caption {
  font-size: 10px;
  color: #4b5563;
  margin-top: 1px;
}

.nav-badge {
  background: linear-gradient(135deg, #7f13ec, #a855f7);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 99px;
}

.admin-profile-box {
  background: linear-gradient(135deg, rgba(127, 19, 236, 0.08), rgba(168, 85, 247, 0.04));
  border: 1px solid rgba(127, 19, 236, 0.15);
  border-radius: 12px;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(127, 19, 236, 0.3);
    background: linear-gradient(135deg, rgba(127, 19, 236, 0.15), rgba(168, 85, 247, 0.08));
  }
}

.admin-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(127,19,236,0.3), rgba(168,85,247,0.15));
  border: 1px solid rgba(168,85,247,0.2);
  flex-shrink: 0;
}

.admin-name {
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-role {
  font-size: 10px;
  color: #6b7280;
  margin-top: 1px;
}

/* ─── Página ─── */
.admin-page {
  background: transparent;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.admin-header {
  height: 60px;
  background: rgba(13, 8, 20, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(127, 19, 236, 0.12);
  position: sticky;
  top: 0;
  z-index: 200;
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.breadcrumb-icon {
  width: 24px; height: 24px;
  border-radius: 6px;
  background: rgba(127,19,236,0.15);
}

.breadcrumb-active {
  font-size: 12px;
  font-weight: 600;
  color: #a855f7;
}

.notif-btn {
  position: relative;
  &:hover { background: rgba(127,19,236,0.1) !important; }
}

.notif-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 8px; height: 8px;
  background: linear-gradient(135deg, #7f13ec, #a855f7);
  border-radius: 50%;
  border: 2px solid #08050d;
  animation: notifPulse 2s ease-in-out infinite;
}

@keyframes notifPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.2); }
}

.header-divider {
  width: 1px; height: 24px;
  background: rgba(127, 19, 236, 0.15);
}

.new-user-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #7f13ec, #6e0fd4);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 4px 20px rgba(127, 19, 236, 0.4);
  transition: all 0.2s;
  letter-spacing: 0.01em;

  &:hover {
    background: linear-gradient(135deg, #8f1ffe, #7f13ec);
    box-shadow: 0 6px 24px rgba(127, 19, 236, 0.6);
    transform: translateY(-1px);
  }
}

/* ─── Sección header ─── */
.section-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: -0.03em;
  margin: 0;
}

.section-subtitle {
  font-size: 13px;
  color: #4b5563;
  margin: 0;
}

/* ─── Stats ─── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
}

.stat-card {
  position: relative;
  border-radius: 16px;
  padding: 22px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: default;

  &--0 {
    background: linear-gradient(135deg, #1a0f28 0%, #13092a 100%);
    border: 1px solid rgba(127,19,236,0.2);
  }
  &--1 {
    background: linear-gradient(135deg, #0e1f1a 0%, #0a1a15 100%);
    border: 1px solid rgba(52,211,153,0.15);
  }
  &--2 {
    background: linear-gradient(135deg, #1c1410 0%, #170f0b 100%);
    border: 1px solid rgba(251,146,60,0.15);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
}

.stat-card__glow {
  position: absolute;
  top: -40px; right: -40px;
  width: 120px; height: 120px;
  border-radius: 50%;
  filter: blur(30px);
  pointer-events: none;

  .stat-card--0 & { background: rgba(127,19,236,0.2); }
  .stat-card--1 & { background: rgba(52,211,153,0.15); }
  .stat-card--2 & { background: rgba(251,146,60,0.12); }
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #6b7280;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;

  .stat-card--0 & { color: #a855f7; }
  .stat-card--1 & { color: #34d399; }
  .stat-card--2 & { color: #fb923c; }
}

.stat-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;

  &--0 { background: rgba(127,19,236,0.2); color: #a855f7; }
  &--1 { background: rgba(52,211,153,0.15); color: #34d399; }
  &--2 { background: rgba(251,146,60,0.15); color: #fb923c; }
}

.stat-trend {
  font-size: 11px;
  font-weight: 700;
}

.stat-progress {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 10px;
}

.stat-progress__fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &--0 { background: linear-gradient(to right, #7f13ec, #a855f7); }
  &--1 { background: linear-gradient(to right, #059669, #34d399); }
  &--2 { background: linear-gradient(to right, #c2410c, #fb923c); }
}

/* ─── Tabla card ─── */
.table-card {
  background: linear-gradient(135deg, #130b1e 0%, #0f091a 100%);
  border: 1px solid rgba(127, 19, 236, 0.15);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* ─── Filtros ─── */
.filters-bar {
  border-bottom: 1px solid rgba(127, 19, 236, 0.08);
  background: rgba(0,0,0,0.2);
}

.search-wrap {
  position: relative;
  flex: 1;
  max-width: 380px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 9px 14px 9px 36px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(127, 19, 236, 0.12);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 13px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: #4b5563; }
  &:focus {
    border-color: rgba(127, 19, 236, 0.5);
    box-shadow: 0 0 0 3px rgba(127, 19, 236, 0.08);
  }
}

.filter-chip-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(127, 19, 236, 0.12);
  border-radius: 10px;
  padding: 7px 10px;
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover { border-color: rgba(127,19,236,0.3); }
}

.filter-select {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  font-family: inherit;

  option { background: #130b1e; }
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid rgba(127, 19, 236, 0.2);
  border-radius: 10px;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: rgba(127, 19, 236, 0.1);
    color: #a855f7;
    border-color: rgba(127,19,236,0.4);
  }
}

/* ─── Tabla ─── */
.table-scroll {
  overflow-x: auto;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: rgba(127,19,236,0.3);
    border-radius: 10px;
  }
}

.users-table {
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(127, 19, 236, 0.1);

    th {
      padding: 14px 20px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #4b5563;
      text-align: left;
      white-space: nowrap;

      &.text-right { text-align: right; }
    }
  }

  tbody {
    tr.user-row {
      border-bottom: 1px solid rgba(127, 19, 236, 0.05);
      transition: all 0.15s;

      &:hover {
        background: rgba(127, 19, 236, 0.05);
        td { transform: none; }
      }
      &:last-child { border-bottom: none; }

      td {
        padding: 14px 20px;
        vertical-align: middle;
      }
    }
  }
}

/* ─── Avatar usuario ─── */
.user-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(127,19,236,0.25), rgba(168,85,247,0.1));
  border: 1px solid rgba(168,85,247,0.2);
  flex-shrink: 0;

  &--suspended {
    filter: grayscale(1);
    opacity: 0.4;
  }
}

.user-initials {
  font-size: 12px;
  font-weight: 800;
  color: #c084fc;
  letter-spacing: -0.02em;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
}

.user-email {
  font-size: 11px;
  color: #4b5563;
  margin-top: 1px;
}

.date-main {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
}

.date-time {
  font-size: 10px;
  color: #4b5563;
  margin-top: 1px;
}

/* ─── Plan badge ─── */
.plan-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  transition: all 0.2s;

  &--vip {
    background: linear-gradient(135deg, rgba(127,19,236,0.25), rgba(168,85,247,0.1));
    color: #a855f7;
    border: 1px solid rgba(127, 19, 236, 0.35);
    text-shadow: 0 0 8px rgba(168,85,247,0.5);
  }
  &--premium {
    background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.08));
    color: #fbbf24;
    border: 1px solid rgba(245,158,11,0.25);
  }
  &--free {
    background: rgba(75, 85, 99, 0.2);
    color: #6b7280;
    border: 1px solid rgba(75, 85, 99, 0.2);
  }
}

/* ─── Status chip ─── */
.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;

  &--active {
    background: rgba(52, 211, 153, 0.1);
    color: #34d399;
    border: 1px solid rgba(52,211,153,0.2);
  }
  &--inactive {
    background: rgba(75, 85, 99, 0.15);
    color: #6b7280;
    border: 1px solid rgba(75, 85, 99, 0.15);
  }
  &--suspended {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239,68,68,0.2);
  }
}

/* ─── Estado dot ─── */
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;

  &--active    { background: #34d399; box-shadow: 0 0 6px rgba(52,211,153,0.6); animation: dotPulse 2s ease-in-out infinite; }
  &--inactive  { background: #6b7280; }
  &--suspended { background: #f87171; }
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

/* ─── Botones acción ─── */
.action-btn {
  color: #4b5563 !important;
  border-radius: 8px !important;
  transition: all 0.15s !important;
  width: 32px !important; height: 32px !important;

  &:hover { background: rgba(127, 19, 236, 0.12) !important; color: #a855f7 !important; }

  &--danger:hover  { background: rgba(239, 68, 68, 0.12) !important; color: #f87171 !important; }
  &--success:hover { background: rgba(52, 211, 153, 0.12) !important; color: #34d399 !important; }
  &--delete:hover  { background: rgba(239, 68, 68, 0.2) !important;  color: #fff !important; }
}

.tooltip-custom {
  background: #1a0f2e !important;
  color: #e2e8f0 !important;
  font-size: 11px !important;
  border: 1px solid rgba(127,19,236,0.2) !important;
}

/* ─── Estado vacío ─── */
.empty-state {
  text-align: center;
  padding: 48px;
}

/* ─── Paginación ─── */
.pagination-bar {
  background: rgba(0, 0, 0, 0.25);
  border-top: 1px solid rgba(127, 19, 236, 0.08);
}

.pag-info {
  font-size: 11px;
  color: #4b5563;
}

.page-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid rgba(127, 19, 236, 0.12);
  border-radius: 8px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: rgba(127, 19, 236, 0.12);
    color: #a855f7;
    border-color: rgba(127,19,236,0.3);
  }
  &--active {
    background: linear-gradient(135deg, #7f13ec, #6e0fd4) !important;
    color: #fff !important;
    border-color: #7f13ec !important;
    box-shadow: 0 4px 12px rgba(127,19,236,0.4);
  }
  &--dots { border: none; cursor: default; }
  &:disabled { opacity: 0.3; cursor: default; }
}
</style>