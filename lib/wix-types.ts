export type WixStoresProduct = {
  id: string;
  price: { formatted: { price: string } };
  media: { mainMedia: { image: { url: string } } };
  slug: string;
  name: string;
};

export type WixStoresCollection = {
  id: string;
  name: string;
};

export interface WixStoresConfig {
  domain: string;
  wixSiteCheckoutUrl: string;
  storefrontAccessToken: string;
  language?: string;
}

