<template>
  <multipane class="content-my-app" layout="vertical" :style="{ height: HeightWrapper(heightWindows) }">
    <div :style="{ width: '400px' }">
      <playlist :height-windows="heightWindows" />
    </div>
    <multipane-resizer />
    <div :style="{ flexGrow: 1 }">
      <button-music-list :height-windows="heightWindows" />
    </div>
  </multipane>
</template>

<script>
import Playlist from '~/components/pages/Playlist.vue'
import ButtonMusicList from '~/components/pages/ButtonMusicList.vue'
import { Multipane, MultipaneResizer } from 'vue-multipane'

  export default {
    components: {
      Multipane,
      MultipaneResizer,
      Playlist,
      ButtonMusicList
    },
    data() {
      return {
        heightWindows: 0
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
