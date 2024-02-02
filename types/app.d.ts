import type { CallbackDataParams } from 'echarts/types/dist/shared'

declare namespace App {
  export interface ServerResult<T = any> {
    data: T
    status: string
    msg: string
    code: number
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
  export interface Pagination {
    current: number
    pageSize: number
    total?: number
  }
  export interface ToolTipFormatterParams extends CallbackDataParams {
    axisDim: string
    axisIndex: number
    axisType: string
    axisId: string
    axisValue: string
    axisValueLabel: string
  }

}
