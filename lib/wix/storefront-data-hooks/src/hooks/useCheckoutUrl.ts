import {useContext, useEffect, useState} from 'react'
import {Context} from "@lib/wix/storefront-data-hooks/src/Context";

export function useCheckoutUrl(): string | null {
  const { checkoutUrl } = useContext(Context)
  return checkoutUrl;
}
