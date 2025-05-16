<template>
  <div class="profile-page">
    <!-- Sidebar -->
    <aside class="sidebar">
      <input type="text" placeholder="Buscar" class="search" />
      <div class="sidebar-buttons">
        <button
            class="btn-outline"
            :class="{ active: activeSection === 'account' }"
            @click="activeSection = 'account'"
        >
          Mi cuenta
        </button>
        <button
            class="btn-outline"
            :class="{ active: activeSection === 'plans' }"
            @click="activeSection = 'plans'"
        >
          Planes
        </button>
        <button
            class="btn-outline"
            :class="{ active: activeSection === 'benefits' }"
            @click="activeSection = 'benefits'"
        >
          Beneficios
        </button>
      </div>
      <small>Corebyte 2025</small>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Mi Cuenta -->
      <div v-if="activeSection === 'account'">
        <h1>Perfil</h1>
        <div class="profile-container">
          <section class="profile-card photo-section">
            <div class="avatar">
              <img :src="profile.photoUrl || defaultPhoto" alt="Foto de perfil" />
            </div>
            <div class="profile-info-text">
              <h3>{{ profile.name }}</h3>
              <p><strong>Email:</strong> {{ profile.email }}</p>
              <p><strong>Rol:</strong> {{ profile.role }}</p>
              <button class="btn-outline" @click="uploadPhoto">Subir nueva foto</button>
            </div>
          </section>

          <section class="profile-card password-card">
            <label>Contraseña actual</label>
            <div class="input-wrapper">
              <input :type="showCurrentPassword ? 'text' : 'password'" v-model="passwords.current" placeholder="••••••••" />
              <button class="eye-btn" @click="showCurrentPassword = !showCurrentPassword">
                {{ showCurrentPassword ? '👁️‍🗨️' : '👁️' }}
              </button>
            </div>

            <label>Nueva contraseña</label>
            <div class="input-wrapper">
              <input :type="showNewPassword ? 'text' : 'password'" v-model="passwords.new" placeholder="••••••••" />
              <button class="eye-btn" @click="showNewPassword = !showNewPassword">
                {{ showNewPassword ? '👁️‍🗨️' : '👁️' }}
              </button>
            </div>

            <label>Confirmar contraseña</label>
            <div class="input-wrapper">
              <input :type="showConfirmPassword ? 'text' : 'password'" v-model="passwords.confirm" placeholder="••••••••" />
              <button class="eye-btn" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? '👁️‍🗨️' : '👁️' }}
              </button>
            </div>
          </section>
        </div>
      </div>

      <!-- Planes -->
      <div v-else-if="activeSection === 'plans'">
        <h2>Tipo de cuenta</h2>
        <div class="plan-box">
          <span>Rol: {{ profile.role }}</span>
          <span>Plan actual: Start</span>
          <a href="#" class="change-plan">¿Deseas cambiar de plan?</a>
        </div>
        <h3>Planes</h3>
        <div class="plans-cards">
          <div class="plan-card">
            <h4>TraceWine Pro</h4>
            <ul>
              <li>Gestión de inventario: Control de hasta 500 productos</li>
              <li>Alertas automáticas de stock</li>
              <li>Control de proceso de vinificación</li>
              <li>Gestión de clientes y ventas</li>
              <li>Atención por correo electrónico</li>
            </ul>
            <button class="btn-outline">Elegir</button>
          </div>

          <div class="plan-card">
            <h4>TraceWine Premium</h4>
            <ul>
              <li>Todo lo del plan Pro</li>
              <li>Gestión de hasta 1000 productos</li>
              <li>Soporte por chat en vivo</li>
              <li>Simulación de pedidos</li>
              <li>Atención personalizada</li>
            </ul>
            <button class="btn-outline">Elegir</button>
          </div>
        </div>
      </div>

      <!-- Beneficios -->
      <div v-else-if="activeSection === 'benefits'">
        <h2>Beneficios del Plan Pro</h2>
        <div class="plan-box">
          <p>
            Adquiriendo el Plan Pro, podrás acceder a los siguientes beneficios que TraceWine tiene para ofrecerte:
          </p>
        </div>
        <div class="plan-card single">
          <ul>
            <li>Gestión de inventarios: Control de hasta 500 productos</li>
            <li>Alertas de stock bajo o excedente</li>
            <li>Control del proceso de vinificación</li>
            <li>Gestión adaptable a distintos tipos de vino</li>
            <li>Administración de cartera de clientes</li>
            <li>Seguimiento de pedidos</li>
            <li>Simulación de pedidos</li>
            <li>Soporte: correo y chat en vivo</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: 'account',
      defaultPhoto: '/default-profile.png', // Ajusta según ruta foto default
      profile: {
        email: '',
        name: '',
        role: '',
        photoUrl: null,
      },
      passwords: {
        current: '',
        new: '',
        confirm: '',
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    }
  },
  created() {
    fetch('/user.json')
        .then((res) => {
          if (!res.ok) throw new Error('No se pudo cargar user.json')
          return res.json()
        })
        .then((data) => {
          this.profile.email = data.email
          this.profile.name = data.name
          this.profile.role = data.role
          // Si tienes foto, asigna profile.photoUrl = data.photoUrl
        })
        .catch((err) => {
          console.error('Error al cargar user.json:', err)
        })
  },
  methods: {
    uploadPhoto() {
      alert('Función para subir foto no implementada')
    },
  },
}
</script>

<style scoped>
/* Igual estilo que el ejemplo anterior, adaptado para que se vea oscuro y con acento dorado */

.profile-page {
  display: flex;
  background-color: #121212;
  color: #eee;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 230px;
  background-color: #1a1a1a;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 0.9rem;
  color: #bbb;
}

.search {
  width: 100%;
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid #b58b25;
  background-color: #121212;
  color: #eee;
  outline: none;
  margin-bottom: 15px;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-outline {
  background: none;
  border: 1px solid #b58b25;
  color: #b58b25;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-outline:hover,
.btn-outline.active {
  background-color: #b58b25;
  color: #121212;
}

.sidebar small {
  margin-top: auto;
  font-size: 0.7rem;
  color: #444;
}

.main-content {
  flex: 1;
  padding: 40px;
}

.profile-container {
  display: flex;
  gap: 30px;
}

.profile-card {
  background-color: #2b2b2b;
  border-radius: 12px;
  padding: 25px 30px;
  color: #eee;
  display: flex;
  flex-direction: column;
}

.photo-section {
  width: 300px;
  align-items: center;
  text-align: center;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #444;
  margin-bottom: 20px;
  object-fit: cover;
}

.password-card {
  gap: 15px;
  display: flex;
  flex-direction: column;
  width: 280px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 8px 38px 8px 12px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  color: #121212;
}

.eye-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #b58b25;
}

.plan-box {
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.plans-cards {
  display: flex;
  gap: 20px;
}

.plan-card {
  background-color: #2b2b2b;
  border-radius: 12px;
  padding: 20px;
  width: 280px;
}

.plan-card.single {
  width: 100%;
}

.plan-card ul {
  list-style-type: disc;
  padding-left: 20px;
}

.change-plan {
  display: inline-block;
  margin-top: 8px;
  color: #b58b25;
  text-decoration: underline;
  cursor: pointer;
}

h1,
h2,
h3,
h4 {
  color: #b58b25;
}
</style>
