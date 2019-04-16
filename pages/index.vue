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
      <v-btn color="red" fab dark @click="newWindows">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {remote,ipcRenderer as ipc} from 'electron'
import {Howl} from 'howler'
  export default {
    data() {
      return {
        urlfile:[""],
        sound:null
      }
    },
    methods: {
      OpenFile:function(){
        remote.dialog.showOpenDialog((fileName) => {
         fileName = fileName.map((path)=>{ return `file://${path}`})
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
        console.log(remote.getCurrentWindow())
        /* eslint-enable no-alert, no-console */
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