"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import TextNode from "@/components/textnode";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { addEdge, Background, Controls, updateEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';

let id = 0;
const getId = () => `node_${id++}`;

// Key for local storage
const flowKey = "flow-key";

export default function Home() {

  const edgeUpdateSuccessful = useRef(true);
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
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const reactflow = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      // Get the source handle id
  const sourceHandleId = params.sourceHandle;
  
  const edges =reactflow.getEdges();
  // Get the edges connected to this source handle
  const connectedEdges = edges.filter(edge => edge.sourceHandle === sourceHandleId);
  // Only add the edge if there are no edges connected to this source handle
  if (connectedEdges.length === 0) {
      setEdges((eds) => addEdge({ ...params,markerEnd: { type: 'arrowclosed' } }, eds))}
    },
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
        data: { text: `test message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

    // Check for empty target handles
    const checkEmptyTargetHandles = () => {
      let emptyTargetHandles = 0;
      edges.forEach((edge) => {
        if (!edge.targetHandle) {
          emptyTargetHandles++;
        }
      });
      return emptyTargetHandles;
    };

    // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );
    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

    // Save flow to local storage
    const saveFlow = useCallback(() => {
      if (reactFlowInstance) {
        const emptyTargetHandles = checkEmptyTargetHandles();
        if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
          alert(
            "Error: More than one node has an empty target handle or there are unconnected nodes."
          );
        } else {
          const flow = reactFlowInstance.toObject();
          localStorage.setItem(flowKey, JSON.stringify(flow));
          alert("Save successful!"); // Provide feedback when save is successful
        }
      }
    }, [reactFlowInstance, nodes, isNodeUnconnected]);

  return (
    <div className="flex flex-col gap-0">
      <Navbar saveFlow={saveFlow}/>
    <div className="flex flex-row w-screen h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={() => {
            setSelectedElements([]); // Reset selected elements when clicking on pane
            setNodes((nodes) =>
              nodes.map((n) => ({
                ...n,
                selected: false, // Reset selected state of nodes when clicking on pane
              }))
            );
          }}
          onNodesDelete={() => {
            setSelectedElements([]); // Reset selected elements when clicking on pane
            setNodes((nodes) =>
              nodes.map((n) => ({
                ...n,
                selected: false, // Reset selected state of nodes when clicking on pane
              }))
            );
          }}
          fitView
          deleteKeyCode = {"Delete"}
          panActivationKeyCode={"Space"}
          panOnDrag = {false}
          panOnScroll = {true}
          selectionMode="partial"
          selectionOnDrag = {true}
          zoomActivationKeyCode={["Meta","Control"]}
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