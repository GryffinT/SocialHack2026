
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('socialHack', {

  task: {
    create: (data) => ipcRenderer.invoke('tasks:create', data),
    delete: (data) => ipcRenderer.invoke('tasks:delete', data),
    update: (data) => ipcRenderer.invoke('tasks:update', data),
    list: (data) => ipcRenderer.invoke('tasks:list', data),
    get: (data) => ipcRenderer.invoke('tasks:get', data)
  }

});
