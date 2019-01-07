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

      <bm-linkbox :editlink="editPath" :playerlink="playerPath"></bm-linkbox>
      
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
                  <bm-letter :letter="letter"></bm-letter>
                </v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-card-actions>
                  <v-layout justify-center wrap>
                    
                    <v-flex xs12 sm4 class="ma-2">
                      <v-card>
                        <v-toolbar dark flat color="secondary" height="40">
                          <v-toolbar-title class="text-xs-center subheading" style="width:100%">
                            Schriftart
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                          <v-list v-if="fonts.length > 0" id="font-list" style="width:100%; padding:0">
                            <template v-for="(font, index) in fonts" style="cursor: pointer; padding: 5px; width:100%">
                              <v-list-tile 
                                :key="font" 
                                @click="letter.fontFamily = font" 
                                :class="[letter.fontFamily == font ? 'font-active' : '']"
                              >
                                <div style="width:20px">
                                  <v-icon 
                                    small 
                                    v-if="letter.fontFamily == font" 
                                    style="padding-bottom:3px" 
                                    color="primary"
                                  >
                                    arrow_right
                                  </v-icon>
                                  <div v-else style="width:16px; height:16px; display:inline-block"></div>
                                </div>
                                <v-list-tile-content>
                                  {{font}}
                                </v-list-tile-content>
                              </v-list-tile>
                              <v-divider :key="index" v-if="index != fonts.length - 1"></v-divider>
                            </template>
                          </v-list>
                        </v-card-actions>
                      </v-card>
                    </v-flex>

                    
                    
                    <v-flex xs12 sm7>
                      <v-layout wrap>
                        
                        <v-flex xs12 sm7 class="ma-2">
                          <v-card>
                            <v-toolbar dark flat color="secondary" height="40">
                              <v-toolbar-title class="text-xs-center subheading" style="width:100%">
                                Schriftfarbe
                              </v-toolbar-title>
                            </v-toolbar>
                            <v-card-actions>
                              <div class="text-xs-center" style="width:100%">
                                <bm-color-picker v-model="letter.fontColor" style="width:100%"></bm-color-picker>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-flex>

                        <v-spacer></v-spacer>

                        <v-flex xs12 sm3 md4 class="ma-2">
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
                                  @click.prevent="letter.fontSize += 0.1" 
                                  :disabled="letter.fontSize > 1.7"
                                >
                                  <v-icon>add</v-icon>
                                </v-btn>
                                <v-btn 
                                  icon
                                  class="ma-2 elevation-2" 
                                  color="error" 
                                  @click.prevent="letter.fontSize -= 0.1" 
                                  :disabled="letter.fontSize < 0.41"
                                >
                                  <v-icon>remove</v-icon>
                                </v-btn>
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

                      </v-layout> 
                    </v-flex>

                    <v-flex xs12 sm11 class="ma-2">
                      <bm-edit-form 
                        :letter="letter"
                        @valid-changed="console.log($event)"
                      ></bm-edit-form>
                    </v-flex>

                  </v-layout>
                </v-card-actions>
                <v-divider class="mt-4"></v-divider>
                <v-card-actions>
                  <v-layout>
                    <v-flex sm12 class="ma-3"> 
                      
                      <div class="text-xs-center" style="width:100%">
                        <v-btn 
                          color="success"
                          @click.prevent="onSubmit()" 
                          class="ma-1"
                        >
                          <v-icon small>done</v-icon> &nbsp; Speichern
                        </v-btn>

                        <v-btn 
                          color="error" 
                          @click.prevent="onReset"
                          class="ma-1" 
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

    <bm-wrong-key v-if="!authorised">{{ errorMessage }}</bm-wrong-key>  
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import bmLinkbox from '@/components/Linkbox.vue'
import bmWrongKey from '@/components/WrongKey.vue'
import bmLetter from '@/components/Letter.vue'
import bmEditForm from '@/components/EditForm.vue'
import { Chrome } from 'vue-color'

export default {
  data() {
    return {
      letter: {},
      authorised: false,
      showSuccessAlert: false,
      successMessage: '',
      errorMessage: '',
      showColorPicker: false,
      backgrounds: {},
      fonts: [
        'Caveat',
        'Charm',
        'Dancing Script',
        'Gloria Hallelujah',
        'Gochi Hand',
        'Great Vibes',
        'Indie Flower',
        'Kalam',
        'Pacifico',
        'Permanent Marker',
        'Sacramento',
        'Satisfy',
        'Shadows Into Light'
      ],
      firstFontSize: 1,
      firstBackground: '',
      firstFontFamily: '',
      firstFontColor: { 
        rgba: {}
      }
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
    onReset() {
      this.letter.fontSize = this.firstFontSize;
      this.letter.background = this.firstBackground;
      this.letter.fontFamily = this.firstFontFamily;
      this.letter.fontColor = { rgba: {} };
      this.letter.fontColor.rgba.r = this.firstFontColor.rgba.r;
      this.letter.fontColor.rgba.g = this.firstFontColor.rgba.g;
      this.letter.fontColor.rgba.b = this.firstFontColor.rgba.b;
      this.letter.fontColor.rgba.a = this.firstFontColor.rgba.a;
    },
    async onSubmit() {
      try {
        await db.collection('letters').doc(this.id).set(this.letter); 
        this.successMessage = 'Deine Briefoptionen wurden erfolgreich gespeichert!';
        this.showSuccessAlert = true;
        this.$scrollTo('#top', 800);
      } catch(e) {
        console.log('Fehler beim Updaten der Daten: ', e);
      } 
    }
  },
  components: {
    bmLinkbox,
    bmWrongKey,
    bmLetter,
    bmEditForm,
    bmColorPicker: Chrome 
  },
  async created() {
    this.letter = await this.getData();
    if (!this.letter) {
      this.letter = {};
      return;
    }
    if (this.lkey == this.letter.key) {
      this.authorised = true;
      this.backgrounds = this.importBackgrounds(require.context('../assets/backgrounds/', false, /\.png$/));
      this.firstFontSize = this.letter.fontSize;
      this.firstFontFamily = this.letter.fontFamily;
      this.firstFontColor.rgba.r = this.letter.fontColor.rgba.r;
      this.firstFontColor.rgba.g = this.letter.fontColor.rgba.g;
      this.firstFontColor.rgba.b = this.letter.fontColor.rgba.b;
      this.firstFontColor.rgba.a = this.letter.fontColor.rgba.a;
      this.firstBackground = this.letter.background;
    } else {
      this.letter = {};
      this.errorMessage = 'Du hast einen falschen Schlüssel angegeben.';
      console.log('Zugang verweigert! Schlüssel fehlt.');
    }
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
  .font-active {
    color: #4DBA87;
    font-weight: bold;
  }
  #font-list {
    list-style-type: none;
  }
</style>

