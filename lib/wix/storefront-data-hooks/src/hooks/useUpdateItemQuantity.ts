import { useContext } from 'react'
import { Context } from '../Context'

export function useUpdateItemQuantity() {
  const { client, cart, setCart } = useContext(Context)
  async function updateItemQuantity(
    lineItemId: string,
    quantity: number
  ) {
    if (!cart) {
      throw new Error('Called too soon, cart is not available')
    }
    if (!lineItemId) {
      throw new Error('Must provide a lineItemId')
    }

    if (quantity == null || Number(quantity) < 0) {
      throw new Error('Quantity must be greater than 0')
    }

    const updateResult = await client?.cart.updateLineItemsQuantity(cart!._id!, [
      { _id: lineItemId, quantity },
    ])
    setCart(updateResult!.cart!)
  }

  return updateItemQuantity
}
