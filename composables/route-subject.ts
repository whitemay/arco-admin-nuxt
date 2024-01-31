import { Subject } from 'rxjs'
import type { RouteLocationNormalized } from '#vue-router'

const subject = new Subject<RouteLocationNormalized>()
let latestRoute: RouteLocationNormalized

export function useRouteEmit(to: RouteLocationNormalized) {
  subject.next(to)
  latestRoute = to
}

export function useRouteSubscribe(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  const subscription = subject.subscribe(handler)
  if (immediate && latestRoute)
    handler(latestRoute)
  return subscription
}
