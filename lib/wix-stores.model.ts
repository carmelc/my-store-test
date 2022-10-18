import { cart } from '@wix/ecom'

export type LineItem = cart.LineItem;
export type Cart = cart.Cart;
export const ChannelType = cart.ChannelType;

export type WixStoresProduct = {
  _id: string;
  description: string;
  productOptions: {[key: string]: {
    name: string;
    optionType: string;
    choices: {
        description: string;
        inStock: boolean;
        value: string;
        visible: boolean;
      }[]}},
  price: { formatted: { price: string } };
  mediaItems: {
    src: string,
    type: string,
  }[];
  collections: WixStoresCollection[]
  slug: string;
  name: string;
};

export type WixStoresCollection = {
  _id: string;
  name: string;
};

export interface WixStoresConfig {
  domain: string;
  wixSiteCheckoutUrl: string;
  storefrontAccessToken: string;
  language?: string;
}

