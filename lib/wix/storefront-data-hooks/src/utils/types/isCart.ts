import { Cart } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';

export function isCart(potentialCart: Cart): potentialCart is Cart {
  return !!(
    potentialCart && potentialCart._id && potentialCart.lineItems
  )
}
