<template>
  <v-container class="letterview">
    <v-layout align-center justify-center wrap>
        <v-flex xs12 sm11 md11 lg8 xl7 class="mb-3" id="envelopeFlex">  
            <app-envelope :letter="letter" @click.native="onEnvelopeClick"></app-envelope> 
        </v-flex>
        <v-flex xs12 sm11 md11 lg8 xl6 id="letterFlex">  
          <transition name="slide">
            <app-letter :letter="letter" v-if="isOpen" id="letter"></app-letter> 
          </transition>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
import { db } from '@/firebase/init'
import appLetter from '@/components/Letter.vue'
import appEnvelope from '@/components/Envelope.vue'

export default {
  data() {
    return {
      letter: {},
      isOpen: false
    }
  },
  props: ['id'],
  methods: {
    async getData() {
      try{
        const data = await db.collection('letters').doc(this.id).get();
        if (!data.exists) {
          console.log('Das Dokument wurde nicht gefunden!');
        } else {
          return data.data();
        }
      } catch(e) {
        console.log('Fehler beim Laden der Daten: ', e);
      }
    },
    onEnvelopeClick() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$scrollTo('#letterFlex', 2000);
      } else {
        this.$scrollTo('#envelopeFlex', 2000);
      }
      
    }
  },
  components: {
    appLetter,
    appEnvelope
  },
  async created() {
    this.letter = await this.getData();
  },
}
</script>

<style>
  #letter {
    width: 95%;
    margin:auto;
  }
  
  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity 1s;
  }
  .slide-leave {
    opacity: 1
  }
  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
        transform: translateY(-400px);
    }
    to {
        transform: translateY(0px);
    }
  }
  @keyframes slide-out {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-400px);
    }
  }
</style>
