<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
          <v-icon large>
            help_outline
          </v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              prepend-icon="person"
              name="login"
              label="E-mail"
              type="text"
              error-messages="ll"
              data-vv-name="email"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="submit">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'none',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    submit() {
      this.$validator.validateAll()
    }
  }
}
</script>

<style lang="stylus" scoped>
    .v-toolbar
        background: linear-gradient(to right, #f7b733, #fc4a1a);
</style>