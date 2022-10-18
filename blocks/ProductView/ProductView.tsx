/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/wix/storefront-data-hooks'
import {getPrice, toWixStoresLineItem} from '@lib/wix/storefront-data-hooks/src/utils/product'
import { ImageCarousel, LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'
import {WixStoresProduct} from "@lib/wix-stores.model";
import { media } from '@wix/sdk';

interface Props {
  className?: string
  children?: any
  product: WixStoresProduct
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo,
  description = product.description,
  title = product.name,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()

  const { openSidebar } = useUI()

  const [selectedProductOptions, setSelectedProductOptions] = useState<any>({});
  useEffect(() => {
    const productOptionsArr = Object.values(product.productOptions ?? {});
    if (productOptionsArr.length) {
      setSelectedProductOptions(productOptionsArr.reduce((acc: {[key: string]: any}, curr) => {
        acc[curr.name] = curr.choices[0];
        return acc;
      }, {}));
    }
  }, [product]);

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(toWixStoresLineItem(product, selectedProductOptions))
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const allImages = product?.mediaItems
    ?.filter(({type}) => type === 'Image')
    .map(({src}: any) => media.getRawImageUrl(src))
    .map(media => ({
      ...media,
      src: media.url,
    }));

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: media.getScaleToFitImageURL(product.mediaItems?.[0]?.src!, 800, 600, {}),
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <Grid gap={4} columns={[1, 2]}>
        <div>
          <div
            sx={{
              border: '1px solid gray',
              padding: 2,
              marginBottom: 2,
            }}
          >
            <ImageCarousel
              showZoom
              alt={title}
              width={1050}
              height={1050}
              priority
              images={allImages?.length > 0 ? allImages as any : [{
                  src: `https://via.placeholder.com/1050x1050`,
                }]}
            ></ImageCarousel>
          </div>
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <Themed.h1>{title}</Themed.h1>
            <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
              {getPrice(product?.price)}
            </Themed.h4>
          </span>
          <div dangerouslySetInnerHTML={{ __html: description! }} />
          <div>
            <Grid padding={2} columns={2}>
              {(product && selectedProductOptions) ? Object.values(product.productOptions ?? {}).map((productOption: any) => (<OptionPicker
                key={productOption.name}
                name={productOption.name}
                options={productOption.choices?.filter(({inStock, visible}: any) => inStock && visible).map((op: any) => op.description as string)}
                selected={(selectedProductOptions![productOption.name]?.description)}
                onChange={(event) => setSelectedProductOptions({
                  ...(selectedProductOptions as any),
                  [productOption.name]: productOption.choices?.find(({description}: {description: string}) => description === event.target.value)
                })}
              />)) : null}
            </Grid>
          </div>
          <Button
            name="add-to-cart"
            disabled={loading}
            sx={{ margin: 2, display: 'block' }}
            onClick={addToCart}
          >
            Add to Cart {loading && <LoadingDots />}
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  )
}

const ProductView: React.FC<{
  product: string | WixStoresProduct
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
