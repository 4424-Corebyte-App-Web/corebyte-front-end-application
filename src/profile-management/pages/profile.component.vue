<script>
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";
import defaultPhoto from '../../assets/defecto.jpg';
import { getCurrentUser, updateUserPassword } from '../services/profile.service';

export default {
  name: "profile",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      activeSection: "account",
      defaultPhoto: defaultPhoto,
      profile: {
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
      },
      passwords: {
        current: "",
        new: "",
        confirm: "",
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      message: {
        text: "",
        type: "", // 'success' o 'error'
      },
    };
  },
  async created() {
    try {
      const userData = await getCurrentUser();
      this.profile = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user',
      };
      // Don't store password in plain text in memory
      this.passwords.current = '••••••••';
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
      this.$router.push("/login");
    }
  },
  computed: {
    isPasswordFormValid() {
      return (
        this.passwords.new &&
        this.passwords.confirm &&
        this.passwords.new === this.passwords.confirm &&
        this.passwords.new.length >= 8
      );
    },
  },
  methods: {
    handleImageError(event) {
      // Set default image if the current one fails to load
      event.target.src = this.defaultPhoto;
    },
    uploadPhoto() {
      alert("Función para subir foto no implementada");
    },
    async updatePassword() {
      if (!this.isPasswordFormValid) return;

      this.isLoading = true;
      this.message = { text: "", type: "" };

      try {
        // If current password is masked (showing dots), don't send the masked value
        const currentPassword = this.passwords.current === '••••••••' ? '' : this.passwords.current;
        
        await updateUserPassword(currentPassword, this.passwords.new);
        
        this.message = {
          text: this.$t('profile.messages.passwordUpdated'),
          type: "success",
        };
        
        // Reset password fields
        this.passwords = { 
          current: '••••••••', 
          new: '', 
          confirm: '' 
        };
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        this.message = {
          text: this.$t('profile.messages.updateError'),
          type: "error",
        };
      } finally {
        this.isLoading = false;

        if (this.message.text) {
          setTimeout(() => {
            this.message = { text: "", type: "" };
          }, 5000);
        }
      }
    },
  },
};
</script>
<template>
  <div class="profile-layout">
    <!-- Sidebar -->
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

    <!-- Main Content -->
    <main class="main-content">
      <div class="p-8 text-white">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">{{ $t("profile.title") }}</h2>
          <LanguageSwitcher />
        </div>

        <div class="profile-container">
          <!-- Profile Info Card -->
          <div class="profile-card">
            <div class="flex items-start gap-6">
              <div class="avatar">
                <img
                  :src="profile.photoUrl || defaultPhoto"
                  @error="handleImageError"
                  alt="Foto de perfil"
                  class="w-32 h-32 rounded-full object-cover border-2 border-gold-500"
                />
                <button class="btn-outline mt-4 w-full" @click="uploadPhoto">
                  {{ $t("profile.uploadPhoto") }}
                </button>
              </div>
              <div class="profile-info">
                <h3 class="text-xl font-semibold mb-2">{{ profile.username }}</h3>
                <div class="space-y-2">
                  <p>
                    <span class="text-gold-400 font-medium"
                      >{{ $t("profile.texts.Email") }}:</span
                    >
                    {{ profile.email }}
                  </p>
                  <p>
                    <span class="text-gold-400 font-medium"
                      >{{ $t("profile.texts.Role") }}:</span
                    >
                    {{ profile.role }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Change Password Card -->
          <div class="profile-card mt-6">
            <h3 class="text-xl font-semibold mb-4">
              {{ $t("profile.texts.change") }}
            </h3>

            <div class="space-y-4">
              <!-- Current Password -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">{{
                  $t("profile.texts.Password")
                }}</label>
                <div class="relative">
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    v-model="passwords.current"
                    :placeholder="
                      profile.password ? '••••••••' : 'No disponible'
                    "
                    disabled
                    class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <button
                    v-if="profile.password"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    type="button"
                  >
                    {{ showCurrentPassword ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>
              </div>

              <!-- New Password -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">{{
                  $t("profile.texts.new")
                }}</label>
                <div class="relative">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    v-model="passwords.new"
                    placeholder="••••••••"
                    class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <button
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    type="button"
                  >
                    {{ showNewPassword ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">{{
                  $t("profile.texts.confirm")
                }}</label>
                <div class="relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="passwords.confirm"
                    placeholder="••••••••"
                    class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <button
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    type="button"
                  >
                    {{ showConfirmPassword ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>
              </div>
              <div class="pt-2">
                <button
                  @click="updatePassword"
                  :disabled="!isPasswordFormValid || isLoading"
                  class="w-full py-2 px-4 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isLoading ? "Guardando..." : $t("profile.texts.update") }}
                </button>
              </div>
            </div>
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

h2 {
  color: #b58b25;
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
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.profile-card {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.profile-card:hover {
  border-color: #b58b25;
  box-shadow: 0 0 15px rgba(181, 139, 37, 0.1);
}

.avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #b58b25;
}

.profile-info {
  flex: 1;
}

.text-gold-400 {
  color: #d4af37;
}

@media (max-width: 1024px) {
  .profile-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
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
}

@media (max-width: 640px) {
  .flex.items-start {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-info {
    margin-top: 1.5rem;
    text-align: center;
  }

  .btn-outline {
    justify-content: center;
  }
}
</style>
