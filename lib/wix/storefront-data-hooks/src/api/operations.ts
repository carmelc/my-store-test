import buildClient from '@lib/wix/client-builder'
import {WixStoresCollection, WixStoresConfig, WixStoresProduct} from "@lib/wix-types";

const fastClone = (obj: any) =>JSON.parse(JSON.stringify(obj));

async function queryProducts(config: WixStoresConfig, {
  searchString = '',
  limit = 100,
  collectionId = '',
  id = '',
  slug = '',
}) {
  const {wixClient} = await buildClient(config)

  return (await wixClient.data.query({
    collectionName: 'Stores/Products',
    omitTotalCount: true,
    include: ['collections'],
    dataQuery: {
      filter: {
        ...(searchString ? {
          name: { $contains: searchString },
        } : {}),
        ...(collectionId ? {
          collections: { $hasSome: [ collectionId ] },
        } : {}),
        ...(slug ? { slug } : {}),
        ...(id ? { _id: id } : {}),
      },
      paging: {
        limit,
      }
    }
  })).items as WixStoresProduct[];
}


async function queryCollections(config: WixStoresConfig, {searchString = '', limit = 100} = {}) {
  const {wixClient} = await buildClient(config)
  return (await wixClient.data.query({
    collectionName: 'Stores/Collections',
    omitTotalCount: true,
    dataQuery: {
      paging: {
        limit,
      }
    }
  })).items as WixStoresCollection[];
}

export async function getAllProducts(config: WixStoresConfig, { limit = 100 } = {}): Promise<WixStoresProduct[]> {
  return queryProducts(config, {limit});
}

export async function getProductsForCollection(collectionId: string, config: WixStoresConfig, { limit = 100 } = {}) {
  return queryProducts(config, {collectionId, limit})
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
  {id, handle}: { id?: string; handle?: string }
) {
  if (id || handle) {
    const product = (await queryProducts(config, {id, slug: handle}))?.[0];
    if (!product) {
      console.error('Product was not found for options', { id, handle })
      return null
    }
    return fastClone(product)
  } else {
    throw new Error('A product ID or handle is required')
  }
}

export async function getAllCollections(config: WixStoresConfig): Promise<WixStoresCollection[]> {
  return queryCollections(config);
}

export async function getAllCollectionPaths(
  config: WixStoresConfig,
): Promise<string[]> {
  const collections: any[] = await getAllCollections(config);
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
  return queryProducts(config, {searchString});
}
