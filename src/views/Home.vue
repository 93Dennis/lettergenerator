<template id="Home">
    <div class="home">
      <app-form :onSubmit="onSubmit">
        <span slot="title">Erstelle einen Brief</span>
        <span slot="button-value">Erstellen</span>
      </app-form>
    </div>
    
</template>


<script>
  import { db } from '@/firebase/init'
  import appForm from '@/components/Form.vue'

  export default {
    methods: {
      async onSubmit(letter) {  
        try {
          const response = await db.collection('letters').add(letter); 
          this.$router.push({ name: 'edit', params: { id: response.id, lkey: letter.key } });
        } catch(e) {
          console.log('Fehler beim Senden an Server: ', e);
        } 
      }
    },
    components: {
      appForm
    }
  }
</script>
