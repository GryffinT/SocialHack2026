import React from 'react';
import { GraphCanvas, darkTheme, SphereWithSvg} from 'reagraph';
import { useState } from 'react';
import {useEffect} from 'react' ;
import DialogDefault from './Dialog.jsx'
import NodeMenu from './NodeMenu.jsx';

function Canvas() {

  /* name, desc, mode, importance */
  //
  const[nodes,setNodes] = useState([]);
  const[edges,setEdges] = useState([]);
  const[menuOpen,setMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  async function loadNodes() {
    /*backend to reagraph nodes */
    const tasks= await window.socialHack.task.list()
    setNodes(tasks.map(t => ({ id: String(t.id), label: t.name, importance: t.importance })));
 
    const ids = new Set(tasks.map(t => String(t.id)));
    const newEdges = [];


    for (const t of tasks) {

      //console.log(t);

      const buddies = JSON.parse(t.buddies);

      for (const b of buddies) {
        //console.log(b)

        if (ids.has(b.id)) {

          newEdges.push({ id: `${t.id}-${b.id}`, source: String(t.id), target: String(b.id) });
        }
      }
    }

    setEdges(newEdges);
  }

  async function getNode(id) {
    const task = await window.socialHack.task.get(id);
    console.log(task);
    setMenuOpen(true);
    setSelectedTask(task);
  }

  async function deleteNode(id) {
    await window.socialHack.task.delete(id)
    //unused
  }

  async function onSubmit(name,desc, importance, mode){
    await window.socialHack.task.create({ name:name, desc:desc, importance:importance, mode:mode });
    await loadNodes();
  }

  function closeMenu(){
    setMenuOpen(false);
  }

  const clearData = async () => {

    const dataList = await window.socialHack.task.list();

    for ( const node of dataList ) {

      await window.socialHack.task.delete(node.id);  

    }

    loadNodes(); 

  }


  async function checkBoxData(id,active)
  {
    await window.socialHack.task.update({ id, active });
    setSelectedTask(prev => (prev && prev.id === id ? { ...prev, active } : prev));
  }

  useEffect(() => {
    loadNodes();
    }
 
  , []); 


  return(

    <div>
      {menuOpen && <NodeMenu
        task={selectedTask}
      onClose={closeMenu} checkBox = {checkBoxData} />}
      <div className = 'Wrapper'>
      <DialogDefault onSubmit={onSubmit}> open </DialogDefault>
      <button className='Button Clear' onClick={clearData} >Clear</button>
      <GraphCanvas
        className = 'Canvas'
        theme={darkTheme}
        nodes={nodes}
        edges={edges}
        cameraMode="rotate"
        edgeArrowPosition="none" edgeInterpolation="straight"
        onNodeClick={(node) => {
        getNode(node.id);
        }}
        renderNode={({ size, color, opacity, id, selected }) => {
          const node = nodes.find(n => n.id === id);
          const importance = node?.importance ?? 1;
          const gray = Math.round(255 * (1 - 1 / importance));
          const fill = `rgb(${gray},${gray}, ${gray})`;
          return (
            <group>
              <mesh>
              <sphereGeometry attach="geometry" args={[size, 32, 32]} />
                <meshBasicMaterial  
                  attach="material"
                  color={fill}
                  opacity={opacity}
                  transparent
                />

              </mesh>
            </group>
          )
        }}
        />
      </div>
    </div>
  )


}

export default Canvas
