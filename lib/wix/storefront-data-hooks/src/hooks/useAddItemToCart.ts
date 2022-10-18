import { useAddItemsToCart } from './useAddItemsToCart'
import {LineItem} from "@lib/wix-stores.model";

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
