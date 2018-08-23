"use strict"

const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  let win = new BrowserWindow({width: 1400, height: 800})
  win.loadFile('index.html')
  // Hide the default file, edit, etc menubar
  //win.setMenu(null)
})
