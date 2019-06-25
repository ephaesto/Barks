<template>
  <section class="form-block" :style="{ height: HeightWrapper(heightWindows)}">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="titre"
        :rules="titreRules"
        label="Titre du bouton :"
        required
        @focus="isFocus=true"
        @blur="isFocus=false"
      />
      <p>
        Choisissez une music :
      </p>
      <p v-if="getterThisMusic">
        {{ getterThisMusic.name }}
      </p>
      <p>
        Choisissez une touche du clavier :
      </p>
      <p v-if="keyPress">
        {{ keyPress }}
      </p>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="Validate"
      >
        Validate
      </v-btn>
    </v-form>
  </section>
</template>

<script>
  import {remote} from 'electron'
  import { mapGetters,mapActions } from 'vuex'
  export default {
    name: 'AddButtonMusic',
    props: {
      heightWindows:{
        type: Number,
        required: true,
      }
    },
    data: () => ({
      valid: true,
      titre: '',
      titreRules: [
        v => !!v || 'Name is required',
      ],
      keyPress:null,
      isFocus:false
    }),
     computed:{
      ...mapGetters([
        "getterThisMusic"
      ]),
    },
    mounted(){
      window.addEventListener('keypress', (event)=>{
        if(!this.isFocus){
          this.keyPress = event.key
        }
      })
    },
    methods: {
      ...mapActions({
        setButtonMusic:'setButtonMusic'
      }),
      HeightWrapper(heightWindows){
        return heightWindows = heightWindows+"px" 
      },
       Validate () {
        if(this.titre !== '' && this.getterThisMusic && this.keyPress ){
          if (this.$refs.form.validate()) {
            this.setButtonMusic({
              titre:this.titre,
              keyButton:this.keyPress,
              url: this.getterThisMusic.pathFiles,
              isClick:false
            })
            remote.getCurrentWindow().close()
          }
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .form-block
    display flex
    justify-content center
    align-items center
    padding 50px
    
</style>



