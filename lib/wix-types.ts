export type WixStoresProduct = {
  _id: string;
  formattedPrice: string;
  mainMedia: string;
  slug: string;
  name: string;
};

export type WixStoresCollection = {
  _id: string;
  name: string;
  mainMedia: string;
};

export interface WixStoresConfig {
  domain: string;
  storefrontAccessToken: string;
  language?: string;
}
