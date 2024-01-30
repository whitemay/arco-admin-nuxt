import type { H3Event } from 'h3'
import { verify } from 'jsonwebtoken'

const TOKEN_TYPE = 'Bearer'
const runtimeConfig = useRuntimeConfig()

function extractToken(event: H3Event) {
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined')
    throw createError({ statusCode: 403, statusMessage: '要求提供认证头' })
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}

export function ensureAuth(event: H3Event) {
  const extractedToken = getCookie(event, 'auth:token') || extractToken(event) || ''
  try {
    return verify(extractedToken, runtimeConfig.jwt.secret)
  }
  catch (error) {
    console.error('校验失败，错误信息如下:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
}

/* export function checkAuth(event: H3Event) {
  const token = getCookie(event, 'auth:token') || ''
  try {
    return verify(token, runtimeConfig.jwt.secret)
  }
  catch (error) {
    // console.error('校验失败，错误信息如下:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
} */
