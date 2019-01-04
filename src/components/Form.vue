<template>
  <v-container class="form">
    <v-layout align-center justify-center wrap>
      <v-flex xs12 sm11 md11 lg8 xl6>
        <v-card flat>
          <v-toolbar dark flat color="secondary">
            <v-toolbar-title style="width:100%">
              <v-layout>
                <v-flex>
                  <slot name="title"></slot>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs2 md1 class="pl-4">
                  <v-icon v-if="closeable" @click="$emit('close-form')">close</v-icon>
                </v-flex>
              </v-layout>        
            </v-toolbar-title>
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
            <v-btn color="primary" class="mb-5" :disabled="!valid" @click.prevent="submit">
              <slot name="button-value"></slot>
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
      keyRules: [
        v => !!v || 'Du musst einen Schlüssel angeben'
      ],
      letter: {
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
        key: '',
        fontSizeMultiplier: {
          size: 1,
          lineHeight: 150
        }
      }
      
    }
  },
  props:{
    onSubmit: Function,
    closeable: {
      type: Boolean,
      default: false
    },
    lData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.$emit('lDataChanged', this.letter);
        this.onSubmit(this.letter);
      }
    }
  },
  created() {
    if (this.lData !== undefined) {
      this.letter = this.lData;
    }
  }
}
</script>
