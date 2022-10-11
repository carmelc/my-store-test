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
  return {items: (await legacyFetch({url: 'stores/v1/collections/query', method: 'POST'}))};
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
    throw new Error('Product was not found for options')
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
  if (options.handle) {
    return fastClone(collections.find(({ slug }) => slug === options.handle))
  } else if (options.id) {
    return fastClone(collections.find(({ id }) => id=== options.id))
  } else {
    throw new Error('A product ID or handle is required')
  }
}

export async function searchProducts(
  config: WixStoresConfig,
  searchString: string,
) {
  const products: any[] = await getAllProducts(config);
  const searchLowerCase = searchString.toLowerCase();
  return products.filter(({name}) => name.toLowerCase().indexOf(searchLowerCase) > -1);
}
