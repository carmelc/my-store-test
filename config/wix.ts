if (!process.env.WIX_API_KEY) {
  throw new Error('Missing required environment variable WIX_API_KEY')
}
if (!process.env.WIX_API_DOMAIN) {
  throw new Error(
    'Missing required environment variable WIX_API_DOMAIN'
  )
}
if (!process.env.WIX_SITE_CHECKOUT_URL) {
  throw new Error(
    'Missing required environment variable WIX_SITE_CHECKOUT_URL'
  )
}

export default {
  domain: process.env.WIX_API_DOMAIN,
  wixSiteCheckoutUrl: process.env.WIX_SITE_CHECKOUT_URL,
  storefrontAccessToken: process.env.WIX_API_KEY,
}
