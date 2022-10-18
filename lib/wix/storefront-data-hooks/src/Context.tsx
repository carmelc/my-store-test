import React from 'react'
import {clientTypes} from "@lib/wix/client-builder";
import type { Cart } from "@lib/wix-stores.model";

interface ContextShape {
  setCart: (cart: Cart) => void
  cart: Cart | null
  domain: string
  storefrontAccessToken: string
  client: clientTypes | null
  checkoutUrl: string
}

export const Context = React.createContext<ContextShape>({
  setCart: () => {},
  cart: null,
  domain: '',
  storefrontAccessToken: '',
  client: null,
  checkoutUrl: '',
})
