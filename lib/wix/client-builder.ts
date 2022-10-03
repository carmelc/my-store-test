import {WIX_ACCESS_TOKEN_COOKIE, WIX_REFRESH_TOKEN_COOKIE, WIX_COOKIE_EXPIRE, API_URL} from './const'
import Cookies from 'js-cookie'
// import { cart } from '@wix/ecom'
// import {data} from '@wix/data-backend-public-sdk-poc'
import {createClient, session} from '@wix/sdk';
import {WixStoresConfig} from "@lib/wix-types";

export function getError(errors: any[] | null, status: number) {
  errors = errors ?? [{message: 'Failed to fetch Wix API'}]
  return new Error(`errors: ${errors}, status: ${status}`)
}

export async function getAsyncError(res: Response) {
  const data = await res.json()
  return getError(data.errors, res.status)
}

const handleFetchResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  throw await getAsyncError(res)
}

const wixClient = createClient({
  // data,
  data: {}
})

export type clientTypes = typeof wixClient

const fetcher = async (config: WixStoresConfig): Promise<{ wixClient: clientTypes, legacyFetch: (input: {
    url: string;
    method: 'GET' | 'POST';
    variables?: any;
  })=>Promise<any>}> => {
  let accessToken = Cookies.get(WIX_ACCESS_TOKEN_COOKIE) ?? ''
  let refreshToken = Cookies.get(WIX_REFRESH_TOKEN_COOKIE) ?? ''
  const wixSession = await session({refreshToken, accessToken}, {domain: config.domain});
  Cookies.set(WIX_ACCESS_TOKEN_COOKIE, wixSession.accessToken!, {expires: 0.3})
  Cookies.set(WIX_REFRESH_TOKEN_COOKIE, wixSession.refreshToken!, {expires: WIX_COOKIE_EXPIRE})
  wixClient.setSession(wixSession)

  const legacyFetch = async ({url, method = 'GET', variables}: {
    url: string;
    method: 'GET' | 'POST';
    variables?: any;
  }) => handleFetchResponse(
    await fetch(url[0] === '/' ? url : `${API_URL}/${url}`, {
      method,
      ...(variables && {body: variables}),
      headers: {
        'origin': config.domain!,
        'Authorization': accessToken!,
        'Content-Type': 'application/json'
      }
    })
  )

  return {wixClient, legacyFetch}
}

export default fetcher
