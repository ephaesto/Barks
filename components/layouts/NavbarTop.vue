<template>
  <header>
    <div class="navtop">
      <button v-if="Env" class="devtool" @click="devTools">
        Dev Tools
      </button>

      <p class="info-music">
        {{ MusicPlay }} - Barks
      </p>

      
      <div class="control">
        <button @click="minimizeWindows">
          <reduce-icon class="icon-control" />
        </button>
        <button v-if="Maximize" @click="unmaximizeWindows">
          <minimize-icon class="icon-control" />
        </button>
        <button v-if="!Maximize" @click="maximizeWindows">
          <maximize-icon class="icon-control" />
        </button>
        <button @click="closeWindows">
          <close-icon class="icon-control" />
        </button>
      </div>
    </div>  
  </header>
</template>

<script>
  import {remote} from 'electron'
  import ReduceIcon from '~/components/icons/ReduceIcon'
  import MinimizeIcon from '~/components/icons/MinimizeIcon'
  import MaximizeIcon from '~/components/icons/MaximizeIcon'
  import CloseIcon from '~/components/icons/CloseIcon'
  export default {
    name: 'NavbarTop',
    components: {
      ReduceIcon,
      MinimizeIcon,
      MaximizeIcon,
      CloseIcon
    },
    data() {
      return {
        MusicPlay:'BJH',
        Maximize:(remote.getCurrentWindow().isMaximized()),
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
   header
    margin-left 50px
    padding-left 50px
    position fixed
    left 0
    top 0
    width 100%
    .navtop 
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      align-items center
      padding 0 5px
      -webkit-app-region: drag 
      .control
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        align-items center
        padding 5px
        button 
          display block
          width 18px
          height 18px
          -webkit-app-region: no-drag
          margin 0 5px
          padding 2px
          .icon-control
            svg 
              width 18px
              height 18px
              .color-fill
                fill wihte
    .info-music
      font-size 14px
      margin 0
    .devtool
      display block
      -webkit-app-region: no-drag
</style>
