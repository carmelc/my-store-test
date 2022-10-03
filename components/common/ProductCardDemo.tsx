/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import Image from 'next/image'
import { Card, Text } from '@theme-ui/components'
import { Link } from '@components/ui'
import { useState } from 'react'
import { WixStoresProduct } from '@lib/wix-types';

export interface ProductCardProps {
  className?: string
  product: WixStoresProduct
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCardDemo: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [showAlternate, setShowAlternate] = useState(false)
  const [canToggle, setCanToggle] = useState(false)
  const src = product.mainMedia;
  const handle = (product as any).handle
  const price = product.formattedPrice
  if (product) {
    console.log('*** showing product demo', product);
  }

  return (
    <Card
      sx={{
        maxWidth: [700, 500],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOut={() => setShowAlternate(false)}
      onMouseOver={() => setShowAlternate(true)}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <div
          >
            <Image
              quality="85"
              src={src}
              alt={product.name}
              width={imgWidth || 540}
              sizes={imgSizes}
              height={imgHeight || 540}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
            />
          </div>
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.name}
          </Themed.h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCardDemo
