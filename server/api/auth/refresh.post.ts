import { sign, verify } from 'jsonwebtoken'

const runtimeConfig = useRuntimeConfig()

interface User {
  username: string
  name: string
  picture: string
}

interface JwtPayload extends User {
  scope: Array<'test' | 'user'>
  exp: number
}

export default eventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event)

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, no refreshToken in payload',
    })
  }

  const decoded = verify(body.refreshToken, runtimeConfig.jwt.secret) as JwtPayload | undefined

  if (!decoded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, refreshToken can`t be verified',
    })
  }

  const expiresIn = 60 * 5 // 5 minutes

  const user: User = {
    username: decoded.username,
    picture: decoded.picture,
    name: decoded.name,
  }

  const accessToken = sign({ ...user, scope: ['test', 'user'] }, runtimeConfig.jwt.secret, {
    expiresIn,
  })
  const refreshToken = sign({ ...user, scope: ['test', 'user'] }, runtimeConfig.jwt.secret, {
    expiresIn: 60 * 60 * 24,
  })

  return {
    tokens: {
      accessToken,
      refreshToken,
    },
  }
})
