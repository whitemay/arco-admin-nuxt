import { Subject } from 'rxjs'

const subject = new Subject<NotifyOption>()

export function useNotify(option: NotifyOption) {
  subject.next(option)
}

export function useSubscribeNotify(
  handler: (option: NotifyOption) => void,
) {
  const subscription = subject.subscribe(handler)
  return subscription
}
