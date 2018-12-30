<template id="Home">
    <v-container class="home">
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm10 md8>
          <v-card flat>
            <v-toolbar dark flat color="secondary">
              <v-toolbar-title>Erstelle deinen Brief</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-layout align-center justify-center wrap>
                  <v-flex xs12 sm4 offset-sm1 class="my-3">
                    <h2>Absender</h2>
                    <v-text-field clearable name="sender-name" label="Name" type="text" v-model="sender.name"></v-text-field>
                    <v-text-field clearable name="sender-street" label="Straße" type="text" v-model="sender.street"></v-text-field>
                    <v-text-field clearable name="sender-place" label="PLZ und Ort" type="text" v-model="sender.place"></v-text-field>
                    <v-text-field clearable name="sender-country" label="Land" type="text" v-model="sender.country"></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12 sm4 class="my-3">
                    <h2>Empfänger</h2>
                    <v-text-field clearable name="recipient-name" label="Name" type="text" v-model="recipient.name"></v-text-field>
                    <v-text-field clearable name="recipient-street" label="Straße" type="text" v-model="recipient.street"></v-text-field>
                    <v-text-field clearable name="recipient-place" label="PLZ und Ort" type="text" v-model="recipient.place"></v-text-field>
                    <v-text-field clearable name="recipient-country" label="Land" type="text" v-model="recipient.country"></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12 sm10>
                    <h2 class="mt-3">Sendedaten</h2>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm1 class="my-3">
                    <v-text-field prepend-icon="place" clearable name="place" label="Sendeort" type="text" v-model="place"></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12 sm4 class="my-3">
                    <v-text-field prepend-icon="date_range" name="date" label="Sendedatum" type="date" v-model="date"></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12 sm10>
                    <h2 class="mt-3">Deine Nachricht</h2>
                  </v-flex>
                  <v-flex xs12 sm10 class="mt-3">
                    <v-textarea auto-grow solo clearable required :rules="contentRules" placeholder="Lass deiner Kreativität freien Lauf!" rows="10" name="content" label="Deine Nachricht" type="text" v-model="content"></v-textarea>
                  </v-flex>      
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mb-5" :disabled="!valid" @click.prevent="onSubmit">
                Erstellen
              </v-btn>
               <v-spacer></v-spacer>
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
        contentRules: [
          v => !!v || 'Du musst eine Nachricht angeben.'
        ],
        sender: {
          name: '',
          street: '',
          place: '',
          country: ''
        },
        recipient: {
          name: '',
          street: '',
          place: '',
          country: ''
        },
        place: '',
        date: '',
        content: '',
        background: ''
      }
    },
    methods: {
      onSubmit() {
         if (this.$refs.form.validate()) {
          console.log("JAPPPP!")
        }
      }
    }
  }
</script>
