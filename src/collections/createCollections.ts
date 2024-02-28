/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Edge, Node } from "reactflow";

import { entitiesToCreate } from "./createEntities";
import { IData } from "../types/enums";
import { processEntities } from "./processEntities";

export function createCollections(jsonData: IData): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const processedIds = new Set<string>();

  entitiesToCreate.collections.forEach((collectionName: string) => {
    const key = collectionName as keyof IData;
    //@ts-expect-error
    const collectionEntities = jsonData[key]?.[key];
    if (Array.isArray(collectionEntities)) {
      processEntities(collectionEntities, nodes, edges, null, processedIds);
    } else {
      console.error(
        `Expected an array for ${collectionName}, but received:`,
        collectionEntities
      );
    }
  });

  return { nodes, edges };
}
