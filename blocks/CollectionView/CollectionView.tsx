/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { Themed, jsx } from 'theme-ui'
import { LoadingDots } from '@components/ui'
import wixConfig from '@config/wix'
import { ProductGrid, ProductGridProps } from '../ProductGrid/ProductGrid'
import {
  getAllProducts,
  getCollection,
  getProduct,
  getProductsForCollection
} from '@lib/wix/storefront-data-hooks/src/api/operations'
import { WixStoresCollection } from "@lib/wix-types";

interface Props {
  className?: string
  children?: any
  collection: string | WixStoresCollection
  productGridOptions: ProductGridProps
  renderSeo?: boolean
}

const CollectionPreview: FC<Props> = ({
  collection: selectedCollection,
  productGridOptions,
  renderSeo,
}) => {
  const collection: WixStoresCollection  = typeof selectedCollection === 'string' ? {
    id: selectedCollection,
    name: 'Collection Name Preview'
  } : selectedCollection;
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (collection?.id) {
      setLoading(true)
      getProductsForCollection(collection.id, wixConfig).then(products => {
        setProducts(products)
        setLoading(false)
      })
    }
  }, [collection.id])

  if (loading || !collection?.id) {
    return <LoadingDots />
  }
  if (!products?.length) {
    return <Themed.h1>No products found for collection: {collection?.name}</Themed.h1>
  }


  return (
    <Themed.div
      sx={{ display: 'flex', flexDirection: 'column' }}
      key={collection.id}
    >
      {renderSeo && (
        <NextSeo
          title={collection.name}
          description={collection.name}
          openGraph={{
            type: 'website',
            title: collection.name,
            description: collection.name,
          }}
        />
      )}
      <Themed.div sx={{ p: 5 }}>
        <ProductGrid {...productGridOptions} products={products} />
      </Themed.div>
    </Themed.div>
  )
}

export default CollectionPreview
