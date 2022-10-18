import type { Cart } from '@lib/wix-stores.model';

export function isCart(potentialCart: Cart): potentialCart is Cart {
  return !!(
    potentialCart && potentialCart._id && potentialCart.lineItems
  )
}
