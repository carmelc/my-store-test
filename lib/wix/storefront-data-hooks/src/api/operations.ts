import buildClient from '@lib/wix/client-builder'
import {WixStoresCollection, WixStoresConfig, WixStoresProduct} from "@lib/wix-types";

const fastClone = (obj: any) =>JSON.parse(JSON.stringify(obj));

export async function queryProducts(config: WixStoresConfig, limit: number = 100) {
  const {wixClient} = await buildClient(config)
  return wixClient.data.query({
    collectionName: 'Stores/Products',
    omitTotalCount: true,
    include: ['collections'],
    dataQuery: {
      paging: {
        limit,
      }
    }
  });
}


export async function queryCollections(config: WixStoresConfig, limit: number = 100) {
  const {wixClient} = await buildClient(config)
  return wixClient.data.query({
    collectionName: 'Stores/Collections',
    omitTotalCount: true,
    dataQuery: {
      paging: {
        limit,
      }
    }
  });
}

export async function getAllProducts(config: WixStoresConfig, limit?: number): Promise<WixStoresProduct[]> {
  return (await queryProducts(config, limit)).items! as WixStoresProduct[];
}

export async function getProductsForCollection(collectionId: string, config: WixStoresConfig, limit?: number) {
  return (await getAllProducts(config, limit))?.filter(({collections}) => collections.map(({_id}) => _id).indexOf(collectionId) > -1)
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

export async function getAllCollections(config: WixStoresConfig, limit?: number): Promise<WixStoresCollection[]> {
  return (await queryCollections(config, limit)).items! as WixStoresCollection[];
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
  const collections = await getAllCollections(config);
  let result: any = {};
  if (options.handle || options.id) {
    const collectionIdentifier = options.handle || options.id;
    result = collections.find(({ _id }) => _id === collectionIdentifier)
  } else {
    throw new Error('A collection ID is required')
  }
  if (!result) {
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
