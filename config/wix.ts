if (!process.env.WIX_API_KEY) {
  throw new Error('Missing required environment variable WIX_API_KEY')
}
if (!process.env.WIX_API_DOMAIN) {
  throw new Error(
    'Missing required environment variable WIX_API_DOMAIN'
  )
}
if (!process.env.WIX_SITE_URL) {
  throw new Error(
    'Missing required environment variable WIX_SITE_URL'
  )
}

export default {
  domain: process.env.WIX_API_DOMAIN,
  wixSiteUrl: process.env.WIX_SITE_URL,
  storefrontAccessToken: process.env.WIX_API_KEY,
}
