if (!process.env.WIX_API_KEY) {
  throw new Error('Missing required environment variable WIX_API_KEY')
}
if (!process.env.WIX_SITE_DOMAIN) {
  throw new Error(
    'Missing required environment variable WIX_SITE_DOMAIN'
  )
}

export default {
  domain: process.env.WIX_SITE_DOMAIN,
  storefrontAccessToken: process.env.WIX_API_KEY,
}
