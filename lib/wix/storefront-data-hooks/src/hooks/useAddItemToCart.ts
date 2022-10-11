import { useAddItemsToCart } from './useAddItemsToCart'
import {LineItem} from "@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal";

export function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart()

  async function addItemToCart(
    item: LineItem
  ) {
    const items = [item]

    return addItemsToCart(items)
  }

  return addItemToCart
}
