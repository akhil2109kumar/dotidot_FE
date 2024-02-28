import { Baskets, NodeType } from "../types/enums";

export function initializeBaskets(): Baskets {
    return {
        dataFieldNoTarget: {
            nodes: [],
            config: {
                rules: (node, sourceTypesForNode) =>
                    node.data.type === NodeType.Variable &&
                    !(sourceTypesForNode[node.id]?.size > 0),
                startY: 0,
            },
        },
        additionalSource: {
            nodes: [],
            config: {
                rules: (node) => node.data.type === NodeType.AdditionalSource,
                startY: 25,
            },
        },
        dataFieldWithTarget: {
            nodes: [],
            config: {
                rules: (node, sourceTypesForNode) =>
                    node.data.type === NodeType.Variable &&
                    sourceTypesForNode[node.id]?.size > 0,
                startY: 50,
            },
        },
        modifier: {
            nodes: [],
            config: {
                rules: (node) => node.data.type === NodeType.Modifier,
                startY: 75,
            },
        },
        campaignSetting: {
            nodes: [],
            config: {
                rules: (node) => node.data.type === NodeType.Campaign,
                startY: 50,
            },
        },
        others: {nodes: [], config: {rules: () => true, startY: 0}},
    };
}