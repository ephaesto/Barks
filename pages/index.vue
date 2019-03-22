<template>
  <div>
    <v-btn color="success" @click="OpenFile">
      OpenFile
    </v-btn>
  </div>
</template>

<script>
import {remote} from 'electron'
  export default {
    data() {
      return {
        urlfile:'',
        dialog:remote.dialog
      }
    },
    methods: {
      OpenFile:function(){
        this.dialog.showOpenDialog((fileName) => {
          /* eslint-disable no-alert, no-console */
            console.log(fileName)
          /* eslint-enable no-alert, no-console */
        })
      }
    }
  }
</script>