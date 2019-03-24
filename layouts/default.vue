<template>
  <v-app :dark="dark">
    <v-toolbar app>
      <v-toolbar-title>{{ barksName }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      This is the footer
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        barksName: 'Barks',
        dark: true
      }
    },
  }
</script>

