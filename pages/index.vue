<template>
  <div>
    <v-btn color="success" @click="OpenFile">
      OpenFile
    </v-btn>
    <v-btn color="purple" @click="PlaySound">
      PlaySound
    </v-btn>
    <v-btn color="brown" @click="StopSound">
      StopSound
    </v-btn>
    <div>
      <v-btn color="warning" fab dark @click="showPath">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn color="primari" fab dark @click="minimize">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn color="primari" fab dark @click="unmaximize">
        <v-icon>crop_original</v-icon>
      </v-btn>
      <v-btn color="primari" fab dark @click="close">
        <v-icon>clear</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {remote} from 'electron'
import {Howl} from 'howler'
import os from 'os'
  export default {
    data() {
      return {
        urlfile:[""],
        dialog:remote.dialog,
        sound:null
      }
    },
    methods: {
      OpenFile:function(){
        this.dialog.showOpenDialog((fileName) => {

          if(os.platform() === 'win32'){
            return this.urlfile=fileName
          }
          /* eslint-disable no-alert, no-console */
        console.log(fileName)
        /* eslint-enable no-alert, no-console */
         fileName = fileName.map((path)=>{ return `file://${path}`})
         /* eslint-disable no-alert, no-console */
        console.log(fileName)
        /* eslint-enable no-alert, no-console */
         return this.urlfile=fileName
        })
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
      showPath:function(){
         /* eslint-disable no-alert, no-console */
        console.log(this.urlfile)
        console.log(os.platform())
        console.log(remote.getCurrentWindow())
        /* eslint-enable no-alert, no-console */
      },
      close:function(){
        remote.getCurrentWindow().close()
      },
      unmaximize:function(){
        remote.getCurrentWindow().unmaximize()
      },
      minimize:function(){
        remote.getCurrentWindow().minimize()
      }
    
    }
  }
</script>