/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useEffect, useState } from 'react'
import { LoadingDots } from '@components/ui'
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import { ProductCardProps } from '@components/common/ProductCard'
import { ProductCard } from '@components/common'

import {
  getCollection,
  getProduct,
} from '@lib/wix/storefront-data-hooks/src/api/operations'
import wixConfig from '@config/wix'
import { WixStoresProduct } from "@lib/wix-types";
interface HighlightedCardProps extends Omit<ProductCardProps, 'product'> {
  index: number
}

export interface ProductGridProps {
  products?: WixStoresProduct[]
  productsList?: Array<{ product: string }>
  collection?: string | any
  offset: number
  limit: number
  cardProps: Omit<ProductCardProps, 'product'>
  highlightCard?: HighlightedCardProps
}

export const ProductGrid: FC<ProductGridProps> = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const promises = productsList!
        .map((entry) => entry.product)
        .filter((handle: string | undefined) => typeof handle === 'string')
        .map(
          async (handle: string) => await getProduct(wixConfig, { handle })
        )
      setProducts(await Promise.all(promises))
      setLoading(false)
    }
    if (productsList && !initialProducts) {
      getProducts()
    }
  }, [productsList, initialProducts])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(wixConfig, {
        handle: collection,
      })
      setProducts(result.products)
      setLoading(false)
    }
    if (typeof collection === 'string' && !initialProducts) {
      fetchCollection()
    }
  }, [collection])

  if (loading) {
    return <LoadingDots />
  }

  return (
    <Grid gap={2} width={['100%', '40%', '24%']}>
      {products.slice(offset, limit).map((product, i) => (
        <ProductCard
          key={String(product.id) + i}
          {...(highlightCard?.index === i ? highlightCard : cardProps)}
          product={product}
        />
      ))}
    </Grid>
  )
}
