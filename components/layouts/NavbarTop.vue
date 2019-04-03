<template>
  <v-toolbar height="20px">
    <v-img :src="Logo" max-width="20px" max-height="20px" />
    <v-btn v-if="Env" margin="0" flat @click="devTools">
      Dev Tools
    </v-btn>
    <v-spacer />

    <v-toolbar-title>{{ MusicPlay }} - Barks</v-toolbar-title>

    <v-spacer />

    <v-btn margin="0" icon @click="minimize">
      🗕
    </v-btn>
    <v-btn v-if="!Maximize" margin="0" icon @click="unmaximize">
      🗗
    </v-btn>
    <v-btn v-if="Maximize" margin="0" icon @click="maximize">
      🗖
    </v-btn>
    <v-btn margin="0" icon @click="close">
      🗙
    </v-btn>
  </v-toolbar>
</template>

<script>
  import {remote} from 'electron'
  import logo from '~/static/icons/512x512.png'
  export default {
    name: 'NavbarTop',
    data() {
      return {
        MusicPlay:'BJH',
        Maximize:!(remote.getCurrentWindow().isMaximized()),
        Logo:logo,
        Env: process.env.NODE_ENV === "development"

      }
    },
    methods: {
      close:function(){
        remote.getCurrentWindow().close()
      },
      unmaximize:function(){
        remote.getCurrentWindow().unmaximize()
        this.Maximize = true
      },
      maximize:function(){
        remote.getCurrentWindow().maximize()
        this.Maximize = false
      },
      minimize:function(){
        remote.getCurrentWindow().minimize()
      },
      devTools:function(){
        remote.getCurrentWindow().toggleDevTools()
      }
    }
  }
</script>

<style lang="stylus" scoped>
   .v-toolbar
    padding 5px !important
    .v-toolbar__title 
      font-size 14px
    button 
      margin 0
      display block
      height 20px
      width 20px
      margin 0 10px
      &:hover
        background-color #595959

    .v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before 
      background-color  transparent
    
</style>
