<template>
  <div class="edit" id="top">
    <div v-if="authorised">
      <v-container v-if="showSuccessAlert">
        <v-layout align-center justify-center wrap>
          <v-flex xs12 sm11 lg8 xl6>
            <v-alert type="success" dismissible v-model="showSuccessAlert" trasition="fade-transition" style="margin-bottom:-20px">Dein Brief wurde erfolgreich geändert!</v-alert>
          </v-flex>
        </v-layout>
      </v-container>

      <app-linkbox :editlink="editPath" :playerlink="playerPath"></app-linkbox>
      
      <v-container class="letter">
        <v-layout align-center justify-center wrap>
            <v-flex xs12 sm11 lg8 xl6>
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
                  <v-layout justify-center align-center wrap class="mb-4">
                      <v-btn 
                        class="my-2" 
                        color="primary" 
                        @click.prevent="changeFontSize(0.1)" 
                        :disabled="letter.fontSizeMultiplier > 1.7"
                      >
                        Schrift vergrößern
                      </v-btn>
                      <v-btn 
                        class="my-2" 
                        color="primary" 
                        @click.prevent="changeFontSize(-0.1)" 
                        :disabled="letter.fontSizeMultiplier < 0.41"
                      >
                        Schrift verkleinern
                      </v-btn>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </v-container>
    </div>

    <div id="editform">
      <v-container class="form" v-if="!isEditing && authorised">
        <v-layout align-center justify-center wrap>
          <v-flex xs12 sm11 md11 lg8 xl6>
            <v-card flat>
              <v-toolbar dark flat color="secondary">
                <v-toolbar-title style="width:100%">
                  <v-layout>
                    <v-flex>
                      Briefinhalt bearbeiten
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs2 md1 class="pl-4">
                      <v-icon @click="onEdit">keyboard_arrow_down</v-icon>
                    </v-flex>
                  </v-layout>        
                </v-toolbar-title>
              </v-toolbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <app-form 
        :onSubmit="onEditSubmit" 
        :closeable="true" 
        :l-data="letter"
        @close-form="isEditing = false" 
        @l-data-changed="letter = $event" 
        id="editform"
        v-if="isEditing" 
      >
        <span slot="title">Briefinhalt bearbeiten</span>
        <span slot="button-value">Bearbeiten</span>
      </app-form>
    </div>
    
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
        const data = await db.collection('letters').doc(this.id).get();
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
    onEdit() {
      this.isEditing = true;
      this.$scrollTo('#editform', 800);
    },
    async onEditSubmit(letter) {
      try {
        await db.collection('letters').doc(this.id).set(letter); 
        this.isEditing = false;
        this.showSuccessAlert = true;
        this.$scrollTo('#top', 800);
      } catch(e) {
        console.log('Fehler beim Updaten der Daten: ', e);
      } 
    },
    async changeFontSize(n) {
      this.letter.fontSizeMultiplier.size += n;
      this.letter.fontSizeMultiplier.lineHeight += n * 30;
      try {
        await db.collection('letters').doc(this.id).set(this.letter);
      } catch(e) {
        console.log('Fehler beim Updaten der Fontgröße: ', e);
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
      this.letter = {};
      this.errorMessage = 'Du hast einen falschen Schlüssel angegeben.';
      console.log('Zugang verweigert! Schlüssel fehlt.');
    }
  },
}
</script>

