import { Edge, Node } from "reactflow";
import { Entity, EntityType, ProcessedIds } from "../types/enums";
import { generateUniqueId } from "../utils/generateUniqueId";
import { createNode } from "../nodeAndEdge/createNode";
import { createEdge } from "../nodeAndEdge/createEdge";
import { generateEdgesFromVariablesToEntity } from "../utils/generateEdgesFromVariablesToEntity";
import { entitiesToCreate } from "./createEntities";

export function processEntities(
  collection: Entity[],
  nodes: Node[],
  edges: Edge[],
  parentId: string | null = null,
  processedIds: ProcessedIds
): void {
  collection.forEach((entity) => processEntity(entity, parentId, nodes, edges, processedIds),);
}


const processEntity = (
    entity: Entity,
    parentId: string | null,
    nodes: Node[],
    edges: Edge[],
    processedIds: ProcessedIds,
) => {
    const uniqueId = generateUniqueId(entity);
    const nodeAlreadyExists = processedIds.has(uniqueId);

    if (!nodeAlreadyExists) {
      processedIds.add(uniqueId);
    }

    let node = createNode(entity, uniqueId);

    if (nodeAlreadyExists) {
      const existingNodeIndex = nodes.findIndex((n) => n.id === uniqueId);
      if (existingNodeIndex !== -1) {
        const existingNode = nodes[existingNodeIndex];
        Object.assign(existingNode, node);
        node = existingNode;
      }
    } else {
      nodes.push(node);
    }

    //Type specific logic
    if (
      entity.__typename === EntityType.AdditionalSource &&
      entity.mappingField
    ) {
      const dataSourceVariableId = `${EntityType.DataSourceVariable}-${entity.mappingField}`;
      const dataSourceVariableExists = nodes.some(
        (node) => node.id === dataSourceVariableId
      );
      if (dataSourceVariableExists) {
        edges.push(
          createEdge({ source: dataSourceVariableId, target: uniqueId })
        );
      }
    } else if (
      entity.__typename === EntityType.AdditionalSource &&
      parentId
    ) {
      edges.push(createEdge({ source: uniqueId, target: parentId }));
    } else {
      if (entity.parentId && entity.parentId !== 0) {
        const parentUniqueId = `${entity.__typename}-${entity.parentId}`;
        edges.push(createEdge({ source: parentUniqueId, target: node.id }));
      } else if (
        parentId &&
        entity.__typename !== EntityType.DataSourceVariable
      ) {
        edges.push(createEdge({ source: parentId, target: node.id }));
      }
    }

    generateEdgesFromVariablesToEntity(entity, node, edges);

    const entityProperties = entitiesToCreate.entitySpecificProperties[entity.__typename] || [];

    entityProperties.forEach((property) => {
      const propertyValue = entity[property as keyof Entity];
      if (Array.isArray(propertyValue)) {
        if (property === "baseAdtexts") {
          processEntities(
            propertyValue as Entity[],
            nodes,
            edges,
            node.id,
            processedIds
          );
        } else {
          propertyValue.forEach((nestedEntity: Entity) =>
            processEntity(nestedEntity, node.id, nodes, edges, processedIds)
          );
        }
      } else if (propertyValue) {
        processEntity(
          propertyValue as Entity,
          node.id,
          nodes,
          edges,
          processedIds
        );
      }
    });
}