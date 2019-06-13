const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync("db.json")
const db= low(adapter)

const strict = false

// initial state
const state = {
    musicComputer: [],
    computerTree:true,
    musicList:true
}

// getters
const getters = {
    getterMusicComputer: state => {return state.musicComputer}
    
}

// mutations
const mutations = {
    ADD_MUSIC_COMPUTER (state, computer) {
        state.musicComputer = computer
    },
    IS_COMPUTER_TREE (state, tree) {
        state.computerTree = tree
    },
    ADD_MUSIC_LIST  (state, list) {
        state.musicList = list
    }
}

// actions
const actions = {
    getMusicComputer({ commit }){
        db._.mixin(lodashId)
        const isComputerValue = db.get("listFolder").filter({type:"computer"}).value()
        if( isComputerValue.length === 0) {
            return commit('ADD_MUSIC_COMPUTER',[])
        }
        let musicTree = [...isComputerValue[0].treeFolder]
        function addMusicToTree(tree){
            tree = tree.map(folder=>{
                folder = {...folder}
                if(folder.file){return folder}
                let musicFolder = [...db.get("music").filter({folderId:folder.folderId}).value()]
                if(musicFolder.length > 0 && folder.children){
                    folder.children = [...folder.children, ...musicFolder]
                    folder.children = addMusicToTree(folder.children)
                    return folder
                }
                if(musicFolder.length > 0){
                    folder.children = [...musicFolder]
                    return folder
                }
                if(folder.children){
                    folder.children = addMusicToTree(folder.children)
                    return folder
                }
                return folder
            })
            return tree
        }
        musicTree = addMusicToTree(musicTree)
        let musicFirstlevel  = [...db.get("music").filter({folderId:"default"}).value()]
        if(musicFirstlevel.length > 0 ){
            musicTree  = [...musicTree , ...musicFirstlevel ]
        }
        return commit('ADD_MUSIC_COMPUTER',musicTree)
    },
    setComputerTreeExist({ commit },payload) {
        const tree = payload.tree
        const searchFolder = payload.searchFolder
        const oldPath = payload.oldPath 

        db._.mixin(lodashId)
       let oldTree = db.get("listFolder").filter({type:"computer"}).value()[0].treeFolder
      
       function searchGoodFolder(oldTree,tree,searchFolder,oldPath){
            let oldTreeResult = oldTree.map(folder=>{
                if(searchFolder.length > 1 && folder.folderId === searchFolder[0]  ){
                     
                    searchFolder.shift()
                    folder =searchGoodFolder(folder.children,tree,searchFolder,oldPath)
                    return folder
                }
                if(searchFolder.length === 1 && folder.pathfolder === oldPath ){
                    folder = tree.map((newFolder)=>{
                        let isFolder=false
                        oldTree.map((oldFolder)=>{
                            if(oldFolder.name === newFolder.name){
                            oldFolder = newFolder
                            isFolder=true
                            }
                        })
                        if (!isFolder) {
                            oldTree.push(newFolder)
                        }
                    })
                }
                return folder   
            })
            return oldTreeResult 
        }

        let oldTreeResult = searchGoodFolder(oldTree,tree,searchFolder,oldPath)
        db.get("listFolder")
            .filter({type:"computer"})
            .update("treeFolder",oldTreeResult)
            .write()
       return commit('IS_COMPUTER_TREE',true)
    },
    setComputerTree({ commit },tree) {
        db._.mixin(lodashId)
       const isComputerValue = db.get("listFolder").filter({type:"computer"}).value()
            
       if( isComputerValue.length === 0) {
        db.get("listFolder")
            .push({ type: "computer", treeFolder: tree})
            .write()
        
        return commit('IS_COMPUTER_TREE',true)
       }    
       let oldTree = db.get("listFolder").filter({type:"computer"}).value()[0].treeFolder
       oldTree = tree.map((newFolder)=>{
            let isFolder=false
            oldTree.map((oldFolder)=>{
                if(oldFolder.name === newFolder.name){
                   oldFolder = newFolder
                   isFolder=true
                }
            })
            if (!isFolder) {
                oldTree.push(newFolder)
            }
       })
       db.get("listFolder")
            .filter({type:"computer"})
            .update("treeFolder",oldTree)
            .write()
       return commit('IS_COMPUTER_TREE',true)
    },
    setComputerMusic({ commit },list) {
        db._.mixin(lodashId)
       const allMusic = db.get("music").value()
        
       if (allMusic.length === 0){
        list.map(music =>{
            db.get("music")
                .push(music)
                .write()
        })
        return commit('ADD_MUSIC_LIST',true)
       }
       list.map(newMusic=>{
           const isOldMusic =db.get("music")
            .filter({pathFiles: newMusic.pathFiles,folderId: newMusic.folderId})
            .value()
        if(isOldMusic.length === 0 ){
                db.get("music")
                    .push(newMusic)
                    .write()
            }
       })
       return commit('ADD_MUSIC_LIST',true)
     },
}

export default {
namespaced: true,
state,
getters,
actions,
mutations,
strict 
}