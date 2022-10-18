/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { getProduct } from '@lib/wix/storefront-data-hooks/src/api/operations'
import wixConfig from '@config/wix'
import { LoadingDots } from '@components/ui'
import {WixStoresProduct} from "@lib/wix-stores.model";

interface Props {
  className?: string
  children: (product: any) => React.ReactElement
  product: string | WixStoresProduct
}

const ProductLoader: React.FC<Props> = ({
  product: initialProduct,
  children,
}) => {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(false)

  useEffect(() => setProduct(initialProduct), [initialProduct])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const result = await getProduct(wixConfig, {
        handle: String(product),
      })
      setProduct(result)
      setLoading(false)
    }
    if (typeof product === 'string') {
      fetchProduct()
    }
  }, [product])

  if (!product || typeof product === 'string' || loading) {
    return children({ name: 'loading' })
  }
  return children(product)
}

export default ProductLoader
