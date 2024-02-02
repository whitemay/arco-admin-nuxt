export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
]

export const NOT_FOUND = {
  name: 'notFound',
}

// 实际的路由命名遵循Nuxt3的约定
export const REDIRECT_ROUTE_NAME = 'redirect'
export const DEFAULT_ROUTE_NAME = 'dashboard-workplace'

export const DEFAULT_ROUTE = {
  title: 'menu.dashboard.workplace',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace',
}
