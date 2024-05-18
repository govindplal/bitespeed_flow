"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import TextNode from "@/components/textnode";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { addEdge, Background, Controls, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css';

let id = 0;
const getId = () => `node_${id++}`;

export default function Home() {


  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeText, setNodeText] = useState("");

    // Define custom node types
    const nodeTypes = useMemo(
      () => ({
        textnode: TextNode,
      }),
      []
    );

    // Update nodes data when nodeText or selectedElements changes
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
              node.data = {
                ...node.data,
                text: nodeText,
              };
            }
          return node;
        })
      );
    } else {
      setNodeText(""); // Clear nodeText when no node is selected
    }
  }, [nodeText, selectedElements, setNodes]);

   // Handle node click
   const onNodeClick = useCallback((event, node) => {
    setSelectedElements([node]);
    setNodeText(node.data.text);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div className="flex flex-col gap-0">
      <Navbar/>
    <div className="flex flex-row w-screen h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          fitView
          >
            <Background/>
            <Controls />
          </ReactFlow>
          <Sidebar
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
          nodeText={nodeText}
          setNodeText={setNodeText}
          />
    </div>
    </div>
  );
};