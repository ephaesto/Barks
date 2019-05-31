<template>
  <div>
    <div id="treeMusic" class="treeMusic" :style="{ height: HeighTree(heightWindows) }">
      <computer-button :music-list="musicList" name-page="home" :size-padding="5" />
    </div>
    <div class="bottom-bar">
      <button class="button-search files" @click="OpenFile">
        <v-icon medium>
          insert_drive_file
        </v-icon> 
      </button>
      <button class="button-search folder" @click="OpenFolder">
        <v-icon medium>
          create_new_folder
        </v-icon>
      </button>
    </div>
  </div>  
</template>

<script>
  import {remote} from 'electron'
  import path from 'path'
  import walkdir from 'walkdir'
  import fs from 'fs'
  import ComputerButton from '~/components/index/playlist/computerList/ComputerButton.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ComputerList',
    components: {
      ComputerButton
    },
    props: {
      heightWindows:{
        type: Number,
        required: true
      }
    },
    computed:{
      ...mapGetters([
        "getterMusicComputer"
      ]),
      musicList:function(){
        let list = this.getterMusicComputer
          if(list.length === 0){
            this.getMusic()
            list = this.getterMusicComputer
          }
        return list
      }
    },
    methods: {
      ...mapActions({
        setTree:'setComputerTree',
        setMusic:'setComputerMusic',
        getMusic:'getMusicComputer'
      }),
      HeighTree(heightWindows){
        return heightWindows-60 +"px" 
      },
      OpenFile(){
        
        remote.dialog.showOpenDialog(
          null,
          {
            properties : [ 
              'openFile',
              'multiSelections'
            ]
          },
         (fileNames) => {
            if (!fileNames){return 0}
              const valideRegexFile = new RegExp(".mp3|.opus|.ogg|.wav|.aac|.m4a|.mp4|.webm|.flac")
              let listFiles = fileNames.filter(urlFile => valideRegexFile.test(urlFile))
              if(listFiles.length > 0){
              listFiles = listFiles.map((urlfiles)=>{
                return this.MusicObject(urlfiles,"file")
                 })
              this.setMusic(listFiles)
              this.getMusic()
              }
            }
        )
      },
      OpenFolder(){
        remote.dialog.showOpenDialog(
          null,
          {
            properties : [ 
              'openDirectory',
              'multiSelections'
            ]
          },
          (fileNames) => {
            if (!fileNames){return 0}
            const baseUrl = path.dirname(fileNames[0])
            this.CreateListFiles(fileNames, baseUrl).then(listFiles =>{
              if(listFiles.length > 0){
                this.CreateTree(fileNames, baseUrl).then(treeFolder=>{
                    this.setTree(treeFolder)
                    this.setMusic(listFiles)
                    this.getMusic()
                })
              }              
             })  
          }
        )
      },
        CreateListFiles: async function(pathList,baseUrl){
        let listFiles = []
          await pathList.map((url) => {
            let arrayListFiles = walkdir.sync(url)
            const valideRegexFile = new RegExp(".mp3|.opus|.ogg|.wav|.aac|.m4a|.mp4|.webm|.flac")
            arrayListFiles = arrayListFiles.filter(urlFile => valideRegexFile.test(urlFile))

            arrayListFiles.map((urlfiles) => {
              listFiles.push(this.MusicObject(urlfiles,"file",baseUrl))
            })
          })
        return listFiles
      },
      CreateTree: async function(pathList,baseUrl) {
        let tree = await pathList.map((urlFolder) => {
          let objFolder = this.MusicObject(urlFolder,"folder",baseUrl)

          let arraySubUrl = walkdir.sync(urlFolder,{no_recurse:true})   
          arraySubUrl = arraySubUrl.filter(url => fs.lstatSync(url).isDirectory())
          if(arraySubUrl.length > 0){
              this.CreateTree(arraySubUrl,baseUrl).then(function(reponse){
                  objFolder["children"]= reponse
                  return objFolder
              })
          }
          return objFolder
        })
          return tree
      },
      MusicObject(url,type,baseUrl="default") {
        let objMusic ={}
        objMusic["name"]=path.basename(url)
        if(type === "folder"){
          objMusic["pathfolder"]=url
          objMusic["open"]=true
          objMusic["folderId"]=url.replace(baseUrl,'')
          objMusic["baseUrl"]=baseUrl
          return objMusic 
        }
        objMusic["pathFiles"]=`file://${url}`
        objMusic["file"]=path.extname(url).slice(1)
        objMusic["folderId"]= baseUrl === "default"
              ?"default"
              :url.replace(baseUrl,'').replace(objMusic.name,'').slice(0,-1)
        
        return objMusic
      }
    }
  }
</script>
<style lang="stylus" scoped>
  #treeMusic::-webkit-scrollbar
    width 12px
    background-color #292929
    position relative
    z-index 1
  #treeMusic::-webkit-scrollbar-corner  
    background-color #292929   
  #treeMusic::-webkit-scrollbar-thumb
      border-radius 10px
      background-color #3e3e3e
      &:hover
        background-color #3e3e3e

  .treeMusic
    overflow auto
  .bottom-bar
    width 100%
    display flex
    flex-direction row
    justify-content flex-end
    background-color #3e3e3e
    box-shadow 2px 0px -2px 2px rgba(0,0,0,0.5) inset
    .button-search 
      padding 1px 3px
      .v-icon 
        color rgba(255,255,255,0.2)
</style>
