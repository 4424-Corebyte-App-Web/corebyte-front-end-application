<script>
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
    }
}
</script>

<template>
  <div style="display: flex;">
    <side-navbar :items="items" />
    <div style="flex-grow: 1; padding: 1rem;">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
</style>
