export interface ProfileBasicRes {
  status: number
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}

export function queryProfileBasic() {
  return appFetch<ProfileBasicRes>('/api/profile/basic')
}

export type operationLogRes = Array<{
  key: string
  contentNumber: string
  updateContent: string
  status: number
  updateTime: string
}>

export function queryOperationLog() {
  return appFetch<operationLogRes>('/api/operation/log')
}
