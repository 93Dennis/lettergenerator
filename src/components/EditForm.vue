<template>
  <v-card>
    <v-toolbar dark flat color="secondary" height="40">
      <v-toolbar-title style="width:100%">
        Briefinhalt bearbeiten     
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="isCollapsed" @click="isCollapsed = false">keyboard_arrow_down</v-icon>
      <v-icon v-if="!isCollapsed" @click="isCollapsed = true">keyboard_arrow_up</v-icon>
    </v-toolbar>
    <v-expand-transition>
      <v-card-text v-show="!isCollapsed">
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
              <v-textarea 
                auto-grow solo clearable required 
                :rules="contentRules" 
                placeholder="Lass deiner Kreativität freien Lauf!" 
                rows="10" 
                name="content" 
                label="Deine Nachricht" 
                type="text" 
                v-model="letter.content"
                ref="textarea"
                @click.once="textareaFixAdd"
                @blur.once="textareaFixRemove"
              ></v-textarea>
            </v-flex>   
            <v-flex xs12 sm10>
              <h2 class="mt-3">Privater Schlüssel</h2>
              <v-text-field prepend-icon="lock" clearable required :rules="keyRules" name="key" label="Schlüssel" type="text" v-model="letter.key" class="mt-2"></v-text-field>
            </v-flex>   
          </v-layout>
        </v-form>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
import FormRules from '@/mixins/FormRules.vue'

export default {
  data() {
    return {
      isCollapsed: true
    }
  },
  props: ['letter'],
  mixins: [FormRules],
  watch: {
    valid() {
      this.$emit('validChanged', this.valid);
    }
  },
  methods: {
    textareaFixAdd() {
      this.letter.content += ' ';
    },
    textareaFixRemove() {
      let lng = this.letter.content.length;
      if (this.letter.content.substring(lng - 1, lng) == ' ') {
        this.letter.content = this.letter.content.substring(0, lng - 2);
      }
    }
  }
}
</script>
