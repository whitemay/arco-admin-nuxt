import type { GeneralChart } from '@/types/global'

export interface ChartDataRecord {
  x: string
  y: number
  name: string
}
export interface DataChainGrowth {
  quota: string
}

export interface DataChainGrowthRes {
  count: number
  growth: number
  chartData: {
    xAxis: string[]
    data: { name: string, value: number[] }
  }
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  return appFetch<DataChainGrowthRes>('/api/data-chain-growth', { method: 'POST', body: data })
}

export interface PopularAuthorRes {
  list: {
    ranking: number
    author: string
    contentCount: number
    clickCount: number
  }[]
}

export function queryPopularAuthor() {
  return appFetch<PopularAuthorRes>('/api/popular-author/list')
}

export interface ContentPublishRecord {
  x: string[]
  y: number[]
  name: string
}

export function queryContentPublish() {
  return appFetch<ContentPublishRecord[]>('/api/content-publish')
}

export function queryContentPeriodAnalysis() {
  return appFetch<GeneralChart>('/api/content-period-analysis', { method: 'POST' })
}

export interface PublicOpinionAnalysis {
  quota: string
}
export interface PublicOpinionAnalysisRes {
  count: number
  growth: number
  chartData: ChartDataRecord[]
}
export function queryPublicOpinionAnalysis(data: DataChainGrowth) {
  return appFetch<PublicOpinionAnalysisRes>(
    '/api/public-opinion-analysis',
    { method: 'POST', body: data },
  )
}
export interface DataOverviewRes {
  xAxis: string[]
  data: Array<{ name: string, value: number[], count: number }>
}

export function queryDataOverview() {
  return appFetch<DataOverviewRes>('/api/data-overview', { method: 'POST' })
}
