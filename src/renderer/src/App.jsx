import React from 'react';
import { GraphCanvas, darkTheme, SphereWithSvg} from 'reagraph';
import { useState } from 'react';
import {useEffect} from 'react' ;

export default function App() {


  /* name, desc, mode, importance */

  const[testList,setTestList] = useState([]);
  const[nodes,setNodes] = useState([
    {
      id: 'n-1',
      label: '1'
  
    },
    {
      id: 'n-2',
      label: '2'
    
    }
  ]);

  const[edges,setEdges] = useState([
      {
        id: '1->2',
        source: 'n-1',
        target: 'n-2',
        label: 'Edge 1-2'
      }
    ]);


    const nodesTest = [[
      {
        id: 'n-1',
        label: '1'
    
      },
      {
        id: 'n-2',
        label: '2'
      
      }
    ]]

  


function changeArr(name,desc,mode,importance) {
  let temp_arr = testList;
  temp_arr.push({"name": name , "desc": desc, "mode": mode, "importance": importance});
  setTestList(temp_arr);
  

}



useEffect(() => {
  changeArr("test","test","test","test")
  
 

    

}, []); 


return(
<GraphCanvas

    theme={darkTheme}
    nodes={nodes}
    edges={edges}
    cameraMode="rotate"
    edgeArrowPosition="none" edgeInterpolation="curved"
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
)
 
   




}
