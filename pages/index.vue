<template>
  <div class="content-my-app">
    <section class="sound-block">
      <div class="sound-resume">
        <div>
          <p>une animation</p>
        </div>
        <h2>le titre de la chanson</h2>
      </div>
      <div class="sound-list">
        <div class="sound-spotify">
          <div class="sound-title">
            <h2>Music spotify</h2>
          </div>
          <ul>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
          </ul>
        </div>
        <div class="sound-soundcloud">
          <div class="sound-title">
            <h2>Music soundcloud</h2>
          </div>
          <ul>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
          </ul>
        </div>
        <div class="sound-perso">
          <div class="sound-title">
            <h2>Music perso</h2>
          </div>
          <ul>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
            <li> button music </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="button-block">
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
    </section>
  </div>
</template>

<script>
import {remote} from 'electron'
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
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .content-my-app
    display flex
    flex-direction row
    height 100%
    .sound-block
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      align-items center
      width 400px
      height 100%
      .sound-resume
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        align-items center
        background-color #303030
        border-radius:  56px 0 0 0 / 100px 0 0 0
        box-shadow: 2px 2px 2px -2px rgba(0,0,0,0.5) inset
        height 200px
      .sound-list
        height 100%
        .sound-title
         background-color #303030
         box-shadow: 2px 0px -2px 2px red inset
        ul
          background-color #292929
          box-shadow: 1px 0 2px 0 rgba(0,0,0,0.5) inset
        .sound-perso
          height 100%
          ul
            height 100%
    .button-block
      width 100%

</style>
