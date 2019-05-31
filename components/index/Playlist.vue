<template>
  <section class="sound-block">
    <div class="sound-resume">
      <div>
        <v-icon>music_note</v-icon>
      </div>
      <h2>le titre de la chanson</h2>
    </div>
    <computer-list :height-windows="heightSoundBlock" />
  </section>
</template>

<script>
  import ComputerList from '~/components/index/playlist/ComputerList.vue'

  export default {
    name: 'Playlist',
    components: {
      ComputerList
    },
    props: {
      heightWindows:{
        type: Number,
        required: true
      }
    },
    computed:{
      heightSoundBlock(){
        return this.heightWindows-100
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .sound-resume
    height 100px
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-color #303030
    border-radius 56px 0 0 0 / 100px 0 0 0
    box-shadow 2px 0px -2px 2px rgba(0,0,0,0.5) inset
    h2
      text-align center
    div
      height 50px
      width 50px
      overflow hidden
      border-radius 10px
      background-image linear-gradient(to right bottom, #36236f, #4a287f, #602c8f, #772e9d, #8f30ab, #b526a4, #d61b9a, #f2198c, #ff3e65, #ff6941, #fc9220, #e3b712)
      display flex
      flex-direction row
      justify-content center
      align-items center


  .sound-block
    background-color #292929
    height 100%
    border-radius 56px 0 0 0 / 100px 0 0 0
    box-shadow 2px 2px 2px -2px rgba(0,0,0,0.5) inset
    position relative
    left 0
    top 0
    //background-color #303030
  

</style>
