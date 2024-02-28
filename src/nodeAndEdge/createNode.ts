import { Node, Position } from "reactflow";

import { Entity } from "../types/enums";
import { getNodeType } from "../types/getNodeTypes";

export function createNode(entity: Entity, uniqueId: string): Node {
  const typeName = entity.__typename;
  const label = entity.name || typeName || entity.id.toString();
  const type = getNodeType(entity);

  return {
    id: uniqueId,
    type: "custom-node",
    data: {
      ...entity,
      label: label,
      type: type,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 0, y: 0 },
    width: 200,
    height: 50,
  };
}
