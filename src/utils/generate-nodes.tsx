import { Node, Position } from "reactflow";
import { IData, IKeyword } from "../types/enums";

const positionXShift: number = 450;
const positionYShift: number = 100;
const positionCampaign: number = 500;
const positionYShiftExports: number = 200;

export function generateNodes(data: IData) {
  const nodes: Node[] = [];

  let rowOffset: number = 0;
  let rowOffsetExports: number = 0;
  let columnOffset: number = 0;

  // generate var nodes
  data?.variables.variables
    .filter((filterItem) => filterItem.additionalSource === null)
    .forEach((varItem) => {
      nodes.push({
        id: rowOffset.toString(),
        type: "input",
        sourcePosition: Position.Right,
        position: { x: columnOffset, y: rowOffset * positionYShift },
        data: { label: varItem.name, placeholderName: varItem.placeholderName },
        style: {
          minWidth: 100,
          width: "fit-content",
          fontSize: 16,
          backgroundColor: "#85b9db70",
          borderColor: "#85b9db",
        },
      });
      rowOffset++;
    });
  columnOffset++;

  // generate additional nodes
  data?.additionalSources.additionalSources.forEach((varItem) => {
    nodes.push({
      id: rowOffset.toString(),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      position: {
        x: columnOffset * positionXShift,
        y: rowOffset * positionYShift,
      },
      data: {
        label: varItem.name,
        originalId: varItem.id.toString(),
        placeholderName: varItem.placeholderName,
      },
      style: {
        minWidth: 100,
        width: "fit-content",
        fontSize: 16,
        backgroundColor: "#ffc96c6b",
        borderColor: "#ffc96c",
      },
    });
    rowOffset++;
  });
  columnOffset++;

  // generate var additional nodes
  data?.variables.variables
    .filter((filterItem) => filterItem.additionalSource !== null)
    .forEach((varItem) => {
      nodes.push({
        id: rowOffset.toString(),
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: {
          x: columnOffset * positionXShift,
          y: rowOffset * positionYShift,
        },
        data: {
          label: varItem.name,
          placeholderName: varItem.placeholderName,
          originalId: varItem.id.toString(),
        },
        style: {
          minWidth: 100,
          width: "fit-content",
          fontSize: 16,
          backgroundColor: "#3b95f66b",
          borderColor: "#3b95f6",
        },
      });
      rowOffset++;
    });
  columnOffset++;

  // generate campaign settings nodes
  data?.campaignSettings.campaignSettings.forEach((campaignItem) => {
    nodes.push({
      id: rowOffset.toString(),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      position: {
        x: columnOffset * positionXShift,
        y: positionCampaign + rowOffset,
      },
      data: {
        label: campaignItem.name,
        originalId: campaignItem.id.toString(),
      },
      style: {
        minWidth: 100,
        width: "fit-content",
        fontSize: 16,
        backgroundColor: "#cfb4ff6b",
        borderColor: "#cfb4ff",
        minHeight: "fit-content",
      },
    });
    rowOffset++;
  });
  columnOffset++;

  // generate feed exports nodes
  data?.feedExports.feedExports.forEach((exportItem) => {
    nodes.push({
      id: rowOffset.toString(),
      type: "output",
      targetPosition: Position.Left,
      position: {
        x: columnOffset * positionXShift,
        y: rowOffsetExports * positionYShiftExports,
      },
      data: { label: exportItem.name, originalId: exportItem.id.toString() },
      style: {
        minWidth: 100,
        width: "fit-content",
        fontSize: 16,
        backgroundColor: "#ff00006b",
        borderColor: "#ff0000",
      },
    });
    rowOffset++;
    rowOffsetExports++;
  });

  // generate adwords keywords nodes
  data?.campaignSettings.campaignSettings.forEach((campaignItem) => {
    nodes.push({
      id: rowOffset.toString(),
      type: "output",
      targetPosition: Position.Left,
      position: {
        x: columnOffset * positionXShift,
        y: rowOffsetExports * positionYShiftExports,
      },
      data: {
        label: "Google Ads Settings",
        originalId: campaignItem.adwordsSetting.id.toString(),
      },
      style: {
        minWidth: 100,
        width: "fit-content",
        fontSize: 16,
        backgroundColor: "#ff00006b",
        borderColor: "#ff0000",
      },
    });
    rowOffset++;
    rowOffsetExports++;

    const keywordSettings: IKeyword[] = campaignItem.keywordSettings;
    keywordSettings.forEach((keywordItem) => {
      nodes.push({
        id: rowOffset.toString(),
        type: "output",
        targetPosition: Position.Left,
        position: {
          x: columnOffset * positionXShift,
          y: rowOffsetExports * positionYShiftExports,
        },
        data: {
          label: keywordItem.name,
          originalId: keywordItem.id.toString(),
        },
        style: {
          minWidth: 100,
          width: "fit-content",
          fontSize: 16,
          backgroundColor: "#ff00006b",
          borderColor: "#ff0000",
        },
      });
      rowOffset++;
      rowOffsetExports++;
    });

    rowOffset++;
    rowOffsetExports++;
  });

  return nodes;
}
