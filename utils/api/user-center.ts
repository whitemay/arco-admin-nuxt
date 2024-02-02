export interface MyProjectRecord {
  id: number
  name: string
  description: string
  peopleNumber: number
  contributors: {
    name: string
    email: string
    avatar: string
  }[]
}
export function queryMyProjectList() {
  return appFetch('/api/user/my-project/list', { method: 'POST' })
}

export interface MyTeamRecord {
  id: number
  avatar: string
  name: string
  peopleNumber: number
}
export function queryMyTeamList() {
  return appFetch('/api/user/my-team/list', { method: 'POST' })
}

export interface LatestActivity {
  id: number
  title: string
  description: string
  avatar: string
}
export function queryLatestActivity() {
  return appFetch<LatestActivity[]>('/api/user/latest-activity', { method: 'POST' })
}

export function saveUserInfo() {
  return appFetch('/api/user/save-info', { method: 'POST' })
}

export interface BasicInfoModel {
  email: string
  nickname: string
  countryRegion: string
  area: string
  address: string
  profile: string
}

export interface EnterpriseCertificationModel {
  accountType: number
  status: number
  time: string
  legalPerson: string
  certificateType: string
  authenticationNumber: string
  enterpriseName: string
  enterpriseCertificateType: string
  organizationCode: string
}

export type CertificationRecord = Array<{
  certificationType: number
  certificationContent: string
  status: number
  time: string
}>

export interface UnitCertification {
  enterpriseInfo: EnterpriseCertificationModel
  record: CertificationRecord
}

export function queryCertification() {
  return appFetch<UnitCertification>('/api/user/certification', { method: 'POST' })
}

export function userUploadApi(
  data: FormData,
  config: {
    controller: AbortController
    onUploadProgress?: (progressEvent: any) => void
  },
) {
  // const controller = new AbortController();
  return appFetch('/api/user/upload', { method: 'POST', body: data, config })
}
