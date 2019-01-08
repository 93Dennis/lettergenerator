<template>
  <v-container fill-height id="wrong-key">
    <v-layout row wrap align-center justify-center class="mb-5">
      <v-flex xs12 sm10 md8 class="mb-5">
        <v-card flat class="mb-5">
          <v-toolbar dark flat color="error">
            <v-toolbar-title>Zugriff verweigert!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout class="my-2" align-center justify-center>
              <v-flex xs2 sm1 class="text-xs-right mr-2"> 
                <v-icon color="error" large>error_outline</v-icon>
              </v-flex>
              <v-flex xs9 sm8 lg6>
                <span class="subheading">
                  <slot></slot>
                </span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-layout wrap class="mt-4">
                <v-flex xs10 sm8 class="offset-xs1">
                  <v-form v-model="valid" ref="login-form">
                    <v-text-field required solo autofocus :clearable="true" label="Schlüsselwort" prepend-icon="lock" :rules="rules" v-model="input"></v-text-field> 
                  </v-form>            
                </v-flex> 
                <v-flex xs12 sm2 class="text-xs-center text-sm-left">
                  <v-btn 
                    :disabled="!valid" 
                    color="success" 
                    class="ml-2-sm" 
                    style="height:49px"
                    @click="onSubmit"
                    :class="{'ml-2': $vuetify.breakpoint.smAndUp}"
                  >Login</v-btn>
                </v-flex>    
              </v-layout>  
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      rules: [
         v => !!v || '',
         v => v == this.lKey || ''
      ],
      input: ''
    }
  },
  props: ['lKey', 'id'],
  methods: {
    onSubmit() {
      this.$router.push({ name: 'edit', params: { id: this.id, lkey: this.lKey } });
      location.reload();
    }
  }
}
</script>