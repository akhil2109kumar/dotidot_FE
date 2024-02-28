import { Edge, Node } from "reactflow";
import { initializeBaskets } from "./initializeBaskets";
import { deepCloneObject } from "../utils/deepCloneObject";
import { mapEdgesToNodes } from "./mapEdgesToNodes";
import { calculateAdjustedDepths } from "../utils/calculateAdjustedDepths";
import { applyWaterfallEffect } from "../utils/applyWaterfallEffect";

const START_X = 100;
const BASKET_SPACING = 20;

export function generateLayout(nodes: Node[], edges: Edge[]): Node[] {
  const baskets = initializeBaskets();
  const nodesWithPositions = deepCloneObject(nodes);
  const { sourceTypesForNode, parentNodeIdForNode } = mapEdgesToNodes(
    nodesWithPositions,
    edges
  );
  nodesWithPositions.forEach((node: Node) => {
    for (const basketKey in baskets) {
      const basket = baskets[basketKey];
      if (basket.config.rules(node, sourceTypesForNode)) {
        basket.nodes.push(node);
        break;
      }
    }
  });

  const adjustedDepths = calculateAdjustedDepths(
    nodesWithPositions,
    parentNodeIdForNode
  );

  let startX = START_X;
  const basketSpacing = BASKET_SPACING;

  Object.keys(baskets).forEach((basketKey) => {
    const basket = baskets[basketKey];
    const startY = basket.config.startY;

    const maxDepth = applyWaterfallEffect(
      basket.nodes,
      startX,
      startY,
      adjustedDepths
    );

    startX += (maxDepth + 1) * 250 + basketSpacing;
  });

  return nodesWithPositions;
}
