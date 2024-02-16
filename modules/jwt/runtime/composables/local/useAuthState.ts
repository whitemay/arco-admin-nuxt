import { useStorage } from '@vueuse/core'
import type { CommonUseAuthStateReturn } from '../../types'
import { makeCommonAuthState } from '../commonAuthState'
import { useTypedBackendConfig } from '../../helpers'
import { useRuntimeConfig, useState } from '#imports'

interface UseAuthStateReturn extends CommonUseAuthStateReturn<SessionData> {
  token: ComputedRef<string | null>
  rawToken: Ref<string | null>
  setToken: (newToken: string | null) => void
  clearToken: () => void
}

export function useAuthState(): UseAuthStateReturn {
  const config = useTypedBackendConfig(useRuntimeConfig(), 'local')
  const commonAuthState = makeCommonAuthState<SessionData>()

  // Re-construct state from cookie, also setup a cross-component sync via a useState hack, see https://github.com/nuxt/nuxt/issues/13020#issuecomment-1397282717
  const _rawTokenCookie = useStorage<any>('auth:token', {}, config.token.storage === 'session' ? sessionStorage : localStorage)
  // useCookie<string | null>('auth:token', { default: () => null, maxAge: config.token.maxAgeInSeconds, sameSite: config.token.sameSiteAttribute })

  const rawToken = useState<string | null>('auth:raw-token', () => _rawTokenCookie.value.token ?? null)
  watch(rawToken, () => {
    _rawTokenCookie.value = { token: rawToken.value }
  })

  const token = computed(() => {
    if (rawToken.value === null)
      return null

    return config.token.type.length > 0 ? `${config.token.type} ${rawToken.value}` : rawToken.value
  })

  const setToken = (newToken: string | null) => {
    rawToken.value = newToken
  }

  const clearToken = () => {
    setToken(null)
  }

  const schemeSpecificState = {
    token,
    rawToken,
  }

  return {
    ...commonAuthState,
    ...schemeSpecificState,
    setToken,
    clearToken,
  }
}
export default useAuthState
