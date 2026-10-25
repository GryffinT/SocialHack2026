
'use strict'; // cleaner code pretty much

const { app, BrowserWindow } = require('electron');
const path = require('path');
//const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
const { registerHandlers } = require(path.join(__dirname, 'ipc', 'handler.js')) // grab registerHandlers
const { fileURLToPath } = require('url');

// window creation function for startup
const createWindow = () => {

  // create the window 
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'), // attach preload
      contextIsolation: true, // isolate components and stuff 
      nodeIntegration: false, // no node communication directly
      sandbox: true // security :)
    }
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  } else {
    win.loadURL('http://localhost:5173') // Why isnt my website working on your device bro?
  }

}

app.whenReady().then(() => {
 
  const { db } = require(path.join(__dirname, 'store', 'database.js')); // grab DB

  registerHandlers(db) // register the handlers for the DB
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
