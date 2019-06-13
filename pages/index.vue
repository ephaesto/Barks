<template>
  <multipane class="content-my-app" layout="vertical" :style="{ height: HeightWrapper(heightWindows) }">
    <div :style="{ width: '400px' }">
      <playlist :height-windows="heightWindows" />
    </div>
    <multipane-resizer />
    <div :style="{ flexGrow: 1 }">
      <section class="button-block">
        <v-btn color="purple" @click="PlaySound">
          PlaySound
        </v-btn>
        <v-btn color="brown" @click="StopSound">
          StopSound
        </v-btn>
        <div>
          <v-btn color="red" fab dark @click="newWindows">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </div>
      </section>
    </div>
  </multipane>
</template>

<script>
import {ipcRenderer as ipc} from 'electron'
import Playlist from '~/components/index/Playlist.vue'
import {Howl} from 'howler'
import { Multipane, MultipaneResizer } from 'vue-multipane'

  export default {
    components: {
      Multipane,
      MultipaneResizer,
      Playlist
    },
    data() {
      return {
        urlfile:[""],
        sound:null,
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
      },
      PlaySound:function(){
        const urlfile=[...this.urlfile]
        if(urlfile[0] !== ""){
          this.sound = new Howl({
                src: urlfile
              })
          this.sound.play()
        }   
      },
      StopSound:function(){
        if(this.sound){
         this.sound.stop()
        }
      },
      newWindows:function(){
        ipc.send('setValueButton')
        ipc.on('closedWindows', function () {
            window.focus()
        })
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
