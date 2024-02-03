import type { RouteRecordNormalized } from '#vue-router'

function toTree(array: any[]): any[] {
  let dest: RouteRecordNormalized[] = []
  useUniqBy(array, item => item.name)
    .sort((a, b) => a.name < b.name ? 1 : -1)
    .forEach((route) => {
      console.log(route.name, route.meta.locale)
      route.children = dest.filter(item => item.path.startsWith(route.path))
        .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
      dest = [route, ...dest.slice(route.children.length)]
      if (!route.children.length)
        route.children = undefined
    })
  return useSortBy(dest, item => (item.meta.order || 0))
}

export function useMenuTree() {
  // 从router中获取所有的路由列表
  const router = useRouter()
  const routes = router.getRoutes() as RouteRecordNormalized[]
  const appClientMenus = routes
    .filter(route => !route.meta?.layout || route.meta.layout === 'default') // 只保留没有layout属性或者layout属性为default的路由
    .filter(route => !route.meta?.hidden) // 隐藏的路由不显示
    // TODO 去掉所有无访问权限的路由
    /* .map(route => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      children: route.children,
    })) */
    .map(route => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      children: route.children,
    } as RouteRecordNormalized))

  // const permission = usePermission()
  const appStore = useAppStore()
  const appRoute = computed(() => {
    if (appStore.menuFromServer)
      return appStore.appAsyncMenus.flat()

    return appClientMenus
  })

  const menuTree = computed(() => {
    const copyRouter = useCloneDeep(appRoute.value) as RouteRecordNormalized[]
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0)
    })
    return toTree(appClientMenus)
    /* function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes)
        return null

      const collector: any = _routes.map((element) => {
        // no access
        // if (!permission.accessRouter(element))
        // return null

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          x => x.meta?.hideInMenu !== true,
        )

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false)
          return element

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0) */
  })

  return {
    menuTree,
  }
}
