<script>
import { useRouter } from "vue-router";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "TypeAccount",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      profile: {
        role: "",
      },
    };
  },

  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        this.profile = {
          ...this.profile,
          role: userData.role,
        };
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    } else {
      console.error("Usuario no encontrado");
      this.$router.push("/login");
    }
  },
};
</script>
<template>
  <div class="profile-layout">
    <aside class="sidebar">
      <div class="sidebar-buttons">
        <router-link
          to="/profile"
          class="btn-outline"
          :class="{ active: activeSection === 'account' }"
        >
          {{ $t("nav.account") }}
        </router-link>
        <router-link
          to="/profile/type-account"
          class="btn-outline"
          :class="{ active: activeSection === 'plans' }"
        >
          {{ $t("nav.plans") }}
        </router-link>
        <router-link
          to="/profile/benefits"
          class="btn-outline"
          :class="{ active: activeSection === 'benefits' }"
        >
          {{ $t("nav.benefits") }}
        </router-link>
      </div>
    </aside>
    <main class="main-content">
      <div class="p-8 text-white">
        <h2 class="text-2xl font-bold mb-4">{{ $t("plans.title") }}</h2>
        <LanguageSwitcher />
        <div class="current-plan">
          <div>
            <p class="font-semibold">
              {{ $t("plans.texts.role") }}: {{ profile.role }}
            </p>
            <p>{{ $t("plans.texts.plan") }}: Start</p>
          </div>
        </div>
        <span @click="goToBenefits" class="btn-select">
          {{ $t("plans.texts.change") }}
        </span>
        <h3 class="text-xl font-semibold mb-4">
          {{ $t("plans.information.title") }}
        </h3>
        <div class="plans-grid">
          <div class="plan-card">
            <div class="plan-header">
              <h4 class="text-lg font-bold mb-2">
                {{ $t("plans.information.text.pro") }}
              </h4>
              <div class="plan-price">
                $19.99 <span class="plan-period">/mes</span>
              </div>
            </div>
            <ul class="plan-features">
              <li v-for="i in 5" :key="'pro' + i">
                {{ $t(`plans.information.text.pro${i}`) }}
              </li>
            </ul>
            <button class="btn-select">
              {{ $t("plans.button") }}
            </button>
          </div>

          <div class="plan-card featured">
            <div class="plan-badge">Popular</div>
            <div class="plan-header">
              <h4 class="text-lg font-bold mb-2">
                {{ $t("plans.information.text.premium") }}
              </h4>
              <div class="plan-price">
                $49.99 <span class="plan-period">/mes</span>
              </div>
            </div>
            <ul class="plan-features">
              <li v-for="i in 5" :key="'premium' + i">
                {{ $t(`plans.information.text.premium${i}`) }}
              </li>
            </ul>
            <button class="btn-select">
              {{ $t("plans.button") }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-layout {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: #eee;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 280px;
  background-color: #1a1a1a;
  padding: 2rem 1rem;
  border-right: 1px solid #333;
  position: relative;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
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
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn-outline:hover,
.btn-outline.router-link-active,
.btn-outline.active {
  background-color: #b58b25;
  color: #121212;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #121212;
  min-height: 100vh;
  overflow-y: auto;
  max-width: calc(100% - 280px);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.plan-card {
  background: #2b2b2b;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.75rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.plan-card.featured {
  border-color: #b58b25;
  box-shadow: 0 0 15px rgba(181, 139, 37, 0.2);
}

.plan-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #b58b25;
  color: #121212;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.plan-header {
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.plan-price {
  font-size: 1.75rem;
  color: #b58b25;
  font-weight: 700;
  margin: 0.5rem 0;
}

.plan-period {
  color: #888;
  font-size: 1rem;
  font-weight: 400;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
}

.plan-features li {
  padding: 0.4rem 0;
  color: #ccc;
  position: relative;
  padding-left: 1.75rem;
  line-height: 1.5;
}

.plan-features li:before {
  content: "✓";
  color: #b58b25;
  position: absolute;
  left: 0;
}

.current-plan {
  background: linear-gradient(135deg, #2b2b2b 0%, #1e1e1e 100%);
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.current-plan:hover {
  border-color: #b58b25;
  box-shadow: 0 4px 12px rgba(181, 139, 37, 0.15);
}

.btn-select {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #b58b25;
  color: #121212;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  margin-top: auto;
}

.btn-select:hover {
  background: #d4aa3a;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .profile-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 1rem;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #333;
  }

  .sidebar-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .btn-outline {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .main-content {
    max-width: 100%;
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }

  .current-plan {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

.profile-container {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 30px;
  color: #eee;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-2xl {
  font-size: 1.75rem;
  color: #b58b25;
  margin-bottom: 1.5rem;
}

.text-xl {
  font-size: 1.25rem;
  color: #b58b25;
  margin-bottom: 1rem;
}

.bg-gray-700 {
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.border-gray-600 {
  border: 1px solid #333;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.border-gray-600:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: #b58b25;
}

.text-lg {
  font-size: 1.125rem;
  color: #b58b25;
  margin-bottom: 0.5rem;
}

.list-disc {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
}

.list-disc li {
  padding: 0.25rem 0;
  color: #ccc;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.5;
}

.list-disc li:before {
  content: "•";
  color: #b58b25;
  font-size: 1.5em;
  position: absolute;
  left: 0;
  top: -2px;
}

.text-yellow-400 {
  color: #b58b25;
}

.border-yellow-400 {
  border-color: #b58b25;
}

.hover\:bg-yellow-400:hover {
  background-color: #b58b25;
  color: #121212;
}

.text-blue-400 {
  color: #60a5fa;
}

.hover\:underline:hover {
  text-decoration: underline;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-300 {
  color: #d1d5db;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-6 {
  gap: 1.5rem;
}

.p-4 {
  padding: 1rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.transition {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

button {
  cursor: pointer;
  outline: none;
}

button:focus {
  outline: 2px solid #b58b25;
  outline-offset: 2px;
}
</style>
