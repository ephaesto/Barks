<template>
  <div>
    <v-btn color="success" @click="OpenFile">
      OpenFile
    </v-btn>
  </div>
</template>

<script>
import {remote} from 'electron'
const {dialog} =remote;
  export default {
    data() {
      return {
        urlfile:''
      }
    },
    methods: {
      OpenFile:function(){
        dialog.showOpenDialog((fileName) => {
          /* eslint-disable no-alert, no-console */
            console.log(fileName)
          /* eslint-enable no-alert, no-console */
        })
      }
    }
  }
</script>