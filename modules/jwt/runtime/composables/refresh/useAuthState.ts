import type { ComputedRef, Ref } from 'vue'
import { computed, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useTypedBackendConfig } from '../../helpers'
import { useAuthState as useLocalAuthState } from '../local/useAuthState'

import { useRuntimeConfig, useState } from '../../../../../.nuxt/imports'

// '#imports'

type UseAuthStateReturn = ReturnType<typeof useLocalAuthState> & {
  rawRefreshToken: Ref<string | null>
  refreshToken: ComputedRef<string | null>
}

export function useAuthState(): UseAuthStateReturn {
  const config = useTypedBackendConfig(useRuntimeConfig(), 'refresh')
  const localAuthState = useLocalAuthState()
  // Re-construct state from cookie, also setup a cross-component sync via a useState hack, see https://github.com/nuxt/nuxt/issues/13020#issuecomment-1397282717
  const _rawRefreshTokenCookie = useStorage<string | null>(
    'auth:refresh-token',
    /* {
      default: () => null,
      maxAge: config.refreshToken.maxAgeInSeconds,
      sameSite: 'lax',
    }, */
    null,
    config.token.storage === 'session' ? sessionStorage : localStorage,
  )

  const rawRefreshToken = useState(
    'auth:raw-refresh-token',
    () => _rawRefreshTokenCookie.value,
  )

  watch(rawRefreshToken, () => {
    _rawRefreshTokenCookie.value = rawRefreshToken.value
  })

  const refreshToken = computed(() => {
    if (rawRefreshToken.value === null)
      return null

    return rawRefreshToken.value
  })

  const schemeSpecificState = {
    refreshToken,
    rawRefreshToken,
  }

  return {
    ...localAuthState,
    ...schemeSpecificState,
  }
}
export default useAuthState
