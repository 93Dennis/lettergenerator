<template>
  <v-card>
    <v-toolbar dark flat color="secondary">
      <v-toolbar-title style="width:100%">Erstelle einen Brief</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-layout align-center justify-center wrap>
          <v-flex xs12 sm4 offset-sm1 class="my-3">
            <h2>Absender</h2>
            <v-text-field clearable name="sender-name" label="Name" type="text" v-model="letter.sender.name"></v-text-field>
            <v-text-field clearable name="sender-street" label="Straße" type="text" v-model="letter.sender.street"></v-text-field>
            <v-text-field clearable name="sender-place" label="PLZ und Ort" type="text" v-model="letter.sender.place"></v-text-field>
            <v-text-field clearable name="sender-country" label="Land" type="text" v-model="letter.sender.country"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm4 class="my-3">
            <h2>Empfänger</h2>
            <v-text-field clearable name="recipient-name" label="Name" type="text" v-model="letter.recipient.name"></v-text-field>
            <v-text-field clearable name="recipient-street" label="Straße" type="text" v-model="letter.recipient.street"></v-text-field>
            <v-text-field clearable name="recipient-place" label="PLZ und Ort" type="text" v-model="letter.recipient.place"></v-text-field>
            <v-text-field clearable name="recipient-country" label="Land" type="text" v-model="letter.recipient.country"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10>
            <h2 class="mt-3">Absendedaten</h2>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1 class="my-3">
            <v-text-field prepend-icon="place" clearable name="place" label="Absendeort" type="text" v-model="letter.place"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm4 class="my-3">
            <v-text-field prepend-icon="date_range" name="date" label="Absendedatum" type="date" v-model="letter.date"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm10>
            <h2 class="mt-3">Deine Nachricht</h2>
          </v-flex>
          <v-flex xs12 sm10 class="mt-3">
            <v-textarea auto-grow solo clearable required :rules="contentRules" placeholder="Lass deiner Kreativität freien Lauf!" rows="10" name="content" label="Deine Nachricht" type="text" v-model="letter.content"></v-textarea>
          </v-flex>   
          <v-flex xs12 sm10>
            <h2 class="mt-3">Privater Schlüssel</h2>
            <span class="caption">Damit nur du deinen Brief am Ende bearbeiten kannst, denke dir ein Schlüsselwort aus.</span>
            <v-text-field prepend-icon="lock" clearable required :rules="keyRules" name="key" label="Schlüssel" type="text" v-model="letter.key" class="mt-2"></v-text-field>
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
</template>

<script>
import { db } from '@/firebase/init'
import { letterObject } from '@/objects/Letter.vue'
import FormRules from '@/mixins/FormRules.vue'

export default {
  data() {
    return {
      letter: letterObject
    }
  },
  mixins: [FormRules],
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
       try {
          const response = await db.collection('letters').add(this.letter); 
          this.$router.push({ name: 'edit', params: { id: response.id, lkey: this.letter.key } });
        } catch(e) {
          console.log('Fehler beim Senden an Server: ', e);
        } 
      }
    }
  }
}
</script>
