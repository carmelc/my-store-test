import type { LineItem } from "@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal";

const WIX_STORES_APP_ID = '1380b703-ce81-ff05-f115-39571d94dfcd';

export const getPrice = (price: any) => price?.formatted?.price ?? '0.00';

export const toWixStoresLineItem = (product: any, productOptions: {[key: string]: any}): LineItem => {
  const options = productOptions ? Object.keys(productOptions).reduce((optionsAcc, optionKey) => {
      optionsAcc[optionKey] = productOptions[optionKey].description;
      return optionsAcc;
    }, {} as Record<string, any>) : undefined;

  const lineItem = {
    quantity: 1,
    catalogReference: {
      catalogItemId: product.id,
      options: {options},
      appId: WIX_STORES_APP_ID
    }
  };
  return lineItem
}
