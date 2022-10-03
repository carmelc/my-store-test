import { useCartItems } from './useCartItems'
import { LineItem } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';

export function useGetLineItem() {
  const cartItems = useCartItems()

  function getLineItem(variantId: string | number): LineItem | null {
    if (cartItems.length < 1) {
      return null
    }

    const item = cartItems.find((cartItem) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return cartItem.variant.id === variantId
    })

    if (item == null) {
      return null
    }

    return item
  }

  return getLineItem
}
