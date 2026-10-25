import { Dialog } from 'radix-ui';
import React from 'react';
import Canvas from './Canvas.jsx';
import DialogDefault from './Dialog.jsx'



function App(){

  return(
    <div>
    <Canvas></Canvas>
    <DialogDefault> open </DialogDefault>
    </div>
  )

}

export default App

