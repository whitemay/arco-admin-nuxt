import { Subject } from 'rxjs'

const subject = new Subject<NotifyOption>()

export function useNotify(option: NotifyOption) {
  subject.next(option)
}

export function useNotifySubscribe(
  handler: (option: NotifyOption) => void,
) {
  const subscription = subject.subscribe(handler)
  return subscription
}
