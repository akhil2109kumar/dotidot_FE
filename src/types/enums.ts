import { Node } from "reactflow";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IData {
  additionalSources: {
    additionalSources: any[];
    __typename: string;
  };
  campaignSettings: {
    campaignSettings: any[];
    __typename: string;
  };
  feedExports: {
    feedExports: any[];
    __typename: string;
  };
  variables: {
    variables: any[];
    __typename: string;
  };
}

export enum NodeType {
  Variable = "variable",
  Modifier = "modifier",
  AdditionalSource = "additional-source",
  Campaign = "campaign",
  FeedExport = "feed-export",
  KeywordSetting = "keyword-setting",
  AdwordsSetting = "adwords-setting",
  BaseAdtext = "base-adtext",
  BidRule = "bid-rule",
  Default = "default",
}

export interface IKeyword {
  id: number;
  name: string;
  target: string;
  getConditionsPlaceholders: string[];
  getPlaceholdersWithoutConditions: string[];
  __typename: string;
}

export enum EntityType {
  DataSourceVariable = "DataSourceVariable",
  AdditionalSource = "AdditionalSource",
  CampaignSetting = "CampaignSetting",
  FeedExport = "FeedExport",
  KeywordSetting = "KeywordSetting",
  AdwordsSetting = "AdwordsSetting",
  BaseAdtext = "BaseAdtext",
  BidRule = "BidRule",
}

export interface Entity {
  __typename: string;
  id: string | number;
  parentId?: string | number;
  mappingField?: string;
  placeholderName?: string;
  getPlaceholdersWithoutConditions?: string[];
  getConditionsPlaceholders?: string[];
  imageGen?: {
    getPlaceholdersWithoutConditions: string[];
    getConditionsPlaceholders: string[];
  } | null;
  [key: string]: unknown;
}

export interface BasketConfig {
  rules: (
      node: Node,
      sourceTypesForNode: Record<string, Set<string>>,
  ) => boolean;
  startY: number;
}

export interface Baskets {
  [key: string]: {
    nodes: Node[];
    config: BasketConfig;
  };
}

export type ProcessedIds = Set<string>;