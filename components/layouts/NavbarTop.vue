<template>
  <header>
    <nav class="navtop">
      <button v-if="Env" class="devtool" @click="devTools">
        Devtools
      </button>

      <p class="info-music">
        {{ MusicPlay }} - Barks
      </p>

      
      <div class="control" :class="{ subWindows: subWindows }">
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
    </nav>  
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
    props: {
      subWindows :{
        type: Boolean,
        default:false
      },
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

<style lang="stylus" >
   header
    padding-left 150px
    position fixed
    left 0
    top 0
    width 100%
    z-index 998
    .navtop 
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      align-items center
      overflow hidden
      -webkit-app-region: drag 
      .control
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        align-items center
        height 100%
        button 
          display block
          width 32px
          height 28px
          -webkit-app-region: no-drag
          padding 7px
          text-align center
          &:hover
            background-color rgba(255,255,255,0.2)
          &:hover:last-child
            background-color rgba(255,0,0,0.35)
          .icon-control 
            width 14px
            height 14px
            .color-fill
              fill #303030
        &.subWindows
          button 
            .icon-control 
              .color-fill
                fill #fff
      .info-music
        font-size 14px
        margin 0
        color white
        font-weight 500
        text-transform uppercase
      .devtool
        display block
        height 28px
        color white
        font-weight 500
        font-size 14px
        text-transform uppercase
        padding 0 5px
        -webkit-app-region: no-drag
        &:hover
          background-color rgba(255,255,255,0.1)
</style>
