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
    position absolute
    left 0
    bottom 0
    z-index 1
    width 100%
    div
      background #3a3a3a
      display flex
      flex-direction row
      justify-content space-between
      padding 5px 20px 5px 20px
      box-shadow: 2px 0px -2px 2px red inset

</style>

