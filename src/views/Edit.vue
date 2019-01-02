<template>
  <div class="edit" id="top">
    <div v-if="authorised">
      <v-container v-if="showSuccessAlert">
        <v-layout align-center justify-center wrap>
          <v-flex xs12 sm11 md11 lg8 xl6>
            <v-alert type="success" dismissible v-model="showSuccessAlert" trasition="fade-transition" style="margin-bottom:-20px">Dein Brief wurde erfolgreich geändert!</v-alert>
          </v-flex>
        </v-layout>
      </v-container>

      <app-linkbox :editlink="editPath" :playerlink="playerPath"></app-linkbox>
      
      <v-container class="letter">
        <v-layout align-center justify-center wrap>
            <v-flex xs12 sm11 md11 lg8 xl6>
              <v-card flat>
                <v-toolbar dark flat color="secondary">
                  <v-toolbar-title>
                    Vorschau
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <app-letter :letter="letter"></app-letter>
                </v-card-text>
                <v-card-actions>
                  <v-layout justify-center align-center>
                    <v-flex xs3 md2  class="mb-4" stye="display:inline-flex">
                      <v-btn color="primary" @click.prevent="isEditing = true" :disabled="isEditing">Bearbeiten</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </v-container>
    </div>

    <app-form :onSubmit="onEditSubmit" v-if="isEditing" :closeable="true" @close-form="isEditing = false" :l-data="letter">
      <span slot="title">Bearbeite deinen Brief</span>
      <span slot="button-value">Bearbeiten</span>
    </app-form>
    
    <app-wrong-key v-if="!authorised">{{ errorMessage }}</app-wrong-key>  
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import appLinkbox from '@/components/Linkbox.vue'
import appWrongKey from '@/components/WrongKey.vue'
import appLetter from '@/components/Letter.vue'
import appForm from '@/components/Form.vue'

export default {
  data() {
    return {
      letter: {},
      authorised: false,
      isEditing: false,
      showSuccessAlert: false,
      errorMessage: ''
    }
  },
  props: ['id', 'lkey'],
  computed: {
    editPath() {
      let path = location.href;
      return path;
    },
    playerPath() {
      if (typeof location.origin === 'undefined') {
        location.origin = location.protocol + '//' + location.host;
      }
      
      let path = location.origin + '/letter/' + this.id;
      return path;
    }
  },
  methods: {
    async getData() {
      try{
        const doc = await db.collection('letters').doc(this.id);
        const data = await doc.get();
        if (!data.exists) {
          this.errorMessage = 'Der Brief ist nicht vorhanden.'
          console.log('Das Dokument wurde nicht gefunden!');
          return false;
        } else {
          return data.data();
        }
      } catch(e) {
         this.errorMessage = 'Fehler beim Laden der Daten.'
        console.log('Fehler beim Laden der Daten: ', e);
      }
    },
    async onEditSubmit(letter) {
      try {
        await db.collection('letters').doc(this.id).set(letter); 
        this.isEditing = false;
        this.showSuccessAlert = true;
        this.$scrollTo('#top', 300);
      } catch(e) {
        console.log('Fehler beim Updaten der Daten: ', e);
      } 
    }
  },
  components: {
    appLinkbox,
    appWrongKey,
    appLetter,
    appForm
  },
  async created() {
    this.letter = await this.getData();
    if (!this.letter) {
      this.letter = {};
      return;
    }
    if (this.lkey == this.letter.key) {
      this.authorised = true;
    } else {
      this.letter = {}
      this.errorMessage = 'Du hast einen falschen Schlüssel angegeben.'
      console.log('Zugang verweigert! Schlüssel fehlt.');
    }
  },
}
</script>

