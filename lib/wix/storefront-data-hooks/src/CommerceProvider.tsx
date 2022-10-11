import React, { useState, useEffect } from 'react'
import { Context } from './Context'
import { LocalStorage, LocalStorageKeys } from './utils'
import { WixStoresConfig } from "@lib/wix-types";
import { Cart } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';
import {createClient} from "@wix/sdk";
import clientBuilder, {clientTypes} from "@lib/wix/client-builder";


export interface CommerceProviderProps {
  config: WixStoresConfig
  children: React.ReactNode
}

export function CommerceProvider(props: CommerceProviderProps) {
  const {
    config: {
      storefrontAccessToken,
      domain
    },
    children,
  } = props;
  if (domain == null || storefrontAccessToken == null) {
    throw new Error(
      'Unable to build wix stores client object. Please make sure that your access token and domain are correct.'
    )
  }

  const initialCart = LocalStorage.getInitialCart()
  const [cart, setCart] = useState<Cart | null>(initialCart)
  const [client, setClient] = useState<clientTypes | null>(null);

  clientBuilder(props.config).then(clientInstance => {
    setClient(clientInstance.wixClient);
  })

  useEffect(() => {
    if (cart) {
      LocalStorage.setInitialCart(cart)
    }
  }, [cart])

  return (
    <Context.Provider
      value={{
        client,
        cart,
        setCart,
        domain,
        storefrontAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}
