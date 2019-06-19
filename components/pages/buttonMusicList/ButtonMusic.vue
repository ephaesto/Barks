<template>
  <div class="wrapper-button-music">
    <div class="wrapper-button">
      <button v-if="isClick" class="button-clic" tabindex="0" :keyPlay="keyPlay(keyPress)" @click="PlaySound">
        <v-icon>music_note</v-icon>
      </button>
      <button v-else class="button-clic button-stop" tabindex="0" :keyStop="keyStop(keyPress)" @click="StopSound">
        <div />
        <v-icon>music_note</v-icon>
      </button>
      <button class="button-destroy" @click="DestroyButton(keyButton)">
        <v-icon>delete</v-icon>
      </button>
    </div>
    <div class="wrapper-key-press">
      <p>{{ titre }} ({{ keyButton }})</p>
    </div>
  </div>
</template>

<script>
  import {Howl} from 'howler'
  import { mapActions } from 'vuex'
  export default {
    name: 'ButtonMusic',
    props: {
      titre:{
        type: String,
        required: true
      },
      keyButton:{
        type: String,
        required: true
      },
      url:{
        type: String,
        required: true
      }
    },
    data() {
      return {
        sound:null,
        keyPress:null,
        isClick: true
      }
    },
    mounted(){
      window.addEventListener('keypress', (event)=>{this.keyPress = event.key})
    },
    methods: {
      ...mapActions({
        deleteButtonMusic:'deleteButtonMusic'
      }),
       PlaySound(){
        this.isClick = false
        this.sound = new Howl({
              src: [this.url],
              html5: true,
              loop: true
            })
        this.sound.play() 
      },
      StopSound(){
        this.isClick = true
        if(this.sound){
         this.sound.stop()
        }
      },
      DestroyButton(keyButton){
        this.deleteButtonMusic(keyButton)
      },
      keyPlay(keyPress){
        if(keyPress === this.keyButton){
          this.keyPress = null
          this.PlaySound()
        }
      },
      keyStop(keyPress){
        if(keyPress === this.keyButton){
          this.keyPress = null
          this.StopSound()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper-button-music
    position relative
    height 100px
    width 100px
    margin-right 5px
    margin-bottom 10px
    .wrapper-button
      display flex
      flex-direction row
      .button-clic
        position relative
        z-index 3
        height 70px
        width 70px
        overflow hidden
        border-radius 80% 80% 80% 80% / 50% 50% 50% 50%
        background-image linear-gradient(to right bottom, #36236f, #4a287f, #602c8f, #772e9d, #8f30ab, #b526a4, #d61b9a, #f2198c, #ff3e65, #ff6941, #fc9220, #e3b712)
        display flex
        flex-direction row
        justify-content center
        align-items center
        .v-icon
          font-size 40px
        &.button-stop
          div
            position absolute
            z-index 4
            border: 5px solid hsla(185, 100%, 62%, 0.2);
            border-top-color: rgba(255,255,255,0.7) ;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            animation: spin 1s linear infinite;
      .button-destroy
        position absolute
        z-index 2
        top 15px
        right 0
        background-color #292929
        height 40px
        width 65px
        border-radius 0 10px 10px 0
        display flex
        flex-direction row-reverse
        padding-right 5px
        .v-icon
          color rgba(255,255,255,0.2) 
    .wrapper-key-press
      position absolute
      background-color #424242
      bottom 0
      left 0
      display flex
      flex-direction column
      justify-content flex-end
      align-items center
      z-index 1
      height 50px
      width 70px
      border-radius 0 0 10px 10px
      padding-bottom 5px
      p
        color rgba(255,255,255,0.4)
        margin-bottom 0
 

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>


