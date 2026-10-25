import './App.css';
import { useState } from 'react';
import {useEffect} from 'react' ;

const NodeMenu = ({task, onClose}) => {

  const onExit = () => {
    onClose();
  }

  return (
    <div id="NodeMenuOverlay" className="NodeMenuOverlay" onClick={(e) => { if (e.target === e.currentTarget) {onExit();}}}>
      <div className='NodeMenu'>
        <div className='NodeMenuTitle'>
          <h2 id='NodeName' >{task.name}</h2>
          <label>
            <input className='check' type="checkbox" />
          </label>
        </div>
        <div className='NodeMenuTopBar'>
          <p id='NodeTime'>time spent {task.time}</p>
          <p id='NodeCreated' >{task.created_at}</p>
        </div>
        <p id='NodeDesc' >{task.desc}</p>
        <div className="NodeMenuBottomBar">
          <p id='NodeImport' >importance {task.importance}</p>
          <p id='NodeMode' >mode {task.mode}</p>
        </div>
      </div>
    </div>

  )

}

export default NodeMenu;
