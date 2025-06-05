<script>
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "benefits",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      activeSection: "benefits",
    };
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
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
          :class="{ active: $route.path === '/profile' }"
        >
          {{ $t("nav.account") }}
        </router-link>
        <router-link
          to="/profile/type-account"
          class="btn-outline"
          :class="{ active: $route.path === '/profile/type-account' }"
        >
          {{ $t("nav.plans") }}
        </router-link>
        <router-link
          to="/profile/benefits"
          class="btn-outline"
          :class="{ active: $route.path === '/profile/benefits' }"
        >
          {{ $t("nav.benefits") }}
        </router-link>
      </div>
    </aside>
    <main class="main-content">
      <div class="p-8 text-white">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-[#b58b25]">
            {{ $t("benefits.title") }}
          </h2>
          <LanguageSwitcher />
        </div>

        <div class="benefits-container">
          <!-- Plan Pro Benefits -->
          <div class="benefits-card">
            <div class="benefit-header">
              <h3 class="text-xl font-semibold">{{ $t("benefits.title") }}</h3>
            </div>
            <ul class="benefit-features">
              <li v-for="i in 9" :key="'pro' + i">
                {{ $t(`benefits.text.benefit${i}`) }}
              </li>
            </ul>
          </div>

          <!-- Plan Premium Benefits -->
          <div class="benefits-card featured">
            <div class="plan-badge">Popular</div>
            <div class="benefit-header">
              <h3 class="text-xl font-semibold">{{ $t("benefits2.title") }}</h3>
            </div>
            <ul class="benefit-features">
              <li v-for="i in 6" :key="'premium' + i">
                {{ $t(`benefits2.text.benefit${i}`) }}
              </li>
            </ul>
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
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: sticky;
  top: 2rem;
}

.btn-outline {
  background: none;
  border: 1px solid #b58b25;
  color: #b58b25;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  text-decoration: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline:hover,
.btn-outline.router-link-active,
.btn-outline.active {
  background-color: #b58b25;
  color: #121212;
  transform: translateX(5px);
}

.main-content {
  flex: 1;
  padding: 0;
  background-color: #121212;
  min-height: 100vh;
  overflow-y: auto;
  color: #b58b25;
}

/* Benefits Cards */
.benefits-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.benefits-card {
  background: #2b2b2b;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.benefit-header {
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  position: relative;
}

.plan-badge {
  position: absolute;
  top: -1rem;
  right: 1rem;
  background: #b58b25;
  color: #121212;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.benefit-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
}

.benefit-features li {
  padding: 0.4rem 0;
  color: #ccc;
  position: relative;
  padding-left: 1.75rem;
  line-height: 1.5;
}

.benefit-features li:before {
  content: "✓";
  color: #b58b25;
  position: absolute;
  left: 0;
}

.benefits-card.featured {
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

.benefits-header {
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.benefits-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
}

.benefits-features li {
  padding: 0.5rem 0;
  color: #ccc;
  position: relative;
  padding-left: 2rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
}

.check-icon {
  color: #b58b25;
  margin-right: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .profile-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    padding: 1rem;
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
    width: 100%;
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .benefits-container {
    grid-template-columns: 1fr;
  }

  .benefits-card {
    padding: 1.5rem;
  }
}
</style>
