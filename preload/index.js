import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('socialHack', {
});
