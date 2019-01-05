<template>
  <div class="edit" id="top">
    <div v-if="authorised">
      <v-container v-if="showSuccessAlert">
        <v-layout align-center justify-center wrap>
          <v-flex xs12 sm11 lg8 xl6>
            <v-alert type="success" dismissible v-model="showSuccessAlert" trasition="fade-transition" style="margin-bottom:-20px">{{ successMessage }}</v-alert>
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
                  <v-layout wrap>
                    <v-flex xs12 sm3 class="ma-2">
                      <v-card>
                        <v-toolbar dark flat color="secondary" height="40">
                          <v-toolbar-title class="text-xs-center subheading" style="width:100%">
                            Schriftgr&ouml;&szlig;e
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                          <div class="text-xs-center" style="width:100%">
                            <v-btn 
                              icon
                              class="ma-2 elevation-2" 
                              color="success"
                              @click.prevent="changeFontSize(0.1)" 
                              :disabled="letter.fontSizeMultiplier > 1.7"
                            >
                              <v-icon>add</v-icon>
                            </v-btn>
                            <v-btn 
                              icon
                              class="ma-2 elevation-2" 
                              color="error" 
                              @click.prevent="changeFontSize(-0.1)" 
                              :disabled="letter.fontSizeMultiplier < 0.41"
                            >
                              <v-icon>remove</v-icon>
                            </v-btn>
                          </div>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm8 class="ma-2">
                      <v-card>
                        <v-toolbar dark flat color="secondary" height="40">
                          <v-toolbar-title class="text-xs-center subheading" style="width:100%">
                            Schriftart
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                          <div class="text-xs-center" style="width:100%">
                            
                          
                          </div>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  
                    <v-flex xs12 class="ma-2">
                      <v-card>
                        <v-toolbar dark flat color="secondary" height="40">
                          <v-toolbar-title class="text-xs-center subheading" style="width:100%">
                            Briefpapier
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                          <v-container grid-list-sm fluid class="pa-0">
                            <v-layout row wrap>
                              <v-flex
                                v-for="(bg, key) in backgrounds" 
                                :key="key"
                                xs6
                                sm3
                                md2
                                d-flex
                                class="pa-2"
                              >
                                <v-card tile class="d-flex">
                                  <v-img 
                                    :src="bg" 
                                    aspect-ratio="1" 
                                    :class="[letter.background == key ? 'bg-preview-active' : '', 'grey lighten-2']"
                                    style="cursor: pointer"
                                    @click="letter.background = key"
                                  ></v-img>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                      </v-card>
                    </v-flex> 
                    <v-flex sm12 class="ma-4"> 
                      <div class="text-xs-center" style="width:100%">
                        <v-btn 
                          color="success"
                          @click.prevent="onEditSubmit(letter, 'Deine Briefoptionen wurden erfolgreich gespeichert!')" 
                        >
                          <v-icon small>done</v-icon> &nbsp; Speichern
                        </v-btn>
                        <v-btn 
                          color="error" 
                          @click.prevent="resetOptions" 
                        >
                          <v-icon small>close</v-icon> &nbsp; Zur&uuml;cksetzen
                        </v-btn>
                      </div>
                    </v-flex>              
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
      successMessage: '',
      errorMessage: '',
      backgrounds: {},
      firstFontSize: {},
      firstBackground: './1.png'
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
    importBackgrounds(r) {
      let imgs = {};
      r.keys().forEach(key => (imgs[key] = r(key)));
      return imgs;
    },
    onEdit() {
      this.isEditing = true;
      this.$scrollTo('#editform', 800);
    },
    resetOptions() {
      this.letter.fontSizeMultiplier.size = this.firstFontSize.size;
      this.letter.fontSizeMultiplier.lineHeight = this.firstFontSize.lineHeight;
      this.letter.background = this.firstBackground;
    },
    async onEditSubmit(letter, message) {
      try {
        await db.collection('letters').doc(this.id).set(letter); 
        this.isEditing = false;
        this.showSuccessAlert = true;
        this.successMessage = message;
        this.$scrollTo('#top', 800);
      } catch(e) {
        console.log('Fehler beim Updaten der Daten: ', e);
      } 
    },
    async changeFontSize(n) {
      this.letter.fontSizeMultiplier.size += n;
      this.letter.fontSizeMultiplier.lineHeight += n * 30;
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
      this.firstFontSize.size = this.letter.fontSizeMultiplier.size;
      this.firstFontSize.lineHeight = this.letter.fontSizeMultiplier.lineHeight;
      this.firstBackground = this.letter.background;
    } else {
      this.letter = {};
      this.errorMessage = 'Du hast einen falschen Schlüssel angegeben.';
      console.log('Zugang verweigert! Schlüssel fehlt.');
    }
    this.backgrounds = this.importBackgrounds(require.context('../assets/backgrounds/', false, /\.png$/));
  },
}
</script>

<style>
  .bg-preview-active {
    box-shadow: 0 0 7px 1px #4DBA87;
    -moz-box-shadow: 0 0 7px 1px #4DBA87;
    -webkit-box-shadow: 0 0 7px 1px #4DBA87;
    border: 1px solid #4DBA87;
  }
</style>

