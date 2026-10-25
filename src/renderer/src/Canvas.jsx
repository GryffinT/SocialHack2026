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
  setNodes(tasks.map(t => ({ id: String(t.id), label: t.name })));
  
  const ids = new Set(tasks.map(t => String(t.id)));
  console.log('ids', ids)
  const newEdges = [];

  console.log('load')

  for (const t of tasks) {

    //console.log(t);

    const buddies = JSON.parse(t.buddies);

    for (const b of buddies) {
      //console.log(b)

      if (ids.has(b.id)) {
        console.log(b)

        newEdges.push({ id: `${t.id}-${b.id}`, source: String(t.id), target: String(b.id) });
      }
    }
  }

  setEdges(newEdges);
  console.log("Edge Array", edges);
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

async function onSubmit(name,desc){
  await window.socialHack.task.create({ name:name, desc:desc, importance:1, mode:1 });
  await loadNodes();
}

function closeMenu(){
  setMenuOpen(false);
}


useEffect(() => {
  loadNodes();
  }
  
, []); 


return(

  <div>
    {menuOpen && <NodeMenu
      task={selectedTask}
     onClose={closeMenu} />}
    <div className = 'Wrapper'>
    <DialogDefault onSubmit={onSubmit}> open </DialogDefault>
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
        renderNode={({ size, color, opacity, id, selected }) => (
          <group>
            <mesh>
            <sphereGeometry attach="geometry" args={[size, 32, 32]} />
              <meshBasicMaterial  
                attach="material"
                color={color}
                opacity={opacity}
                transparent
              />

            </mesh>
          </group>
        )}
      />
    </div>
  </div>

)
 

}
export default Canvas
