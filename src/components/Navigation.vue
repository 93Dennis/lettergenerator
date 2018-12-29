<template>
  <div>
    <nav> 
      <v-toolbar app :extended="extended" flat extension-height="100" dark color="primary">
        <v-toolbar-title class="headline" to="/">
          <span 
            class="text-uppercase" 
            :style="{fontSize: titleSize + 'px'}"
          >
            Blutmond
          </span>
          <span 
            class="font-weight-light grey--text text--lighten-4"
            :style="{fontSize: titleSize + 'px'}"
          > 
            | BriefGenerator
          </span>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :href="navLinks.home.path">
            <span>{{ navLinks.home.name }}</span>
          </v-btn>
          <v-btn flat :href="navLinks.impressum.path">
            <span>{{ navLinks.impressum.name }}</span>
          </v-btn>
          <v-btn fab small light :href="emailPath">
            <v-icon small color="primary darken-2">{{ navLinks.email.icon }}</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-side-icon 
          dark 
          @click="extended = !extended"
          class="hidden-md-and-up"  
        ></v-toolbar-side-icon>
        
        <v-list v-if="extended" slot="extension" dark class="grey darken-3 py-0">
        <v-list-tile router :to="navLinks.home.path">
          <v-list-tile-content>
            <v-list-tile-title>{{ navLinks.home.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider dark></v-divider>
        <v-list-tile router :to="navLinks.impressum.path">
          <v-list-tile-content>
            <v-list-tile-title>{{ navLinks.impressum.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-toolbar>

      
    </nav>

  </div>
</template>

<script>
export default {
  data() {
    return {
      extended: false, 
      navLinks: {
        home: {
          name: 'Generator',
          path: '/'
        },
        impressum: {
          name: 'Impressum',
          path: '/impressum'
        },
        email: {
          icon: 'email',
          address: 'dennis.przytarski@gmx.de'
        }
      }
    }
  },
  computed: {
    titleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 20
        default: return 24
      }
    },
    emailPath() {
      return 'mailto:' + this.navLinks.email.address;
    }
  }
}
</script>

<style>

</style>
