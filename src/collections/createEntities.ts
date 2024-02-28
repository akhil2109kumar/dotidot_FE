/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EntitiesToCreate {
  entitySpecificProperties: {
    [key: string]: any[];
  };
  collections: any[] | string[];
}

export const entitiesToCreate = {
  entitySpecificProperties: {
    CampaignSetting: [
      "bidRules",
      "baseAdtexts",
      "keywordSettings",
      "adwordsSetting",
    ],
    DataSourceVariable: ["additionalSource"],
    FeedExport: [],
    AdditionalSource: [],
  },
  collections: [
    "variables",
    "feedExports",
    "additionalSources",
    "campaignSettings",
  ],
} as EntitiesToCreate;
