import { useContext } from 'react'
import { Context } from '../Context'

export function useRemoveItemsFromCart() {
  const { client, cart, setCart } = useContext(Context)
  async function removeItemsFromCart(lineItemIds: string[]) {
    if (cart == null || client == null) {
      throw new Error('Called removeItemsFromCart too soon')
    }

    const removeLineItemsResponse = await client.cart.removeLineItems(cart._id!, lineItemIds)
    setCart(removeLineItemsResponse.cart!)
  }

  return removeItemsFromCart
}
