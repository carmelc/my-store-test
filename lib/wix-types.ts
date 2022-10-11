export type WixStoresProduct = {
  _id: string;
  price: { formatted: { price: string } };
  media: { mainMedia: { image: { url: string } } };
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
  wixSiteCheckoutUrl: string;
  storefrontAccessToken: string;
  language?: string;
}
