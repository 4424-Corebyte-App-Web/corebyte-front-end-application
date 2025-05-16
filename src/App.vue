<script>
import SideNavbar from './public/components/side-navbar.component.vue'
import SideNavbar from './public/components/side-navbar.component.vue';
export default {
    components: {SideNavbar},
    data(){
      return {
        items:[]
      }
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
    }
  }
}
</script>

<template>
  <side-navbar/>
  <div style="display: flex;">
    <!-- Mostrar sidebar solo si el usuario está logueado -->
    <side-navbar v-if="isLoggedIn" :items="items" />
    <div style="flex-grow: 1; padding: 1rem;">
      <!-- Reenviamos eventos del componente cargado en router-view -->
      <router-view v-slot="{ Component }">
        <component :is="Component" @login="onLogin" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
