import React from 'react';
import './App.css';

const NodeMenu = ({onSubmit, onClose}) => {

	function handleClick(){
		if (!name.trim()) return;         
		onSubmit(name.trim(), desc.trim());     
		setName("");
		setDesc("");
	}

  return (
    <div id="NodeMenuOverlay" className="NodeMenuOverlay" onClick={(e) => { if (e.target === e.currentTarget) {onClose();}}}>
      <div className='NodeMenu'>
        <div className='NodeMenuTitle'>
          <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" />
          </svg>
          <h2 id='NodeName' >Name</h2>
        </div>
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
