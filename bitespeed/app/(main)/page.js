"use client"
import ReactFlow, { Background, Controls } from "reactflow";
import 'reactflow/dist/style.css';

export default function Home() {
  return (
<div className="flex flex-row w-[80vw] py-2">
  <ReactFlow>
    <Background/>
    <Controls/>
  </ReactFlow>
</div>
  );
}
