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
    }
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