<template>
  <v-container class="linkbox">
    <v-layout align-center justify-center wrap>
        <v-flex  xs12 sm11 md11 lg8 xl6>
          <v-card flat>
            <v-toolbar dark flat color="secondary">
              <v-toolbar-title>
                Deine generierten Links
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon v-if="isCollapsed" @click="isCollapsed = false">keyboard_arrow_down</v-icon>
              <v-icon v-if="!isCollapsed" @click="isCollapsed = true">keyboard_arrow_up</v-icon>
            </v-toolbar>
            <v-expand-transition>
              <v-card-text v-show="!isCollapsed">
                <v-layout wrap>
                  <v-flex xs12 offset-sm1>
                    <h4 class="title my-2">Dein Link</h4>
                  </v-flex>
                  <v-flex xs12 offset-sm1>
                    <span class="caption">Schreibe dir den Link irgendwo auf, damit du immer auf diese Seite zurückkehren kannst.</span>
                  </v-flex>
                  <v-flex xs12 sm8 xl9 offset-sm1>
                    <v-form class="mt-2" style="margin-bottom:-10px">
                      <v-text-field solo readonly :value="editlink"></v-text-field>
                    </v-form>
                  </v-flex>
                  <v-flex xs7 sm2 class="pb-2">
                    <v-btn 
                      color="primary" 
                      large 
                      v-clipboard:copy="editlink" 
                      v-clipboard:success="onCopy" 
                      v-clipboard:error="onError"
                    >
                      <v-icon>file_copy</v-icon>
                      <span class="hidden-sm-and-up">&nbsp;&nbsp;&nbsp;&nbsp;Kopieren</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-divider class="my-3"></v-divider>
                <v-layout wrap>
                  <v-flex xs12 offset-sm1>
                    <h4 class="title my-2">Spieler-Link</h4>
                  </v-flex>
                  <v-flex xs12 offset-sm1>
                    <span class="caption">Den Link f&uuml;hrt schickst du deinen Spieler*Innen, die den Brief erhalten sollen.</span>
                  </v-flex>
                  <v-flex xs12 sm8 xl9 offset-sm1>
                    <v-form class="mt-2" style="margin-bottom:-10px">
                      <v-text-field solo readonly :value="playerlink"></v-text-field>
                    </v-form>
                  </v-flex>
                  <v-flex xs7 sm2 class="pb-2">
                    <v-btn 
                      color="primary" 
                      large 
                      v-clipboard:copy="playerlink" 
                      v-clipboard:success="onCopy" 
                      v-clipboard:error="onError"
                    >
                      <v-icon>file_copy</v-icon>
                      <span class="hidden-sm-and-up">&nbsp;&nbsp;&nbsp;&nbsp;Kopieren</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  props: ['editlink', 'playerlink'],
  methods: {
    onCopy(e) {
      console.log('Link wurde kopiert: ' + e.text);
    },
    onError(e) {
      console.log('Fehler beim kopieren: ', e);
    }
  }
}
</script>

