<template id="Home">
    <v-container class="form">
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm11 lg8 xl6>
          <bm-generator-form></bm-generator-form>
        </v-flex>
      </v-layout>
    </v-container> 
</template>


<script>
  import bmGeneratorForm from '@/components/GeneratorForm.vue'

  export default {
    components: {
      bmGeneratorForm
    }
  }
</script>
