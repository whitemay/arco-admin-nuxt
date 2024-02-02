import type { RouteRecordNormalized } from '#vue-router'
import type { UserState } from '@/stores/user/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}
export function login(data: LoginData) {
  return appFetch<LoginRes>('/api/user/login', { method: 'POST', body: data })
}

export function logout() {
  return appFetch<LoginRes>('/api/user/logout', { method: 'POST' })
}

export function getUserInfo() {
  return appFetch<UserState>('/api/user/info', { method: 'POST' })
}

export function getMenuList() {
  return appFetch<RouteRecordNormalized[]>('/api/user/menu', { method: 'POST' })
}
