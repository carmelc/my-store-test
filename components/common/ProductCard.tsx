/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import { Card, Text } from '@theme-ui/components'
import { Link, ImageCarousel } from '@components/ui'
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

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = product.slug
  const price = product.formattedPrice;

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.name}
            images={
              product.mainMedia ?  [{ src: product.mainMedia }] : []
            }
          />
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

export default ProductCard
