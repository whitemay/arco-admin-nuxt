import type { H3Event } from 'h3'
import { verify } from 'jsonwebtoken'

const TOKEN_TYPE = 'Bearer'
const runtimeConfig = useRuntimeConfig()

function extractToken(authHeaderValue: string) {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}

export function ensureAuth(event: H3Event) {
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined')
    throw createError({ statusCode: 403, statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint' })

  const extractedToken = extractToken(authHeaderValue)
  try {
    return verify(extractedToken, runtimeConfig.jwt.secret)
  }
  catch (error) {
    console.error('Login failed. Here\'s the raw error:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
}

export function checkAuth(event: H3Event) {
  const token = getCookie(event, 'auth:token') || ''
  try {
    return verify(token, runtimeConfig.jwt.secret)
  }
  catch (error) {
    // console.error('校验失败，错误信息如下:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
}
