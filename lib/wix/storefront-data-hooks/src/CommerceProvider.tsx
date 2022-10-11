import React, { useState, useEffect } from 'react'
import { Context } from './Context'
import { LocalStorage, LocalStorageKeys } from './utils'
import { WixStoresConfig } from "@lib/wix-types";
import { Cart } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';
import {createClient} from "@wix/sdk";
import clientBuilder, {clientTypes} from "@lib/wix/client-builder";
import {ChannelType} from "@wix/ecom/build/cjs/src/ecom-v1-cart.types";


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
  const createCheckoutUrl = (checkoutId: string) => `${props.config.wixSiteCheckoutUrl}?appSectionParams={"checkoutId":"${checkoutId}", "continueShoppingUrl": "${window.location.href}"}`;

  const initialCart = LocalStorage.getInitialCart()
  const [cart, setCart] = useState<Cart | null>(initialCart)
  const [client, setClient] = useState<clientTypes | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');

  clientBuilder(props.config).then(clientInstance => {
    setClient(clientInstance.wixClient);
  })

  useEffect(() => {
    setCheckoutUrl('');
    if (cart) {
      LocalStorage.setInitialCart(cart)
      if (cart?._id) {
        client?.cart?.createCheckout(cart._id, { channelType: ChannelType.WEB })
          .then(({checkoutId}) => {
            if (checkoutId) {
              setCheckoutUrl(createCheckoutUrl(checkoutId!))
            } else {
              // this means that the cart was already checked out and should be removed
              setCart(null)
            }
          })
      }
    }
  }, [cart, client])

  return (
    <Context.Provider
      value={{
        checkoutUrl,
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
