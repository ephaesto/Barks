<template>
  <div>
    <div v-for=" (music, index) in musicList" :key="index">
      <div v-if="!music.file">
        <div class="center-folder" :style="{ paddingLeft:Padding(sizePadding)+'px'}">
          <button class="button-no-nowrap" @click="music.open = !music.open">
            <v-icon v-if="music.open">
              arrow_drop_down
            </v-icon><v-icon v-if="!music.open">
              arrow_right
            </v-icon>{{ music.name }}
          </button>
          <div class="color-button">
            <button @click="OpenFile(music.pathfolder,music.baseUrl)">
              <v-icon medium>
                insert_drive_file
              </v-icon> 
            </button>
            <button @click="OpenFolder(music.pathfolder,music.baseUrl,createSearchFolder(music.folderId,arrayFolderId))">
              <v-icon medium>
                create_new_folder
              </v-icon>
            </button>
          </div>
        </div>
        <transition name="fade">
          <computer-button v-if="music.children && music.open" :array-folder-id="createSearchFolder(music.folderId,arrayFolderId)" :music-list="music.children" :type-windows="typeWindows" :size-padding="Padding(sizePadding)" />
        </transition>
      </div>
      <button v-else-if="!music.file && typeWindows === 'home'" class="center-file button-no-nowrap" :style="{ paddingLeft:Padding(sizePadding)+'px'}">
        <v-icon>music_note</v-icon>{{ music.name }}
      </button>
      <button v-else class="center-file button-no-nowrap" :style="{ paddingLeft:Padding(sizePadding)+'px'}" @click="setThisMusic(music)">
        <v-icon>music_note</v-icon>{{ music.name }}
      </button>
    </div>  
  </div>
</template>


<script>
  import {remote} from 'electron'
  import path from 'path'
  import walkdir from 'walkdir'
  import fs from 'fs'
  import ComputerButton from '~/components/pages/playlist/computerList/ComputerButton.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'ComputerButton',
    components: {
      ComputerButton
    },
    props: {
      musicList:{
        type: Array,
        required: true
      },
      typeWindows:{
        type: String,
        required: true
      },
      sizePadding:{
        type: Number,
        required: true
      },
      arrayFolderId:{
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      ...mapActions({
        setTreeExist:'setComputerTreeExist',
        setMusic:'setComputerMusic',
        getMusic:'getMusicComputer',
        setThisMusic:'setThisMusicComputer'
      }),
      OpenFile:function(oldPath,baseUrl){
        remote.dialog.showOpenDialog(
          null,
          {
            defaultPath: oldPath,
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
                if(urlfiles.includes(oldPath)){
                  return this.MusicObject(urlfiles,"file",baseUrl)
                }
              })
              this.setMusic(listFiles)
              this.getMusic()
              }
            }
        )
      },
      OpenFolder:function(oldPath,baseUrl,searchFolder){
        remote.dialog.showOpenDialog(
          null,
          {
            defaultPath: oldPath,
            properties : [ 
              'openDirectory',
              'multiSelections'
            ]
          },
          (fileNames) => {
            fileNames= !fileNames ? [] : fileNames.filter(url => url.includes(oldPath))
            if (fileNames.length === 0){return 0}
            this.CreateListFiles(fileNames,baseUrl).then(listFiles =>{
              if(listFiles.length > 0){
                this.CreateTree(fileNames,baseUrl).then(treeFolder=>{
                    this.setTreeExist({"tree":treeFolder,"searchFolder":searchFolder,"oldPath":oldPath})
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
      MusicObject:function(url,type,baseUrl="default") {
        let objMusic ={}
        objMusic["name"]=path.basename(url)
        if(type === "folder"){
          objMusic["pathfolder"]=url
          objMusic["open"]=true
          objMusic["folderId"]=url.replace(baseUrl,'')
          return objMusic 
        }
        objMusic["pathFiles"]=`file://${url}`
        objMusic["file"]=path.extname(url).slice(1)
        objMusic["folderId"]= baseUrl === "default"
              ?"default"
              :url.replace(baseUrl,'').replace(objMusic.name,'').slice(0,-1)
        
        return objMusic
      },
      Padding:function(size){
          return size+10
      },
      createSearchFolder:function(folderId,arrayfolderId){
        let searchFolder =[]
        if(arrayfolderId.length === 0){
          searchFolder.push(folderId)
          return searchFolder
        }
        return searchFolder = [...arrayfolderId,folderId]

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .button-no-nowrap
    white-space nowrap
  .computer-folder
    padding-left 5px

  .center-folder
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    color rgba(255,255,255,0.8)
    padding 5px
    background-color #3e3e3e
    margin-bottom 1px 
    line-height 24px
    .color-button
      .v-icon
        color rgba(255,255,255,0.2)
  .center-file
    padding 5px
    color rgba(255,255,255,0.8)
    line-height 24px

</style>


  