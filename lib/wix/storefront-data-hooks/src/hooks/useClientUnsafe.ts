import { useContext } from 'react'
import { Context } from '../Context'

export function useClientUnsafe() {
  const { client } = useContext(Context)
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Using client directly impacts your rate limit in Wix Headless APIs'
    )
  }
  return client
}
