import { Edge, Node } from "reactflow";

export function connectByPlaceholder(placeholders: string[], id: string, nodes: Node[]): Edge[] {
  const newEdges: Edge[] = [];
  placeholders
  .forEach(placeholderItem => {
    const source: Node | undefined = nodes.find(findVarItem => findVarItem.data.placeholderName === placeholderItem);
    if (source) {
      const target: Node | undefined = nodes.find(findVarItem => findVarItem.data.originalId === id);
      if (target) {
        newEdges.push({
          id: `e${source.id}-${target.id}`,
          source: source.id,
          target: target.id,
        })
      }
    }
  })

  return newEdges
}

export function connectById(idSource: string, idTarget: string, nodes: Node[]): Edge[] {
  const newEdges: Edge[] = [];
  const source: Node | undefined = nodes.find(findVarItem => findVarItem.data.originalId === idSource);
  if (source) {
    const target: Node | undefined = nodes.find(findVarItem => findVarItem.data.originalId === idTarget);
    if (target) {
      newEdges.push({
        id: `e${source.id}-${target.id}`,
        source: source.id,
        target: target.id,
      })
    }
  }

  return newEdges
}