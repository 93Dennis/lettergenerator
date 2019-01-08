<template>
  <v-container fill-height id="loading">
      <v-layout row wrap align-center class="mb-4">
        <v-flex class="text-xs-center mb-4">
          <v-progress-circular
            :size="70"
            :width="15"
            color="primary"
            indeterminate
            class="mb-4"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
</template>
