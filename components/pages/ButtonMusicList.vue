<template>
  <section class="button-block" :style="{ height: HeightWrapper(heightWindows)}" :isTrueList="IsTrueList(getterButtonMusicList)">
    <button-music v-for="(button, index) in getterButtonMusicList" :key="index" :titre="button.titre" :key-button="button.keyButton" :url="button.url" />
    <button class="button-add" @click="NewWindows">
      <v-icon>add</v-icon>
    </button>
  </section>
</template>

<script>
  import {ipcRenderer as ipc} from 'electron'
  import ButtonMusic from '~/components/pages/buttonMusicList/ButtonMusic.vue'
  import { mapGetters,mapActions } from 'vuex'

  export default {
    name: 'ButtonMusicList',
    components: {
      ButtonMusic
    },
    props: {
      heightWindows:{
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isLoad: true,
        otherWindows:false,
      }
    },
    computed:{
      ...mapGetters([
        "getterButtonMusicList"
      ]),
    },
    mounted() {
      window.addEventListener("focus", ()=>{
        if(this.otherWindows){
          this.otherWindows=false
          window.location.reload()
        }
        });
    },
    methods: {
       ...mapActions({
        getButtonMusic:'getButtonMusic'
      }),
      HeightWrapper(heightWindows){
        return heightWindows = heightWindows+"px" 
      },
      NewWindows:function(){
        this.otherWindows=true
        ipc.send('setValueButton')
        ipc.on('closedWindows', function () {
            window.focus()
        })
      },
      IsTrueList(list){
        if(list.length === 0 && this.isLoad){
          this.isLoad = false
          this.getButtonMusic()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .button-block
    display flex
    flex-wrap wrap
    align-content: flex-start
    padding 50px
    .button-add
      height 100px
      width 100px
      background-color #424242
      display flex
      justify-content center
      align-items center
      border-radius 10px
      .v-icon
        color rgba(255,255,255,0.4) 
        font-size 50px
    .button-refrech
      height 30px
      width 30px
      background-color #424242
      display flex
      justify-content center
      align-items center
      border-radius 10px
      .v-icon
        color rgba(255,255,255,0.4) 
        font-size 15px
</style>



