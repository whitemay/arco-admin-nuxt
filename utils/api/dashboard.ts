import type { TableData } from '@arco-design/web-vue/es/table/interface'

export interface ContentDataRecord {
  x: string
  y: number
}

export function queryContentData() {
  return appFetch<ContentDataRecord[]>('/api/content-data')
}

export interface PopularRecord {
  key: number
  clickNumber: string
  title: string
  increases: number
}

export function queryPopularList(params: { type: string }) {
  return appFetch<TableData[]>('/api/popular/list', { params })
}
