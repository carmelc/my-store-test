import {WIX_ACCESS_TOKEN_COOKIE, WIX_REFRESH_TOKEN_COOKIE, WIX_COOKIE_EXPIRE} from './const'
import Cookies from 'js-cookie'
import { cart, checkout } from '@wix/ecom'
import {data} from '@wix/data-backend-public-sdk-poc/build/cjs'
import {createClient, session} from '@wix/sdk';
import {WixStoresConfig} from "@lib/wix-stores.model";

const wixClient = createClient({
  data,
  // data: {},
  cart,
  checkout,
})

export type clientTypes = typeof wixClient

const fetcher = async (config: WixStoresConfig): Promise<{ wixClient: clientTypes }> => {
  let accessToken = Cookies.get(WIX_ACCESS_TOKEN_COOKIE) ?? ''
  let refreshToken = Cookies.get(WIX_REFRESH_TOKEN_COOKIE) ?? ''
  const wixSession = await session({refreshToken, accessToken}, {domain: config.domain});
  Cookies.set(WIX_ACCESS_TOKEN_COOKIE, wixSession.accessToken!, {expires: 0.3})
  Cookies.set(WIX_REFRESH_TOKEN_COOKIE, wixSession.refreshToken!, {expires: WIX_COOKIE_EXPIRE})
  wixClient.setSession(wixSession)
  return {wixClient}
}

export default fetcher
