import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'

export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}

export function queryPolicyList(params: PolicyParams) {
  return appFetch<PolicyListRes>('/api/list/policy', {
    params,
  })
}

export interface ServiceRecord {
  id: number
  title: string
  description: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export function queryInspectionList() {
  return appFetch('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return appFetch('/api/list/the-service')
}

export function queryRulesPresetList() {
  return appFetch('/api/list/rules-preset')
}
