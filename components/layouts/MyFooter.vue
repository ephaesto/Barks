<template>
  <footer>
    <div>
      <p class="ma-0 caption">
        author : emeric lebbrecht
      </p>
      <p class="ma-0 caption">
        version : 0.0.1
      </p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'MyFooter',
  }
</script>

<style lang="stylus" scoped>
  footer
    position fixed
    left 0
    bottom 0
    padding-left 50px
    z-index 996
    width 100%
    div
      background #3a3a3a
      display flex
      flex-direction row
      justify-content space-between
      padding 5px 20px 5px 20px

</style>

