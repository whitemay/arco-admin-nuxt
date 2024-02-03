import type { TabBarState, TagProps } from './types'
import type { RouteLocationNormalized } from '#vue-router'
import {
  DEFAULT_ROUTE,
  DEFAULT_ROUTE_NAME,
  REDIRECT_ROUTE_NAME,
} from '@/config/router'

function formatTag(route: RouteLocationNormalized): TagProps {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.locale || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache,
  }
}

// 能否出现在tabBar上，由BAN_LIST控制
const BAN_LIST = [REDIRECT_ROUTE_NAME]

export const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    cacheTabList: new Set([DEFAULT_ROUTE_NAME]),
    tagList: [DEFAULT_ROUTE],
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string))
        return
      this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache)
        this.cacheTabList.add(route.name as string)
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (isString(name) && name !== '')
        this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter(el => !el.ignoreCache)
        .map(el => el.name)
        .forEach(x => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = [DEFAULT_ROUTE]
      this.cacheTabList.clear()
      this.cacheTabList.add(DEFAULT_ROUTE_NAME)
    },
    updateTitle(fullPath: string, title: string) {
      const tag = this.tagList.find(el => el.fullPath === fullPath)
      if (tag)
        tag.tabTitle = title
    },
  },
})
