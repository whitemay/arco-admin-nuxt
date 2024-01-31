export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (!process.server) {
    // emit route change
    // setRouteEmitter(to)
    useRouteEmit(to)
  }
})
