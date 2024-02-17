import { Subject } from 'rxjs'

const subject = new Subject<MessageOption>()

export function useMessage(option: MessageOption) {
  subject.next(option)
}

export function useSubscribeMessage(
  handler: (option: MessageOption) => void,
) {
  const subscription = subject.subscribe(handler)
  return subscription
}
