<template>
  <v-toolbar height="20px">
    <v-img :src="Logo" max-width="20px" max-height="20px" />
    <v-btn v-if="Env" margin="0" flat @click="devTools">
      Dev Tools
    </v-btn>
    <v-spacer />

    <v-toolbar-title>{{ MusicPlay }} - Barks</v-toolbar-title>

    <v-spacer />

    <v-btn margin="0" icon @click="minimizeWindows">
      🗕
    </v-btn>
    <v-btn v-if="Maximize" margin="0" icon @click="unmaximizeWindows">
      🗗
    </v-btn>
    <v-btn v-if="!Maximize" margin="0" icon @click="maximizeWindows">
      🗖
    </v-btn>
    <v-btn margin="0" icon @click="closeWindows">
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
        Maximize:(remote.getCurrentWindow().isMaximized()),
        Logo:logo,
        Env: process.env.NODE_ENV === "development",
        WindowSize:window.innerWidth

      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      closeWindows:function(){
        remote.getCurrentWindow().close()
      },
      unmaximizeWindows:function(){
        remote.getCurrentWindow().unmaximize()
        this.Maximize = false
      },
      maximizeWindows:function(){
        remote.getCurrentWindow().maximize()
        this.Maximize = true
      },
      minimizeWindows:function(){
        remote.getCurrentWindow().minimize()
      },
      devTools:function(){
        remote.getCurrentWindow().toggleDevTools()
      },
      onResize() {
        if(!(remote.getCurrentWindow().isMaximized())){
            this.Maximize = false
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
   .v-toolbar
    padding 5px !important
    -webkit-app-region: drag 
    .v-toolbar__title 
      font-size 14px
    button 
      margin 0
      display block
      height 20px
      width 20px
      margin 0 10px
      -webkit-app-region: no-drag
      &:hover
        background-color #595959

    .v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before 
      background-color  transparent
    
</style>
