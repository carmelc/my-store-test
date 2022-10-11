import { useContext } from 'react'
import { Context } from '../Context'
import type { LineItem } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';

export function useAddItemsToCart() {
  const { client, cart, setCart } = useContext(Context)

  async function addItemsToCart(items: LineItem[]) {
    if (client == null) {
      throw new Error('Called addItemsToCart too soon, client was not init yet')
    }

    if (items.length < 1) {
      throw new Error(
        'Must include at least one line item, empty line items found'
      )
    }
    if (!cart) {
      const newCartResult = await client.cart.createCart({ lineItems: items });
      setCart(newCartResult);
    } else {
      const updatedCartResult = await client.cart.addToCart(cart._id!, { lineItems: items });
      setCart(updatedCartResult!.cart!);
    }
  }

  return addItemsToCart
}
