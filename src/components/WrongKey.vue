<template>
  <v-container class="wrong-key">
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-card flat>
          <v-toolbar dark flat color="error">
            <v-toolbar-title>Zugriff verweigert!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout class="my-2" align-center justify-center>
              <v-flex xs2 md1> 
                <v-icon color="error" large>error_outline</v-icon>
              </v-flex>
              <v-flex xs10 md8>
                <span class="title">
                  <slot></slot>
                </span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

