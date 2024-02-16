export function appFetch<T = any>(url: string, options: any = {}): Promise<ServerResult<T>> {
  // const nuxtApp = useNuxtApp() as any
  const { signOut, token } = useAuth()

  return $fetch<ServerResult<T>>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token.value,
    },
    onResponse({ response }: any) {
      const { _data, ok, status } = response

      if (!ok) {
        // 直接请求就出错了
        useNotify({ type: 'error', config: _data.message || '请求错误，请联系管理员。' })

        if (status === 401) { // 认证信息错误
          signOut({ callbackUrl: '/login', external: false }) // 直接退出到登录界面
        }
        return
      }

      if (typeof _data !== 'object') {
        // 如果是直接获取文件的情况，_data可能为blob/string或其它类型，不予另行处理
        return
      }

      // 确认_data为JSON的情况下
      if (_data.code !== 200) {
        // 这里处理的是由框架报告的异常，通常表示错误的调用或严重的错误
        console.warn(_data)
        useNotify({ type: 'warning', config: _data.message })
        if (_data.code === 401) { // 认证信息错误
          signOut({ callbackUrl: '/login', external: false }) // 直接退出到登录界面
        }
        else {
          return Promise.reject(_data.message)
        }
      }
    },
  })
}
