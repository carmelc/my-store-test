import buildClient from '@lib/wix/client-builder'
import { WixStoresConfig } from "@lib/wix-types";

const fastClone = (obj: any) =>JSON.parse(JSON.stringify(obj));

export async function queryProducts(config: WixStoresConfig, limit: number = 500) {
  const {wixClient, legacyFetch} = await buildClient(config)
  return {items: (await legacyFetch({url: 'stores/v1/products/query', method: 'POST'})).products};
  // return wixClient.data.query({
  //   collectionName: 'Stores/Products',
  //   query: {
  //     paging: {
  //       limit,
  //     }
  //   }
  // });
}


export async function queryCollections(config: WixStoresConfig, limit: number = 500) {
  const {wixClient, legacyFetch} = await buildClient(config)
  return {items: (await legacyFetch({url: 'stores/v1/collections/query', method: 'POST'})).collections};
  // return wixClient.data.query({
  //   collectionName: 'Stores/Collections',
  //   query: {
  //     paging: {
  //       limit,
  //     }
  //   }
  // });
}

export async function getAllProducts(config: WixStoresConfig, limit?: number) {
  return (await queryProducts(config, limit)).items!;
}

export async function getProductsForCollection(collectionId: string, config: WixStoresConfig, limit?: number) {
  const products = (await queryProducts(config, limit)).items!;
  return products?.filter(({collectionIds}: {collectionIds: string[]}) => collectionIds.indexOf(collectionId) > -1)
}

export async function getAllProductPaths(
  config: WixStoresConfig,
  limit?: number
): Promise<string[]> {
  // interface need update
  const products: any[] = await getAllProducts(config);
  return products.map((val) => val.slug)
}

export async function getProduct(
  config: WixStoresConfig,
  options: { id?: string; handle?: string }
) {
  const products: any[] = await getAllProducts(config);
  let result = {};
  if (options.handle) {
    result = products.find(({ slug }) => slug === options.handle)
  } else if (options.id) {
    result = products.find(({ id }) => id=== options.id)
  } else {
    throw new Error('A product ID or handle is required')
  }
  if (!result) {
    console.error('Product was not found for options', options)
    return null
  }
  return fastClone(result)
}

export async function getAllCollections(config: WixStoresConfig, limit?: number) {
  return (await queryCollections(config, limit)).items!;
}

export async function getAllCollectionPaths(
  config: WixStoresConfig,
  limit?: number
): Promise<string[]> {
  const collections: any[] = await getAllCollections(config, limit);
  // interface need update
  return collections.map((val) => val.handle)
}

export async function getCollection(
  config: WixStoresConfig,
  options: { id?: string; handle?: string }
) {
  const collections: any[] = await getAllCollections(config);
  let result = {};
  if (options.handle || options.id) {
    const collectionIdentifier = options.handle || options.id;
    result = collections.find(({ id }) => id === collectionIdentifier)
  } else {
    throw new Error('A collection ID is required')
  }
  if (!result) {
    console.error('Collection was not found for options', options)
    return null
  }
  return fastClone(result)
}

export async function searchProducts(
  config: WixStoresConfig,
  searchString: string,
) {
  const products: any[] = await getAllProducts(config);
  const searchLowerCase = searchString.toLowerCase();
  return products.filter(({name}) => name.toLowerCase().indexOf(searchLowerCase) > -1);
}