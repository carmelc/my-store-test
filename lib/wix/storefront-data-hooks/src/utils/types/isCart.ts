import { Cart } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCart(potentialCart: Cart): potentialCart is Cart {
  return (
    potentialCart != null &&
    potentialCart._id != null &&
    potentialCart.lineItems != null
  )
}
