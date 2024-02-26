import { useEffect, useState } from "react";
import ReactFlow, { Controls, Node, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

import { generateEdges } from "../utils/generate-edges";
import { generateNodes } from "../utils/generate-nodes";
import { IData } from "../types/enums";

function Graph() {
  const [data, setData] = useState<IData>();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const nodes = generateNodes(data);
      const edges = generateEdges(data, nodes);

      setNodes(nodes);
      setEdges(edges);
    }
  }, [data]);

  async function fetchData(): Promise<void> {
    const url =
      "https://gist.githubusercontent.com/ondrejbartas/1d1f070808fe582475a752fd8dd9bc5c/raw/03ff2c97e5b9576017be7ad70fa345ecf7dafc94/example_data.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`FETCH ERROR! ${response.status}`);
      }
      const data = await response.json();
      console.log(data,'data');
      setData(data?.data);
    } catch (error) {
      alert("Error fetching data");
      console.error(error);
    }
  }

  const resetHighlight = (): void => {
    const updatedNodes = nodes.map((node) => ({
      ...node,
      style: { ...node.style, opacity: 1 },
    }));

    const updatedEdges = edges.map((edge) => ({
      ...edge,
      animated: false,
      style: { ...edge.style, stroke: "#a6a6a6", opacity: 1 },
    }));

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const highlightSelection = (targetNode: Node): void => {
    const connectedNodeIds = new Set();
    edges.forEach((edge) => {
      if (edge.source === targetNode.id) {
        connectedNodeIds.add(edge.target);
      } else if (edge.target === targetNode.id) {
        connectedNodeIds.add(edge.source);
      }
    });

    const updatedNodes = nodes.map((node) => {
      const isActive =
        node.id === targetNode.id || connectedNodeIds.has(node.id);
      const opacity = isActive ? 1 : 0.25;
      return {
        ...node,
        style: { ...node.style, opacity },
        data: { ...node.data, active: isActive },
      };
    });

    const updatedEdges = edges.map((edge) => {
      const isSourceOrTarget =
        edge.source === targetNode.id || edge.target === targetNode.id;
      const strokeColor = isSourceOrTarget ? "#000" : "#a6a6a6";
      const opacity = isSourceOrTarget ? 1 : 0.75;
      return {
        ...edge,
        animated: isSourceOrTarget,
        style: { ...edge.style, stroke: strokeColor, opacity },
      };
    });

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const onPaneClick = () => {
    resetHighlight();
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodesConnectable={false}
        edges={edges}
        nodes={nodes}
        proOptions={{ hideAttribution: true }}
        fitView
        edgesFocusable={false}
        onNodeClick={(_event, node) => {
          resetHighlight();
          highlightSelection(node);
        }}
        onPaneClick={onPaneClick}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;
