<script>
<<<<<<< feature/authentication
import SideNavbar from './public/components/side-navbar.component.vue';

export default {
  name: 'App',
  components: { SideNavbar },
  data() {
    return {
      isLoggedIn: false,
      items: [
        { label: 'option.status', to: '/status' },
        { label: 'option.record', to: '/record' },
      ]
    }
  },
  methods: {
    onLogin() {
      this.isLoggedIn = true;
=======
import SideNavbar from './public/components/side-navbar.component.vue'; // Assuming this is your navbar

export default {
    name: 'App',
    components: { SideNavbar },
    data(){
      return {
        items:[
          {label: 'option.status', to:'/status'},
          {label: 'option.record', to:'/record'},
        ]
      }
>>>>>>> develop
    }
  }
}
</script>

<template>
<<<<<<< feature/authentication
  <div style="display: flex;">
    <!-- Mostrar sidebar solo si el usuario está logueado -->
    <side-navbar v-if="isLoggedIn" :items="items" />
    <div style="flex-grow: 1; padding: 1rem;">
      <!-- Reenviamos eventos del componente cargado en router-view -->
      <router-view v-slot="{ Component }">
        <component :is="Component" @login="onLogin" />
      </router-view>
    </div>
=======
  <div class="app-container" style="display: flex;">
    <side-navbar />
    <main style="flex: 1; padding: 1rem;">

      <router-view />
    </main>
>>>>>>> develop
  </div>
</template>

<style scoped>
</style>
