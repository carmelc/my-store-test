import React from 'react'
import { Cart } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';

interface ContextShape {
  // TODO: client API
  client: any;
  cart: Cart | null
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>
  domain: string
  storefrontAccessToken: string
}

export const Context = React.createContext<ContextShape>({
  client: null,
  cart: null,
  domain: '',
  storefrontAccessToken: '',
  setCart: () => {
    throw Error('You forgot to wrap this in a Provider object')
  },
})
