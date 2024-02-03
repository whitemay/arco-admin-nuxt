// 构造TabsBar所需要的类型定义
export interface TagProps {
  title: string
  name: string
  // path: string
  fullPath: string
  query?: any
  ignoreCache?: boolean
  tabTitle?: string
}

export interface TabBarState {
  tagList: TagProps[]
  cacheTabList: Set<string>
}
