import React from 'react';
import './App.css';


const NodeMenu = () => {

  return (

    <div className="NodeMenuOverlay">
      <div className='NodeMenu'>
        <h2 id='NodeName' >Name</h2>
        <div className='NodeMenuTopBar'>
          <p id='NodeTime' >time spent</p>
          <p id='NodeCreated' >created</p>
        </div>
        <p id='NodeDesc' >desc</p>
        <div className="NodeMenuBottomBar">
          <p id='NodeImport' >importance</p>
          <p id='NodeMode' >mode</p>
        </div>
      </div>
    </div>

  )

}

export default NodeMenu;
