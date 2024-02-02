export interface MessageRecord {
  id: number
  type: string
  title: string
  subTitle: string
  avatar?: string
  content: string
  time: string
  status: 0 | 1
  messageType?: number
}
export type MessageListType = MessageRecord[]

export function queryMessageList() {
  return appFetch<MessageListType>('/api/message/list', { method: 'POST' })
}

interface MessageStatus {
  ids: number[]
}

export function setMessageStatus(data: MessageStatus) {
  return appFetch<MessageListType>('/api/message/read', { method: 'POST', body: data })
}

export interface ChatRecord {
  id: number
  username: string
  content: string
  time: string
  isCollect: boolean
}

export function queryChatList() {
  return appFetch<ChatRecord[]>('/api/chat/list', { method: 'POST' })
}
