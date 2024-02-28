import { Node } from "reactflow";
import { EntityType } from "../types/enums";
import { nodeStyle } from "./nodeStyle";

export function applyWaterfallEffect(
  basket: Node[],
  startX: number,
  startY: number,
  adjustedDepths: Record<string, number>
): number {
  basket.sort((a, b) => {
    const typeComparison = a.data.type.localeCompare(b.data.type);
    if (typeComparison !== 0) return typeComparison;

    return (adjustedDepths[a.id] || 0) - (adjustedDepths[b.id] || 0);
  });

  let currentY = startY;
  let maxDepth = 0;

  basket.forEach((node) => {
    const depth = adjustedDepths[node.id] || 0;
    maxDepth = Math.max(maxDepth, depth);
    const xModifier =
      node.data.__typename === EntityType.BaseAdtext ? 100 : 250;
    node.position = { x: startX + depth * xModifier, y: currentY };
    node.style = {
      fontSize: 14,
      width: "fit-content",
      minWidth: 150,
      ...nodeStyle(node.position.x),
    };
    currentY += 100;
  });

  return maxDepth;
}
