<template>
  <multipane class="content-my-app" layout="vertical" :style="{ height: HeightWrapper(heightWindows) }">
    <div :style="{ width: '400px' }">
      <playlist :height-windows="heightWindows" :height-block="heightBlock" type-windows="subWindows" />
    </div>
    <multipane-resizer />
    <div :style="{ flexGrow: 1 }">
      <add-button-music :height-windows="heightWindows" />
    </div>
  </multipane>
</template>

<script>
import Playlist from '~/components/pages/Playlist.vue'
import AddButtonMusic from '~/components/pages/AddButtonMusic.vue'
import { Multipane, MultipaneResizer } from 'vue-multipane'

  export default {
    layout:'subWindows',
    components: {
      Multipane,
      MultipaneResizer,
      Playlist,
      AddButtonMusic
    },
    data() {
      return {
        heightWindows: 0,
        heightBlock:0
      }
    },
    mounted() {
      this.heightWindows = window.innerHeight-28 
      window.addEventListener('resize', ()=>{ this.heightWindows = window.innerHeight-28} )
    },
    methods: {
      HeightWrapper(heightWindows){
        return heightWindows = heightWindows+"px" 
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .content-my-app
    display flex
    flex-direction row
    height 100%
</style>
