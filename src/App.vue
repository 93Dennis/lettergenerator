<template>
  <v-app class="grey lighten-2">
    <app-nav/>
    <v-content class="mx-1 my-2">
      <router-view/>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    appNav: Navigation,
    appFooter: Footer
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }

  h1 {
    margin: 0 0 15px;
  }
  h4{
    margin: 0 0 5px;
  }
</style>

