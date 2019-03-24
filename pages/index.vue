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
      <v-btn color="warning" fab dark>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {remote} from 'electron'
import {Howl} from 'howler'
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
          this.urlfile=fileName
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
      }
    }
  }
</script>