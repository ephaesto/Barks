
const http = require('http')
const path = require('path')
const electron = require('electron')
const { Nuxt, Builder } = require('nuxt')
const config = require('./nuxt.config.js')


config.rootDir = __dirname // for electron-builder

const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)

if (config.dev) {
  builder.build().catch((err) => {
    /* eslint-disable no-alert, no-console */
    console.error(err) // eslint-disable-line no-console
    /* eslint-enable no-alert, no-console */
    process.exit(1)
  })
}

server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
/* eslint-disable no-alert, no-console */
console.log(`Nuxt working on ${_NUXT_URL_}`)
/* eslint-enable no-alert, no-console */

let win = null 
const app = electron.app
const newWin = () => {
  win = new electron.BrowserWindow({
    icon: path.join(__dirname, 'static/icon.png'),
    webPreferences: {
      webSecurity: false
    }
  })
  win.maximize()
  win.on('closed', () => { win = null })
  if (config.dev) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).then((name) => {
      /* eslint-disable no-alert, no-console */
      console.log(`Added Extension:  ${name}`)
      /* eslint-enable no-alert, no-console */
      win.webContents.openDevTools()
    }).catch(
       /* eslint-disable no-alert, no-console */
      err => console.log('An error occurred: ', err)
      /* eslint-enable no-alert, no-console */
      )
    
    const pollServer = () => {
      http.get(_NUXT_URL_, (res) => {
        if (res.statusCode === 200) { win.loadURL(_NUXT_URL_) } else { setTimeout(pollServer, 300) }
      }).on('error', pollServer)
    }
    pollServer()
  } else { return win.loadURL(_NUXT_URL_) }
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
