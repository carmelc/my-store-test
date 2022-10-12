import { restrictedRegister } from 'blocks/utils'
import dynamic from 'next/dynamic'


const isDemo = Boolean(process.env.IS_DEMO)
const LazyProductView = dynamic(
  () => import(`blocks/ProductView/ProductView`),
  { ssr: true }
)

restrictedRegister(
  LazyProductView,
  {
    name: 'ProductView',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg',
    description:
      'Product details, should only be used in product page template, dynamically bind to product in context.',
    defaults: {
      bindings: {
        'component.options.product': 'state.product',
        'component.options.title': 'state.product.title',
        'component.options.description': 'state.product.descriptionHtml',
        'component.options.renderSeo': 'true',
      },
    },
  },
  ['product-page', 'theme']
)

restrictedRegister(
  LazyProductView,
  {
    name: 'ProductBox',
    inputs: [
      {
        name: 'product',
        type: `WixStoresProductHandle`,
      },
      {
        name: 'description',
        richText: true,
        type: 'html',
        helperText: 'Override product description',
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Override product title',
      },
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show in the box',
  },
  ['page', 'collection-page', 'theme']
)
