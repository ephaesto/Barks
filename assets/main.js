const { createServer, get:httpGet} = require('http')
const path = require('path')
const { app, BrowserWindow,ipcMain :ipc} = require('electron')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const os = require('os')
const websocket = require('ws');

const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync("db.json")
const db = low(adapter)

db._.mixin(lodashId)
const collection = db
  .defaults({ posts: [] })
  .get('posts')

collection
  .insert({ title: 'low!' })
  .write()



const isEnvDev = process.env.NODE_ENV === "DEV"
config.rootDir = path.join(__dirname, '../')
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
/* eslint-disable no-alert, no-console */
console.info('\x1b[33m%s\x1b[0m','RootDir :',`\x1b[34m${config.rootDir}\x1b[0m`)
/* eslint-enable no-alert, no-console */

if (isEnvDev) {
  builder.build().catch((err) => {
    /* eslint-disable no-alert, no-console */
    console.error(err) 
    /* eslint-enable no-alert, no-console */
    process.exit(1)
  })
}
const server = createServer(nuxt.render)
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
/* eslint-disable no-alert, no-console */
console.info('\x1b[33m%s\x1b[0m','Nuxt working on :',`\x1b[34m${_NUXT_URL_}\x1b[0m`)
/* eslint-enable no-alert, no-console */
new websocket.Server({ server });




let win = null 
const newWin = () => {
  let myIcon = path.join(__dirname, '../static/icon.png')
  if(os.platform() === 'win32'){
    myIcon = path.join(__dirname, '../static/icon.ico')
  }
  if(os.platform() === 'darwin'){
    myIcon = path.join(__dirname, '../static/icon.icns')
  }

  win = new BrowserWindow({
    backgroundColor: '#303030',
    frame: false,
    width: 1600,
    height: 1000,
    icon: myIcon,
    show: false, 
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  let splash = new BrowserWindow({
    width: 550, 
    height: 400, 
    transparent: true, 
    frame: false, 
    icon: myIcon,
    alwaysOnTop: true
  });
    splash.loadURL(`file://${path.join(__dirname, 'splashScreen/splash.html')}`);

  win.on('closed', () => { 
    win = null })

  if (isEnvDev) {
   
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

    const pollServer = () => {
      httpGet(_NUXT_URL_, (res) => {
        if (res.statusCode === 200) { 
          win.loadURL(_NUXT_URL_) 
        } else { 
          setTimeout(pollServer, 300) 
        }
      }).on('error', pollServer)
    }
    pollServer()

    win.webContents.on('did-finish-load', () => {
      installExtension(VUEJS_DEVTOOLS.id).then((name) => {
        /* eslint-disable no-alert, no-console */
        console.info('\x1b[33m%s\x1b[0m','Added Extension:',`\x1b[34m${name}\x1b[0m`)
        /* eslint-enable no-alert, no-console */
        win.webContents.openDevTools()
      }).catch(
        /* eslint-disable no-alert, no-console */
        err => console.error('An error occurred: ', err)
        /* eslint-enable no-alert, no-console */
        )
    })
  }
  if (!isEnvDev) {
    win.loadURL(_NUXT_URL_)
  }
  win.once('ready-to-show', () => {
    splash.destroy();
    win.show();
    win.maximize()
  });

  ipc.on('setValueButton', function () {
  
    let subWin = new BrowserWindow({
      parent: win,
      backgroundColor: '#303030', 
      width: 1200, 
      height: 960,
      frame: false,
      icon: myIcon,
      show: false,
    })
    subWin.on('close', function () { 
      
        win.focus()
        win.webContents.focus()
        event.sender.send('closedWindows', 'teste')
      subWin = null
      
    })
    if (isEnvDev) {
      
      const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
  
      const subPollServer = () => {
       httpGet(`${_NUXT_URL_}/setValueButon`, (res) => {
          if (res.statusCode === 200) { 
            subWin.loadURL(`${_NUXT_URL_}/setValueButton`) 
          } else { 
            setTimeout(subPollServer, 300) 
          }
        }).on('error', subPollServer)
      }
      subPollServer()
  
      subWin.webContents.on('did-finish-load', () => {
        installExtension(VUEJS_DEVTOOLS.id).then((name) => {
          /* eslint-disable no-alert, no-console */
          console.info('\x1b[33m%s\x1b[0m','Added Extension:',`\x1b[34m${name}\x1b[0m`)
          /* eslint-enable no-alert, no-console */
          subWin.webContents.openDevTools()
        }).catch(
          /* eslint-disable no-alert, no-console */
          err => console.error('An error occurred: ', err)
          /* eslint-enable no-alert, no-console */
          )
      })
    }
    if (!isEnvDev) {
      subWin.loadURL(`${_NUXT_URL_}/setValueButon`)
    }
    
    subWin.once('ready-to-show', () => {
      subWin.show();
    });
  })  
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
