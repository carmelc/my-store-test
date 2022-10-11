import React from 'react'
import type { Cart, LineItem } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';
import {clientTypes} from "@lib/wix/client-builder";

interface ContextShape {
  setCart: (cart: Cart) => void
  cart: Cart | null
  domain: string
  storefrontAccessToken: string
  client: clientTypes | null
}

export const Context = React.createContext<ContextShape>({
  setCart: () => {},
  cart: null,
  domain: '',
  storefrontAccessToken: '',
  client: null,
})
