<script>
import SideNavbar from './public/components/side-navbar.component.vue';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'App',
    components: { SideNavbar },
    setup() {
      const isLoggedIn = ref(false);
      const router = useRouter();
      
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        isLoggedIn.value = !!token;
        
        if (!isLoggedIn.value && !['login', 'register'].includes(router.currentRoute.value.name)) {
          router.push('/login');
        }
      };

      onMounted(checkAuth);

      watch(() => router.currentRoute.value.name, checkAuth);

      const onLogin = (userData) => {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify(userData.user));
        isLoggedIn.value = true;
        router.push('/app');
      };


      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isLoggedIn.value = false;
        router.push('/login');
      };

      return {
        isLoggedIn,
        onLogin,
        logout,
        items: [
          { label: 'Inicio', to: '/app' },
          { label: 'Perfil', to: '/app/profile' },
          { label: 'Órdenes', to: '/app/orders' },
          { label: 'Lotes', to: '/app/batch-management' },
          { label: 'Cerrar Sesión', command: logout }
        ]
      };
    }
}
</script>

<template>
  <div style="display: flex;">
    <side-navbar v-if="isLoggedIn" :items="items" />
    <div style="flex-grow: 1; padding: 1rem;">
      <router-view v-slot="{ Component }">
        <component :is="Component" @login="onLogin" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
