<template>
  <v-app class="grey lighten-5">
    <app-nav/>
    <v-content class="mx-1 my-2">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    appNav: Navigation
  },
  data () {
    return {
      // 
    }
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

