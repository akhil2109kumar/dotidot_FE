import {Edge, Node} from "reactflow";
import { Entity, EntityType } from "../types/enums";
import { createEdge } from "../nodeAndEdge/createEdge";

export function generateEdgesFromVariablesToEntity(
    entity: Entity,
    node: Node,
    edges: Edge[],
): void {
    const combinedPlaceholders = [
        ...(entity.getPlaceholdersWithoutConditions || []),
        ...(entity.getConditionsPlaceholders || []),
        ...(entity.imageGen
            ? entity.imageGen.getPlaceholdersWithoutConditions
            : []),
        ...(entity.imageGen ? entity.imageGen.getConditionsPlaceholders : []),
    ];

    const uniqueEdges = new Set(
        edges.map((edge) => `${edge.target}-${edge.source}`),
    );

    combinedPlaceholders.forEach((placeholder) => {
        const placeholderId = `${EntityType.DataSourceVariable}-${placeholder}`;
        const edgeIdentifier = `${node.id}-${placeholderId}`;

        if (!uniqueEdges.has(edgeIdentifier)) {
            uniqueEdges.add(edgeIdentifier);
            edges.push(createEdge({source: placeholderId, target: node.id}));
        }
    });
}